const extractUTXOs = (rawtx, addr) => {
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
                utxos.push({satoshis, txid: tx.hash, vout, script: script.toHex()});
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
const spent = tx => {
    let utxos = [];
    tx.inputs.forEach(input => {
        let vout = input.outputIndex;
        let txid = input.prevTxId.toString('hex');
        utxos.push({txid, vout, output: `${txid}_${vout}`});
    });
    return utxos;
}
setImage = (metadata, def, origin) => {
    let img;
    if (metadata?.image === '_o1' && !def && !metadata.emoji) {
        img = `<img class="emoji" src="https://mornin.run/${origin}/img.png" alt="bfile">`;
        addImage({ origin, img });
        return img;
    }
    if (def?.origin === '1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2' && origin) { // Gopniks contract
        img = `<img class="emoji" src="https://mornin.run/${origin}/img.png" alt="bfile">`;
    } else {
        if (metadata && !def) {
            if (metadata.image) {
                img = `<img class="emoji" src="data:${metadata.image.mediaType};base64, ${metadata.image.base64Data}" alt="bfile">`;
            }
            else {
                img = twemoji.parse(metadata.emoji);
            }
        }
        else if (def?.metadata) {
            if (def.metadata.image === '_o1') {
                img = `<img class="emoji" src="https://mornin.run/${def.origin}/img.png" alt="bfile">`;
                
            }
            else if (def?.metadata?.image && typeof def.metadata.image === 'string') {
                const match = def.metadata.image.match(/^[0-9a-f]{64}_o[1-9][0-9]*$/g);
                if (match.length > 0) {
                    const bTxid = match[0].slice(0,64);
                    img = `<img class="emoji" src="https://bico.media/${bTxid}" alt="bfile">`;
                }
            }
            else {
                if (def.metadata.image) {
                    img = `<img class="emoji" src="data:${def.metadata.image.mediaType};base64, ${def.metadata.image.base64Data}" alt="bfile">`;
                }
                else {
                    img = twemoji.parse(def.metadata.emoji);
                }
            }
        }
        else { img = twemoji.parse('🐉') }
    }
    img ? addImage({ origin: def?.origin || origin, img }) : `<img class="emoji" src="https://mornin.run/${origin}/img.png" onerror="this.onerror=null;this.src='https://tique.run/images/logo-512x512.png';">`; 
    return img;
}
setName = (contract, def, loc, network, isNFT) => {
    let n;
    if (isNFT) {
        const nftName = contract?.constructor?.metadata?.name || contract?.name || def?.name;
        n = `<a href=https://run.network/explorer/?query=${loc}&network=${network} target="_blank">${nftName}</a>`;
        n = `${nftName}`;
    } else {
        if (contract?.metadata) {
            n = `<a href=https://run.network/explorer/?query=${loc}&network=${network} target="_blank">${contract?.metadata?.name || contract.name}</a>`;
            n = `${contract?.metadata?.name || contract.name}`;
        }
        else if (def) {
            n = `<a href=https://run.network/explorer/?query=${loc}&network=${network} target="_blank">${def?.metadata?.name || def.name}</a>`;
            n = `${def?.metadata?.name || def.name}`;
        }
        else { n = `${contract.name}` }
    }
    return n;
}
softRefresh = async() => {
    let r = await exchrate();
    localStorage.setItem('rate', r.rate);
    clearUTXOs();
    clearHistory();
    clearRunCache();
}
hardRefresh = () => {
    localStorage.clear();
    clearUTXOs();
    clearHistory();
    clearRunCache();
    trust = "2";
    localStorage.setItem('trust', "2");
}
const initRun = (trst, purse, owner, useCustomPurse = true, activate) => {
    if (!owner) owner = localStorage.getItem('ownerKey');
    if (!purse) purse = localStorage.getItem('purseKey');
    const state = rundbhost !== '' ? new Run.plugins.RunDB(rundbhost) : null;
    if (purse && owner) {
        if (useCustomPurse) {
            const acorns = new acornsPurse({ privkey: purse, blockchain, splits, feePerKb });
            run = new Run({ network, owner, purse: acorns, api, timeout, app });
        }
        else { run = new Run({ network, owner, purse, api, app, timeout }) }
        if (trust === "2" || trst) { run.trust('*') }
        if (activate) { run.activate() }
        if (state) {
            run.state = state
            run.client = true;
            run.trust(['cache'])
        }
        return run;
    }
    else { alert('Error initializing owner and purse keys.') }
}
isJig = (rawtx, vout) => {
    const tx = new bsv.Transaction(rawtx)
    if (!tx.outputs.length) return false
    const RUN_OUTPUT = tx.outputs.find(o => o.script.chunks[2].buf.toString('utf8') === 'run');
    if (!RUN_OUTPUT) return false;
    const chunks = RUN_OUTPUT.script.chunks
    if (!chunks[2].buf) return false
    const prefix = chunks[2].buf.toString('utf8')
    if (prefix !== 'run') return false
    if (!chunks[5].buf) return false
    const payload = chunks[5].buf.toString('utf8')
    try {
      const json = JSON.parse(payload)
      return vout >= 0 && json.out.length > 0
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
getAddress = async handle => {
    try {
        let res = await fetch(`https://api.relayx.io/v1/paymail/run/${handle.toLowerCase()}`);
        let jres = await res.json();
        return jres?.data;
    }
    catch (e) { alert(e); return '' }
}
const sleep = timeout => { return new Promise(resolve => setTimeout(resolve, timeout)) }
const timeago = ms => {
    ms = Date.now() - ms;
    let ago = Math.floor(ms / 1000);
    let part = 0;
    if (ago < 15) { return "now"; }
    if (ago < 60) { return ago + "sec"; }
    if (ago < 120) { return "1min"; }
    if (ago < 3600) {
        while (ago >= 60) { ago -= 60; part += 1; }
        return part + "min";
    }
    if (ago < 7200) { return "1hr"; }
    if (ago < 86400) {
        while (ago >= 3600) { ago -= 3600; part += 1; }
        return part + "hr";
    }
    if (ago < 172800) { return "1d"; }
    if (ago < 604800) {
        part = parseInt(ago / 86400);
        return part + "d";
    }
    if (ago < 1209600) { return "1wk"; }
    if (ago < 2592000) {
        while (ago >= 604800) { ago -= 604800; part += 1; }
        return part + "wk";
    }
    if (ago < 5184000) { return "1mth"; }
    if (ago < 31536000) {
        while (ago >= 2592000) { ago -= 2592000; part += 1; }
        return part + "mth";
    }
    if (ago < 1419120000) {
        return "1y";
    }
    return "1y";
}
trustContracts = run => {
    const contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
    if (contracts.length) {
        contracts.forEach(contract => {
            if (!banned.includes(contract)) {
                run.trust(contract.substr(0, 64))
            }
        })
    }
}
getJigs = async(ownerAddress) => {
    let jigs = [];
    const utxos = await run.blockchain.utxos(ownerAddress);
    for (let utxo of utxos) {
        try {
            let jig = await run.load(`${utxo.txid}_o${utxo.vout}`);
            jigs.push(jig);
        } catch(e) { console.log(e) }
    }
    return jigs;
}
getPaymailAddress = async paymail => {
    const { address } = await (await fetch(`https://api.polynym.io/getAddress/${paymail}`)).json();
    return address;
}
const destroyJig = async (location, tokens) => {
    const base = bsv.Transaction().to(BURN_FEE_ADDRESS, 1000);
    const tx = new Run.Transaction();
    tx.base = base;
    if (tokens?.length) {
        if (tokens.length > 1) {tx.update(() => tokens[0].combine(...tokens.slice(1))) }
        tx.update(() => tokens[0].destroy());
    } else {
        const jig = await run.load(location);
        await jig.sync();
        tx.update(() => jig.destroy())
    }
    const rawtx = await tx.export();
    return rawtx;
}
const between = (x, min, max) => { return x >= min && x <= max }
const search = id => {
    let input = document.getElementById(id), filter = input.value.toUpperCase(), cards, list, a, txtValue;
    list = document.getElementById(id === 'tokenSearch' ? 'tokenlist' : 'nftlist');
    cards = list.getElementsByTagName('div');
    for (let i = 0; i < cards.length; i++) {
        a = cards[i].getElementsByClassName('card_label')[0];
        if (a) {
            txtValue = a?.innerHTML || a?.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {cards[i].style.display = ''}
            else {cards[i].style.display = 'none'}
        }
    }
}
const sumSatoshis = arr => {
    return arr.reduce((a,b) => {return a + b.satoshis}, 0);
}
const postTxToDB = async(tx, url, hex) => {
    url = url ? url : rundbhost;
    if (url) {
        if (hex) {
            const r = await (await fetch(`${url}/tx/${tx}`, { method: 'post', body: hex })).text()
            console.log({r})
        } else {
            const r = await (await fetch(`${url}/tx/${tx}`, { method: 'post' })).text()
            console.log({r})
        }
    }
}