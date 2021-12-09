const addEntry = entry => {
    if (idb) {
        const request = indexedDB.open('tiquecase', 1);
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
        const request = indexedDB.open('tiquecase', 1);
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
        const request = indexedDB.open('tiquecase', 1);
        request.onsuccess = e => {
            db = e.target.result;
            const tx = db.transaction('history', 'readonly');
            const table = tx.objectStore('history');
            const entries = table.getAll();
            entries.onsuccess = e => {
                const history = e.target.result;
                return cb(history)
            }
        }
        request.onerror = e => { console.log('error', e) }
    }
}
const getHistoryEntry = txid => {
    return new Promise((resolve, reject) => { getEntry(txid, entry => { entry ? resolve(entry) : resolve({}) }) })
}
const getHistoryEntries = () => {
    return new Promise((resolve, reject) => { historyEntries(entries => { entries.length ? resolve(entries) : resolve([]) }) })
}
document.getElementById('loading').style.display = 'inline-block';
initRun(true);
trustContracts(run);
var transactions = [];
const fetchHexes = async txids => {
    const h = await (await fetch(`https://api.whatsonchain.com/v1/bsv/main/txs/hex`, { method: 'post', body: JSON.stringify({ txids }) })).json();
    h.forEach(t => {
        transactions.push(t);
        addEntry(t);
    })
}
getHistory = async(address = run.owner.address, recent = false) => {
    const jres = await (await fetch(`https://api.whatsonchain.com/v1/bsv/${network}/address/${address}/history`)).json();
    const txs = jres.map(t => t.tx_hash);
    let txids = [];
    const mod = txs.length % 20;
    let looptimes = recent ? 1 : parseInt(txs.length / 20);
    if (recent) {
        for (let l = txs.length - 1; l > txs.length - 21; l--) {
            txids.push(txs[l]);
        }
        await fetchHexes(txids)
    }
    if (looptimes > 1 || !recent) {
        let x = 0;
        for (let i = 0; i < looptimes; i++) {
            txids = [];
            for (let j = 0; j < 20; j++) {
                txids.push(txs[x]);
                x++;
            }
            await fetchHexes(txids);
        }
        txids = [];
        for (let k = txs.length - 1; k > txs.length - mod; k--) {
            txids.push(txs[k]);
        }
        if (txids.length) {
            await fetchHexes(txids);
        }
    }
    return transactions;
}
addToList = entry => {
    let li = document.createElement('li');
    li.className = 'entry';
    let emojiSpan = document.createElement('span');
    emojiSpan.className = "emoji";
    emojiSpan = setImage(emojiSpan, entry.contract?.metadata, entry.contract, entry.origin);
    li.innerHTML = emojiSpan.innerHTML;
    li.innerHTML += `<span class="entryText"><a href="https://whatsonchain.com/tx/${entry.location.substr(0, 64)}" target=_blank>${entry.action}</a> 
    ${entry.qty ? entry.qty : ''} <a href="https://run.network/explorer/?query=${entry.contract.origin}&network=${network}" target=_blank>${entry.tokenName}</a></span>`;
    li.innerHTML += `<span class="time">${timeago(entry.time*1000)}</span>`;
    document.getElementById('list').appendChild(li);
}
compare = (a, b) => {
    if (!a.blockheight) { return -2 }
    if (a.blockheight < b.blockheight ) { return 1 }
    else if (a.blockheight  > b.blockheight ) { return -1 }
}
txHistory = async() => {
    let transactions = await getHistoryEntries();
    const recent = transactions?.length ? true : false;
    const recentTx = await getHistory(run.owner.address, recent);
    if (recent) {
        for (let tx of recentTx) {
            const exists = await getHistoryEntry(tx.txid);
            if (!exists) { transactions.push(tx) }
        }
    } else { transactions = recentTx }
    transactions.sort(compare);
    document.getElementById('loading').style.display = 'none';
    for (let i = 0; i < transactions.length; i++) {
        let metadata, isSend = false;
        const bsvtx = bsv.Transaction(transactions[i].hex);
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
        try { metadata = Run.util.metadata(transactions[i].hex) }
        catch(e) { console.log(e) }
        if (metadata) {
            const { exec } = metadata;
            let to, qty, minted = false, action, deploy = false;
            try {
                action = metadata.exec[0].data[1];
                if (action === 'send' || action === 'combine') {
                    if (isSend) {
                        [to, qty] = exec.find(d => d.data[1] === 'send')?.data[2];
                    } else {
                        [to, qty] = exec.find(d => d.data[1] === 'send' && d.data[2][0] === run.owner.address)?.data[2];
                    }
                }
                else if (action === 'mint') {
                    minted = true;
                    [qty, to] = metadata.exec[0].data[2];
                }
                else {
                    if (exec[0].op === 'DEPLOY') {
                        deploy = true;
                        to = run.owner.address;
                    }
                }
            } catch(e) { console.log(e, metadata.exec[0].data) }
            let outputIdx = outputs.findIndex(output => output.script.chunks[0].opcodenum === 118
                && to === bsv.Address.fromScript(output.script).toString());
            if (outputIdx >= 0) {
                try {
                    const jig = await run.load(`${bsvtx.hash}_o${outputIdx}`);
                    const contract = minted || deploy ? jig : jig.constructor;
                    let tokenName = contract?.metadata?.symbol || contract?.symbol || contract?.metadata?.name || contract.name;
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
                        else if (deploy) { act = 'Depl' }
                        else { act = 'Rec.' }
                    } else { act = 'Sent' }
                    if (tokenName !== 'Code') {
                        const histObj = {
                            action: act,
                            qty, tokenName,
                            contract,
                            location: `${bsvtx.hash}_o${outputIdx}`,
                            time: transactions[i]?.blocktime || new Date(),
                            origin: jig.origin
                        }
                        addToList(histObj);
                    }
                } catch(e) {
                    console.log({e}, `${bsvtx.hash}_o${outputIdx}`);
                }
            }
        }
    }
}
txHistory()