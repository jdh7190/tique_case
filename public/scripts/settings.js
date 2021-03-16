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
api = localStorage.api || "run";
document.getElementById('api').options[apiEval(api)].selected = true;
document.getElementById('api').onchange = () => {
    api = document.getElementById('api').value;
    localStorage.setItem('api', api);
}
document.getElementById('backup').addEventListener('click', showEntry)
document.getElementById('restore').addEventListener('click', showRestore)
restore.addEventListener('click', restoreSeed);