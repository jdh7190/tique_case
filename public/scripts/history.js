const addEntry = entry => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = async e => {
            console.log('adding entry...');
            let db = e.target.result;
            const tx = db.transaction('history', 'readwrite');
            const table = tx.objectStore('history');
            table.put(entry);
        }
        request.onerror = e => { console.log('error', e) }
    }
}
const getEntry = (txid, cb) => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = e => {
            db = e.target.result;
            const tx = db.transaction('history', 'readonly');
            const table = tx.objectStore('history');
            const entries = table.get(txid);
            entries.onsuccess = e => {
                const entry = e.target.result;
                return cb(entry);
            }
        }
        request.onerror = e => { console.log('error', e) }
    }
}
const historyEntries = cb => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = e => {
            db = e.target.result;
            const tx = db.transaction('history', 'readonly');
            const table = tx.objectStore('history');
            const time_idx = table.index('time_idx');
            const entries = time_idx.getAll();
            entries.onsuccess = e => {
                const history = e.target.result;
                return cb(history)
            }
        }
        request.onerror = e => { console.log('error', e) }
    }
}
const getHistoryEntry = txid => {
    return new Promise((resolve, reject) => { getEntry(txid, entry => { entry ? resolve(entry) : resolve(null) }) })
}
const getHistoryEntries = () => {
    return new Promise((resolve, reject) => { historyEntries(entries => { entries.length ? resolve(entries) : resolve([]) }) })
}
const fetchHexes = async txids => {
    let txs = [];
    if (txids.length) {
        const h = await (await fetch(`https://api.whatsonchain.com/v1/bsv/main/txs/hex`, { method: 'post', body: JSON.stringify({ txids }) })).json();
        h.forEach(t => {
            txs.push(t);
        })
    }
    return txs;
}
const getBSVHistory = async() => {
    const jres = await (await fetch(`https://api.whatsonchain.com/v1/bsv/${network}/address/${run.purse.address}/history`)).json();
    const txs = jres.map(t => t.tx_hash);
    let pTx = [], sends = [], recvs = [];
    for (let tx of txs) {
        const isTokenTx = await getHistoryEntry(tx);
        if (!isTokenTx) pTx.push(tx);
    }
    if (pTx.length) {
        const purseTx = await fetchHexes(pTx);
        purseTx.forEach(p => {
            const bsvtx = bsv.Transaction(p.hex);
            const { inputs } = bsvtx;
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].script.chunks[1].buf) {
                    let inp;
                    try {
                        inp = bsv.Address.fromPublicKey(bsv.PublicKey.fromHex(inputs[i].script.chunks[1].buf?.toString('hex'))).toString();
                    } catch (e) { break }
                    if (inp === run.purse.address) {
                        isSend = true;
                        sends.push(p);
                    } else { recvs.push(p) }
                }
            }
        })
        sends.forEach(s => {
            let pkh;
            const bsvtx = bsv.Transaction(s.hex);
            const paid = bsvtx.outputs.filter(o => {
                const script = bsv.Script.fromBuffer(o._scriptBuffer);
                if (script.isSafeDataOut()) { return false }
                try {
                    pkh = bsv.Address.fromPublicKeyHash(script.getPublicKeyHash()).toString();
                } catch (e) {}
                return pkh !== run.purse.address;
            })
            const sentAmt = paid.length === 0 ? bsvtx._estimateFee() : sumSatoshis(paid);
            const o = {
                action: '-',
                qty: sentAmt,
                tokenName: 'BSV',
                contract: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f', // GENESIS BLOCKHASH
                location: ``,
                time: s?.blocktime || parseInt(new Date().getTime()/1000),
                origin: '',
                txid: s.txid,
                hex: s.hex,
                blockheight: s.blockheight
            }
            addEntry(o)
        });
        recvs.forEach(r => {
            let pkh;
            const {outputs} = bsv.Transaction(r.hex);
            const received = outputs.filter(o => {
                const script = bsv.Script.fromBuffer(o._scriptBuffer);
                if (script.isSafeDataOut()) { return false }
                try {
                    pkh = bsv.Address.fromPublicKeyHash(script.getPublicKeyHash()).toString();
                } catch (e) {}
                return pkh === run.purse.address;
            })
            const recvAmt = sumSatoshis(received);
            const o = {
                action: '+',
                qty: recvAmt,
                tokenName: 'BSV',
                contract: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f', // GENESIS BLOCKHASH
                location: ``,
                time: r?.blocktime || parseInt(new Date().getTime()/1000),
                origin: '',
                txid: r.txid,
                hex: r.hex,
                blockheight: r.blockheight
            }
            addEntry(o)
        })
    }
}
const getHistory = async(address = run.owner.address, recent = false) => {
    const jres = await (await fetch(`https://api.whatsonchain.com/v1/bsv/${network}/address/${address}/history`)).json();
    const txs = jres.map(t => t.tx_hash);
    let txids = [], histTx = [];
    const mod = txs.length % 20;
    let looptimes = recent ? 1 : parseInt(txs.length / 20);
    if (recent) {
        for (let l = 0; l < txs.length && l < 20; l++) {
            txids.push(txs[l]);
        }
        const t = await fetchHexes(txids);
        return t;
    }
    if (txs.length < 20) {
        for (let i = 0; i < txs.length; i++) {
            txids.push(txs[i]);
        }
        const t = await fetchHexes(txids);
        t.forEach(tx => histTx.push(tx));
        return t;
    }
    if (looptimes > 1 || !recent) {
        let x = 0;
        for (let i = 0; i < looptimes; i++) {
            txids = [];
            for (let j = 0; j < 20; j++) {
                txids.push(txs[x]);
                x++;
            }
            const t = await fetchHexes(txids);
            t.forEach(tx => histTx.push(tx))
        }
        txids = [];
        for (let k = txs.length - 1; k >= txs.length - mod; k--) {
            txids.push(txs[k]);
        }
        if (txids.length) {
            const t = await fetchHexes(txids);
            t.forEach(tx => histTx.push(tx))
        }
    }
    return histTx;
}
const addToHist = async entry => {
    const dt = new Date(entry.time*1000);
    const d = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()} ${dt.toTimeString().slice(0,8)}`;
    let { img } = await getContractImage(entry.contract);
    if (!img && entry.contract !== '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f') {
        const i = await run.cache.get(`jig://${entry.contract}`);
        if (i) {
            const m = i.props.metadata;
            img = setImage(m, null, entry.contract);
        } else {
            img = `<img class="emoji" src="https://mornin.run/${entry.contract}/img.png" onerror="this.onerror=null;this.src='https://tique.run/images/logo-512x512.png';">`;
        }
    };
    if (entry.tokenName === 'BSV') {
        img = `<img class="emoji" src="./assets/bsv-icon.svg"></img>`;
    }
    const cardDiv = `<div class='card' id="${entry.txid}" onclick="histtx(this.id)">
        <div class='card_content'>
            <span class='card_icon'>${img}</span>
            <span class='card_label first'>${entry.tokenName}</span>
            <span class='card_label second'>${d}</span>
            <span class='card_end'>${entry.action} ${entry.tokenName === 'BSV' ? entry.qty / 100000000 : entry?.qty}</span>
        </div>
    </div>`;
    document.getElementById('historylist').insertAdjacentHTML('afterbegin', cardDiv);
}
const histtx = id => { open(`https://whatsonchain.com/tx/${id}`) }
const compare = (a, b) => {
    if (!a.blockheight) { return -2 }
    if (a.blockheight < b.blockheight ) { return 1 }
    else if (a.blockheight  > b.blockheight ) { return -1 }
}
const evalRUNTx = async t => {
    let metadata, isSend = false;
    const bsvtx = bsv.Transaction(t.hex);
    const outputs = bsvtx.outputs;
    const inputs = bsvtx.inputs;
    try {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].script.chunks[1].buf) {
                const inputAddress = bsv.Address.fromPublicKey(bsv.PublicKey.fromHex(inputs[i].script.chunks[1].buf?.toString('hex'))).toString();
                if (inputAddress === run.owner.address) {
                    isSend = true;
                    break;
                }
            }
        }
    } catch (e) { console.log(e, bsvtx.hash) }
    try { metadata = Run.util.metadata(t.hex) }
    catch(e) { console.log(e) }
    if (metadata) {
        const { exec } = metadata;
        let to, qty, minted = false, action, deploy = false, call = false, destroy = false, isOrderLockSell = false;
        try {
            action = metadata.exec[0].data[1];
            if (action === 'send' || action === 'combine') {
                if (isSend) {
                    [to, qty] = exec.find(d => d.data[1] === 'send')?.data[2];
                    if (to?.$arb?.address) {
                        to = to?.$arb?.address;
                        isOrderLockSell = true;
                    }
                } else {
                    [to, qty] = exec.find(d => d.data[1] === 'send' && d.data[2][0] === run.owner.address)?.data[2];
                }
            }
            else if (action === 'mint') {
                minted = true;
                [qty, to] = metadata.exec[0].data[2];
                if (!to) { to = run.owner.address }
            }
            else {
                if (exec[0].op === 'DEPLOY') {
                    deploy = true;
                    to = run.owner.address;
                }
                if (exec[0].op === 'CALL') {
                    if (exec[0].data[1] === 'destroy') {
                        action = 'destroy';
                        destroy = true;
                        to = run.owner.address;
                    }
                    call = true;
                    to = run.owner.address;
                }
            }
        } catch(e) { console.log(e, metadata.exec[0].data) }
        let outputIdx;
        if (isOrderLockSell) {
            outputIdx = outputs.findIndex(output => {bsv.Script(output.script).toString().includes('cdb285cc49e5ff3eed6536e7b426e8a528b05bf9276bd05431a671743e651ceb00')})
        } else {
            outputIdx = outputs.findIndex(output => output.script.chunks[0].opcodenum === 118
                && to === bsv.Address.fromScript(output.script).toString());
        }
        if (destroy) { outputIdx = 0 }
        if (outputIdx >= 0) {
            try {
                const l = destroy ? `${bsvtx.hash}_d${outputIdx}` : `${bsvtx.hash}_o${outputIdx}`
                const jig = await run.load(l);
                const contract = minted || deploy ? jig : jig.constructor;
                let tokenName = contract?.metadata?.name || contract?.metadata?.symbol || contract?.symbol || contract.name;
                if (!qty && contract.deps?.Token) { qty = jig.amount }
                if (!contract.deps?.Token) { qty = 1 }
                else {
                    if (contract.decimals) {
                        qty = qty / Math.pow(10, contract.decimals)
                    }
                }
                let act = '';
                if (to === run.owner.address) {
                    if (minted) { act = 'Mint' }
                    else if (deploy) { act = 'Deploy' }
                    else if (call && !destroy) { act = 'Update' }
                    else if (destroy) { act = 'Destroy' }
                    else { act = '+' }
                } else { act = '-' }
                if (tokenName !== 'Code') {
                    const histObj = {
                        action: act,
                        qty: act === 'Deploy' || act === 'Update' ? '' : qty,
                        tokenName,
                        contract: contract.origin,
                        location: `${bsvtx.hash}_o${outputIdx}`,
                        time: t?.blocktime || parseInt(new Date().getTime()/1000),
                        origin: jig.origin,
                        txid: t.txid,
                        hex: t.hex,
                        blockheight: t?.blockheight || null 
                    }
                    return histObj;
                }
            } catch(e) {
                console.log({e}, `${bsvtx.hash}_o${outputIdx}`);
            }
        } else {
            console.log(`TXID`, t.txid);
            return null;
        }
    }
}
const txHistory = async() => {
    let transactions = await getHistoryEntries();
    const recent = transactions?.length ? true : false;
    const recentTx = await getHistory(run.owner.address, recent);
    if (recent) {
        for (let tx of recentTx) {
            const exists = await getHistoryEntry(tx.txid);
            if (!exists) { transactions.push(tx) }
        }
        transactions = recentTx;
    } else { transactions = recentTx }
    for (let i = 0; i < transactions.length; i++) {
        const h = await evalRUNTx(transactions[i]);
        if (h) addEntry(h);
    }
}
const lazyLoadHistory = async() => {
    document.getElementById('lock').style.display = 'none';
    await txHistory();
    await getBSVHistory();
}
var historyCount = 0;
const historyCache = async() => {
    document.getElementById('loadinghist').style.display = 'inline-block';
    document.getElementById('historylist').style.display = 'none';
    document.getElementById('historylist').innerHTML = '';
    let transactions = await getHistoryEntries();
    for (let t of transactions) {
        await addToHist(t);
        historyCount++;
    }
    setTimeout(() => {
        document.getElementById('loadinghist').style.display = 'none';
        document.getElementById('historylist').style.display = 'block';
        if (!historyCount) document.getElementById('historylist').innerText += 'No transaction records found.';
    }, 500)
}