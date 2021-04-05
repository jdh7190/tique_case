const entryCon = document.getElementById('entryCon');
const entry = document.getElementById('entry');
const restore = document.getElementById('restorebtn');
const showEntry = () => {
    entry.readOnly = true;
    entry.className += ' disabled';
    entry.value = localStorage.getItem('seed');
    entryCon.style.display = 'block';
    localStorage.setItem('hasBackedUp', 'true');
    restore.style.display = 'none';
}
const showRestore = () => {
    entry.readOnly = false;
    entry.value = '';
    entry.className = 'entry';
    entryCon.style.display = 'block';
    restore.style.display = 'block';
}
const restoreSeed = () => {
    const seed = entry.value;
    let valid, mnemonic;
    try {
        if (!seed) {
            let e = { message: "Please enter a valid seed." };
            throw e;
        }
        valid = bsvMnemonic.isValid(seed);
        mnemonic = bsvMnemonic.fromString(seed);
    }
    catch (e) {
        alert(`Seed phrase is invalid: ${e.message}`);
        return;
    }
    const hdPrivKey = bsv.HDPrivateKey.fromSeed(mnemonic.toSeed(), network === 'test' ? 'testnet' : '');
    const owner = hdPrivKey.deriveChild(ownerPath).privateKey.toString();
    const purse = hdPrivKey.deriveChild(pursePath).privateKey.toString();
    if (owner && purse) {
        localStorage.clear();
        localStorage.setItem('seed', mnemonic.toString());
        localStorage.setItem('purseKey', purse);
        localStorage.setItem('ownerKey', owner);
        alert('Seed restored successfully!');
        clearUTXOs();
        clearRunCache();
    }
    else {
        alert('Failed to restore seed.');
        return;
    }
}
trust = localStorage.trust || "0";
document.getElementById('trust').options[trust].selected = true;
document.getElementById('trust').onchange = () => {
    trust = document.getElementById('trust').value;
    localStorage.setItem('trust', trust);
}
const apiEval = opt => {
    switch(opt) {
        case 'run': return '0';
        case 'mattercloud': return '1';
        case 'whatsonchain': return '2';
        default: throw 'Invalid API.';
    }
}
transfer = async(from, to) => {
    const tRun = initRun(true, localStorage.purseKey, localStorage.purseKey, false, true);
    const ownerAddr = bsv.Address.fromPrivateKey(bsv.PrivateKey.fromWIF(localStorage.ownerKey))
    if (!from && !to) { from = run.purse.address, to = ownerAddr.toString() }
    try {
        let utxos = await run.blockchain.utxos(from), cache = [], foundJig = false, rtx = new Run.Transaction();
        for (let utxo of utxos) {
            const rawtx = await run.blockchain.fetch(utxo.txid);
            if (isJig(rawtx, utxo.vout)) {
                let jig = await tRun.load(`${utxo.txid}_o${utxo.vout}`);
                if (jig) {
                    rtx.update(() => { if (typeof jig !== 'function') { foundJig = true; jig.send(to) } })
                }
            }
            else { cache.push(utxo) }
        }
        if (foundJig) {
            let s = confirm(`Do you want to transfer jigs from the purse to the owner?`);
            if (s) {
                let r = await rtx.export();
                let tx = await run.blockchain.broadcast(r);
                console.log({tx})
                if (tx) {
                    alert(`Jigs transferred! ${tx}`)
                }
            }
        }
        else { alert('No jigs to transfer.') }
    } catch (e) { alert(e) }
}
transferSats = async(from, to) => {
    const run = initRun(true, null, null, true, true);
    if (!from && !to) { from = run.owner.address, to = run.purse.address }
    let utxos = await run.blockchain.utxos(from), send = [];
    for (let utxo of utxos) {
        const rawtx = await run.blockchain.fetch(utxo.txid);
        if (!isJig(rawtx, utxo.vout)) { send.push(utxo) }
    }
    if (send.length) {
        const sats = send.reduce((a, curr) => { return a + curr.satoshis }, 0);
        let s = confirm(`Do you want to transfer ${sats} satoshis from the owner to the purse?`);
        if (s) {
            let tx = new bsv.Transaction().from(send).to(to, sats - (100 * send.length)).sign(run.owner.privkey);
            let txid = await run.blockchain.broadcast(tx.toString('hex'));
            if (txid) { alert(`Satohis transferred! ${txid}`) }
        }
    }
    else { alert('No satoshis to transfer.') }
}
api = localStorage.api || "run";
document.getElementById('api').options[apiEval(api)].selected = true;
document.getElementById('api').onchange = () => {
    api = document.getElementById('api').value;
    localStorage.setItem('api', api);
    softRefresh();
}
document.getElementById('backup').addEventListener('click', showEntry)
document.getElementById('restore').addEventListener('click', showRestore)
restore.addEventListener('click', restoreSeed);
document.getElementById('pTransfer').addEventListener('click', () => transferSats());
document.getElementById('oTransfer').addEventListener('click', () => transfer())