document.getElementById('loading').style.display = 'inline-block';
initRun();
getHistory = async address => {
    const jres = await (await fetch(`https://api.whatsonchain.com/v1/bsv/${network}/address/${address}/history`)).json();
    const rawtxs = [];
    for (let tx of jres) {
        const raw = await run.blockchain.fetch(tx.tx_hash);
        const time = await run.blockchain.time(tx.tx_hash);
        rawtxs.push({ rawtx: raw, txid: tx.tx_hash, block: tx.height, time });
    }
    localStorage.setItem('history', JSON.stringify(rawtxs));
}
addToList = entry => {
    let li = document.createElement('li');
    li.className = 'entry';
    let emojiSpan = document.createElement('span');
    emojiSpan.className = "emoji";
    emojiSpan = setImage(emojiSpan, entry.contract?.metadata);
    li.innerHTML = emojiSpan.innerHTML;
    li.innerHTML += `<span class="entryText"><a href="https://whatsonchain.com/tx/${entry.location.substr(0, 64)}" target=_blank>${entry.action}</a> 
    ${entry.qty ? entry.qty : ''} <a href="https://run.network/explorer/?query=${entry.contract.origin}&network=${network}" target=_blank>${entry.tokenName}</a></span>`;
    li.innerHTML += `<span class="time">${timeago(entry.time)}</span>`;
    document.getElementById('list').appendChild(li);
}
compare = (a, b) => {
    if (a.block === 0) { return -2 }
    if (a.block < b.block) { return 1 }
    else if (a.block > b.block) { return -1 }
}
txHistory = async tx => {
    await getHistory(run.owner.address);
    let rawtxs = [];
    if (tx) {
        const raw = await run.blockchain.fetch(tx);
        rawtxs.push(raw)
    } else { rawtxs = JSON.parse(localStorage.history) }
    rawtxs.sort(compare);
    document.getElementById('loading').style.display = 'none';
    for (let i = 0; i < rawtxs.length; i++) {
        let metadata, isSend = false;
        const bsvtx = bsv.Transaction(rawtxs[i].rawtx);
        const outputs = bsvtx.outputs;
        const inputs = bsvtx.inputs;
        try {
            for (let i = 0; i < inputs.length; i++) {
                const inputAddress = bsv.Address.fromPublicKey(bsv.PublicKey.fromHex(inputs[i].script.chunks[1].buf.toString('hex'))).toString();
                if (inputAddress === run.owner.address) {
                    isSend = true;
                    break;
                }
            }
        } catch (e) { console.log(e) }
        try { metadata = Run.util.metadata(rawtxs[i].rawtx) }
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
                && run.owner.address === bsv.Address.fromScript(output.script).toString());
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
                        if (minted) { act = 'Minted' }
                        else if (deploy) { act = 'Deployed' }
                        else { act = 'Received' }
                    } else { act = 'Sent' }
                    if (tokenName !== 'Code') {
                        addToList({ action: act, qty, tokenName, contract, location: `${bsvtx.hash}_o${outputIdx}`, time: rawtxs[i].time });
                    }
                } catch(e) { console.log({e}, `${bsvtx.hash}_o${outputIdx}`) }
            }
        }
    }
}
txHistory()