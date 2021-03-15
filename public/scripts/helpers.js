const addUTXOs = (utxos, db) => {
    console.log('adding UTXOs to cache...');
    const tx = db.transaction('utxos', 'readwrite');
    const table = tx.objectStore('utxos');
    utxos.forEach(utxo => {
        utxo.output = `${utxo.txid}_${utxo.vout}`;
        table.add(utxo);
    });
}
const clearUTXOs = (utxos) => {
    if (idb) {
        const request = indexedDB.open('purse', 1);
        request.onsuccess = e => {
            let db = e.target.result;
            console.log('success');
            const tx = db.transaction('utxos', 'readwrite');
            const store = tx.objectStore('utxos');
            const reqDelete = store.clear();
            reqDelete.onsuccess = e => {
                console.log("UTXO cache cleared.", e);
                if (utxos && utxos?.length !== 0) { addUTXOs(utxos, db) }
            }
        }
        request.onerror = e => { console.log('error', e) }
    }
}
const clearRunCache = () => {
    if (idb) {
        const request = indexedDB.open('run-browser-cache', 1);
        request.onsuccess = e => {
            let db = e.target.result;
            console.log('success');
            const tx = db.transaction('run-objects', 'readwrite');
            const store = tx.objectStore('run-objects');
            const reqDelete = store.clear();
            reqDelete.onsuccess = e => {
                console.log("Run Browser Cache cleared.", e);
            }
        }
        request.onerror = e => { console.log('error') }
    }
}
const outputScript = (addr) => {
    const address = bsv.Address.fromString(addr);
    const script = bsv.Script(address)
    const outScr = script.toASM().split(' ')[2];
    return outScr;
}
const exchrate = async() => {
    const res = await fetch(`https://api.whatsonchain.com/v1/bsv/main/exchangerate`);
    const jres = await res.json();
    return jres;
}
const checkRawTx = (rawtx, addr, txid) => {
    try {
        const tx = new bsv.Transaction(rawtx);
        let utxos = [], vout = 0;
        tx.outputs.forEach(output => {
            let satoshis = output.satoshis;
            let script = new bsv.Script.fromBuffer(output._scriptBuffer);
            if (script.isSafeDataOut()) { vout++; return }
            let pkh = bsv.Address.fromPublicKeyHash(script.getPublicKeyHash());
            let address = pkh.toString();
            if (address === addr) {
                utxos.push({satoshis, txid, vout, script: script.toHex()});
            }
            vout++;
        });
        return utxos;
    }
    catch(error) {
        console.log({error});
        return [];
    }
}
const spent = (tx) => {
    let utxos = [];
    tx.inputs.forEach(input => {
        let vout = input.outputIndex;
        let txid = input.prevTxId.toString('hex');
        utxos.push({txid, vout, output: `${txid}_${vout}`});
    });
    return utxos;
}
setImage = (emojiSpan, metadata, def) => {
    if (metadata) {
        if (metadata.image) {
            emojiSpan.innerHTML = `<img class="emoji" src="data:${metadata.image.mediaType};base64, ${metadata.image.base64Data}" alt="bfile">`;
        }
        else {
            emojiSpan.innerHTML = twemoji.parse(metadata.emoji);
        }
    }
    else if (def?.metadata) {
        if (def.metadata.image) {
            emojiSpan.innerHTML = `<img class="emoji" src="data:${def.metadata.image.mediaType};base64, ${def.metadata.image.base64Data}" alt="bfile">`;
        }
        else {
            emojiSpan.innerHTML = twemoji.parse(def.metadata.emoji);
        }
    }
    else { emojiSpan.innerHTML = twemoji.parse('🐉') }
    return emojiSpan;
}
setName = (nameSpan, contract, def, loc, network) => {
    if (contract?.metadata) {
        nameSpan.innerHTML = `<a href=https://run.network/explorer/?query=${loc}&network=${network} target="_blank">${contract?.metadata?.name || contract.name}</a>`;
        nameSpan.innerText = `${contract?.metadata?.name || contract.name}`;
    }
    else if (def) {
        nameSpan.innerHTML = `<a href=https://run.network/explorer/?query=${loc}&network=${network} target="_blank">${def?.metadata?.name || def.name}</a>`;
        nameSpan.innerText = `${def?.metadata?.name || def.name}`;
    }
    else { nameSpan.innerText = `${contract.name}` }
    return nameSpan;
}
softRefresh = async() => {
    let r = await exchrate();
    localStorage.setItem('rate', r.rate);
    clearUTXOs();
    clearRunCache();
}
hardRefresh = () => {
    localStorage.clear();
    clearUTXOs();
    clearRunCache();
    trust = "0";
    localStorage.setItem('trust', "0");
}
const initRun = (trst, purse, owner, useCustomPurse = true, activate) => {
    if (!owner) owner = localStorage.getItem('ownerKey');
    if (!purse) purse = localStorage.getItem('purseKey');
    const cache = rundbhost !== '' ? new Run.plugins.RunDB(rundbhost) : null;
    if (purse && owner) {
        if (useCustomPurse) {
            const acorns = new acornsPurse({ privkey: purse, blockchain, splits, feePerKb });
            run = new Run({ network, owner, purse: acorns, api, timeout, app });
        }
        else { run = new Run({ network, owner, purse, api, app, timeout }) }
        if (trust === "2" || trst) { run.trust('*') }
        if (activate) { run.activate() }
        if (cache) {
            run.cache = cache
            run.client = true;
        }
        return run;
    }
    else { alert('Error initializing owner and purse keys.') }
}
isJig = (rawtx, vout) => {
    const tx = new bsv.Transaction(rawtx)
    if (!tx.outputs.length) return false
    if (tx.outputs[0].script.chunks.length < 6) return false
    const chunks = tx.outputs[0].script.chunks
    if (!chunks[2].buf) return false
    const prefix = chunks[2].buf.toString('utf8')
    if (prefix !== 'run') return false
    if (!chunks[5].buf) return false
    const payload = chunks[5].buf.toString('utf8')
    try {
      const json = JSON.parse(payload)
      return vout >= 1 && vout <= json.out.length
    }
    catch (e) { return false }
}
const removeContract = (loc) => {
    let contracts = JSON.parse(localStorage.getItem('contracts'));
    const idx = contracts.indexOf(loc);
    if (idx > -1) {
        contracts.splice(idx, 1);
        localStorage.setItem('contracts', JSON.stringify(contracts));
    }
}
validateHandle = text => {
    let handle = '';
    const paymail = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    if (paymail?.length) { handle = paymail[0].startsWith('1') ? paymail[0].substr(1, paymail[0].length) : handle = paymail[0] }
    else {
        const oneHandle = text.match(/(?:^|\W)1(\w+)(?!\w)/g);
        if (oneHandle?.length) { handle = `${oneHandle[0].substr(1, oneHandle[0].length)}@relayx.io` }
        else { return '' }
    }
    return handle;
}
getAddress = async(handle) => {
    try {
        let res = await fetch(`https://api.relayx.io/v1/paymail/run/${handle.toLowerCase()}`);
        let jres = await res.json();
        return jres?.data;
    }
    catch (e) { alert(e); return '' }
}
const sleep = (timeout) => { return new Promise(resolve => setTimeout(resolve, timeout)) }