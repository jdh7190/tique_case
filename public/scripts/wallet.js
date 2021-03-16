var unit = 'USD', wallet = 'purse', jigsCount = 0, balElem = document.getElementById('bsvBalance'), jigsbtn = document.getElementById('sendjigs');
var inputAddr = document.getElementById('purseAddr'), ownerAddr = document.getElementById('ownerAddr'), jigs = [], contracts = [], constructors = [];
Run.util.sha256 = async(h) => {return new Uint8Array(await crypto.subtle.digest('SHA-256', h))}
const qrCode = (e, value) => {
    let qrAddr = document.getElementById(e);
    qrAddr.innerText = '';
    const qrcode = new QRCode(qrAddr, { width: 78, height: 78 });
    qrcode.makeCode(value);
    const imgs = document.getElementsByTagName('img');
    imgs[2].alt = 'QR';
    imgs[2].style.width = '78px', imgs[2].style.height = '78px';
}
const copyAddr = () => {
    const copyText = wallet === 'purse' ? inputAddr : ownerAddr;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied address: " + copyText.value);
}
update = (u) => {
    const storedBalance = parseInt(localStorage.getItem('purseSats') * 100000000);
    const added = u.reduce(((t, e) => t + e.satoshis), 0)
    sync(storedBalance + added);
}
const listenTx = (address, jig) => {
    let es;
    if (network === 'main') { es = new EventSource(`https://stream.bitcoinfiles.org/mempool/filter/${outputScript(address)}`) }
    else if (network === 'test') { es = new EventSource(`https://stream-testnet.bitcoinfiles.org/mempool/filter/${outputScript(address)}`) }
    else { throw `Invalid network: ${network}`}
    es.onmessage = async(event) => {
        if (event) {
            const tx = JSON.parse(event.data);
            if (tx?.raw) {
                let u = checkRawTx(tx.raw, address, tx.h);
                if (jig) {
                    for (let utxo of u) {
                        let j = await run.load(`${utxo.txid}_o${utxo.vout}`);
                        insertJig(j);
                        document.getElementById('list').innerHTML = '';
                        loadAll();
                        //loadToken(j.constructor.location);
                    }
                }
                else {
                    if (u.length > 0 && idb) {
                        const request = indexedDB.open('purse', 1);
                        request.onsuccess = e => {
                            let db = e.target.result;
                            console.log('success');
                            update(u)
                            addUTXOs(u, db);
                        }
                        request.onerror = e => { console.log('error', e) }
                    }
                    else { update(u) }
                }
            }
        }
    };
}
const loadToken = async(loc) => {
    let balance = 0, contract = constructors.find(c => c.location === loc);
    if (contract?.deps?.Token) {
        const tokens = jigs.filter(jig => jig instanceof contract);
        if (tokens.length) {
            tokens.forEach(coin => { balance += coin.amount });
            addToList(contract, loc, balance);
        }
    }
    else if (contract) {
        const nfts = jigs.filter(jig => jig instanceof contract);
        nfts.forEach(nft => addToList(nft, loc, 0, contract));
    }
}
insertJig = jig => {
    if (typeof jig === 'object') {
        const jigIdx = jigs.findIndex(i => i.location === jig.location);
        if (jigIdx < 0) { jigs.push(jig) }
        const conIdx = constructors.findIndex(i => i.location === jig.constructor.location);
        if (conIdx < 0) { constructors.push(jig.constructor) }
        if (!contracts.includes(jig.constructor.location)) { contracts.push(jig.constructor.location) }
    }
}
const loadAll = async() => {
    let utxos = await run.blockchain.utxos(run.owner.address), utxoLoc, again = false;
    for (utxo of utxos) {
        try {
            utxoLoc = `${utxo.txid}_o${utxo.vout}`;
            let jig = await run.load(utxoLoc);
            insertJig(jig);
        }
        catch (e) {
            if (e.txid && trust === "0") {
                run.trust(e.txid);
                again = true;
            }
        }
    }
    if (again) { await loadAll(); again = false }
    if (contracts) {
        for (let contract of contracts) { loadToken(contract) }
        localStorage.setItem('contracts', JSON.stringify(contracts));
    }
    document.getElementById('loading').style.display = 'none';
}
const initWallet = () => {
    contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
    if (contracts.length) { contracts.forEach(contract => { run.trust(contract.substr(0, 64)) }) }
    inputAddr.value = run.purse.address;
    document.getElementById('sendbsv').addEventListener('click', () => { location.href = './sendbsv.html' })
    document.getElementById('copyAddr').addEventListener('click', copyAddr);
    document.getElementById('ocopyAddr').addEventListener('click', copyAddr);
    balElem.addEventListener('click', switchUnits);
    jigsbtn.addEventListener('click', () => {
        const loc = document.querySelector('input[name="jigs"]:checked').id;
        sendCache(loc);
        location.href = `./send.html?loc=${loc}`;
    });
    qrCode('qrAddr', run.purse.address);
    listenTx(run.purse.address);
    loadAll();
    //listenTx(run.owner.address, true);
}
sendCache = loc => {
    const contract = constructors.find(c => c.location === loc);
    if (contract?.deps?.Token) {
        const sending = jigs.filter(jig => jig instanceof contract);
        let send = [];
        sending.forEach(jig => { send.push(jig.location) });
        localStorage.setItem('sending', JSON.stringify(send));
    }
}
networkSync = async(db) => {
    const bal = await run.purse.balance();
    if (db) {
        const newUTXOs = bal.utxos;
        addUTXOs(newUTXOs, db);
    }
    const res = await exchrate();
    localStorage.setItem('rate', res.rate);
    sync(bal.balance);
}
const balance = async() => {
    let db;
    if (idb) {
        const request = indexedDB.open('purse', 1);
        request.onsuccess = e => {
            db = e.target.result;
            if (db.objectStoreNames.contains('utxos')) {
                console.log('success opening db.');
                run.purse.getUTXOs(0, db, async(utxos) => {
                    if (utxos.length) {
                        const bal = await run.purse.balance(utxos);
                        sync(bal.balance);
                    }
                    else { networkSync(db) }
                })
            } else { console.log('utxos object store not found.') }
        }
        request.onerror = e => { console.log('error', e) }
    }
    else { networkSync() }
}
const sync = sats => {
    const s = sats / 100000000;
    const b = (s * localStorage.getItem('rate')).toFixed(2);
    balElem.innerText = `$ ${b}`;
    localStorage.setItem('purseSats', s);
    localStorage.setItem('usdBalance', b);
}
const switchUnits = () => {
    if (unit === 'BSV') {
        balElem.className = 'purseBalance';
        balElem.innerText = `$${localStorage.getItem('usdBalance')}`;
        unit = 'USD';
    }
    else {
        balElem.className = 'purseBalance bsvBalance';
        balElem.innerText = `${localStorage.getItem('purseSats')} BSV`;
        unit = 'BSV';
    }
}
flip = () => {
    if (wallet === 'purse') {
        document.getElementById('purselink').innerHTML = `<img src="images/Ownership.svg" class="ownerlogo" alt="Owner">`;
        document.getElementById('flipInner').style.transform = 'rotateY(180deg)';
        qrCode('oqrAddr', run.owner.address);
        ownerAddr.value = run.owner.address;
        document.getElementById('jigBalance').innerText = `${jigsCount} jigs`;
        wallet = 'jigs';
    }
    else {
        document.getElementById('purselink').innerHTML = `<img src="images/Purse.svg" class="purselogo" alt="Purse">`;
        document.getElementById('flipInner').style.transform = 'rotateY(360deg)';
        qrCode('qrAddr', run.purse.address);
        inputAddr.value = run.purse.address;
        wallet = 'purse';
    }
}
document.getElementById('flip').addEventListener('click', flip);
document.getElementById('oflip').addEventListener('click', flip);
//document.getElementById('oTransfer').addEventListener('click', () => transferSats());
//document.getElementById('pTransfer').addEventListener('click', () => transfer())
if (script) {
    script.onload = () => {
        const mnemonic = bsvMnemonic.fromRandom();
        const hdPrivKey = bsv.HDPrivateKey.fromSeed(mnemonic.toSeed(), network === 'test' ? 'testnet' : '');
        const owner = hdPrivKey.deriveChild('m/0/0').privateKey.toString();
        const purse = hdPrivKey.deriveChild('m/0/1').privateKey.toString();
        localStorage.setItem('seed', mnemonic.toString());
        localStorage.setItem('purseKey', purse);
        localStorage.setItem('ownerKey', owner);
        localStorage.setItem('hasBackedUp', 'false');
        initRun();
        initWallet();
        balance();
    }
}
else {
    document.getElementById('loading').style.display = 'inline-block';
    if (localStorage.getItem('hasBackedUp') === 'false') {alert('Please backup your wallet!')}
    initRun();
    initWallet();
    balance();
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('flip') && localStorage.ownerKey) { setTimeout(() => {flip()}, 600) }
}
const addToList = (contract, loc, balance, def) => {
    const exists = document.getElementById(`${loc}element`);
    if (exists) { return }
    loc = balance > 0 ? loc : contract.location;
    jigsCount++;
    let li = document.createElement('li');
    li.className = 'element';
    li.id = `${loc}element`;
    let radio = document.createElement('input');
    radio.type = 'radio';
    radio.className = 'jig';
    radio.id = loc;
    radio.name = 'jigs';
    radio.onchange = function() { highlight(this, balance) }
    let label = document.createElement('label');
    label.htmlFor = loc;
    label.className = 'select';
    li.appendChild(radio);
    let emojiSpan = document.createElement('span');
    emojiSpan.className = "emoji";
    emojiSpan = setImage(emojiSpan, contract?.metadata, def);
    label.appendChild(emojiSpan);
    let nameSpan = document.createElement('span');
    nameSpan.className = 'contractName';
    nameSpan = setName(nameSpan, contract, def, loc, network);
    label.appendChild(nameSpan);
    if (balance) {
        let bal = document.createElement('span');
        bal.className = "tokenBalance";
        if (contract.decimals > 0) {
            balance = balance / Math.pow(10, contract.decimals);
        }
        bal.innerText = balance;
        label.appendChild(bal);
    }
    li.appendChild(label);
    document.getElementById('list').appendChild(li);
}
const highlight = (el, ft) => {
    jigsbtn.style.background = '#F4C51D';
    const radios = document.querySelectorAll(`input[name='jigs']`);
    for (let i = 0; i < radios.length; i++) {
        document.getElementById(`${radios[i].id}element`).style.background = '';
    }
    document.getElementById(`${el.id}element`).style.background = 'rgba(244, 197, 29, 0.5)';
}
transfer = async(from, to) => {
    if (!from && !to) { from = run.purse.address, to = run.owner.address }
    let utxos = await run.blockchain.utxos(from), cache = [], foundJig = false, rtx = new Run.Transaction();
    let p = localStorage.getItem('purseKey');
    const tRun = initRun(true, p, p, false, true);
    for (let utxo of utxos) {
        const rawtx = await run.blockchain.fetch(utxo.txid);
        if (isJig(rawtx, utxo.vout)) {
            foundJig = true;
            let jig = await tRun.load(`${utxo.txid}_o${utxo.vout}`);
            if (jig) { rtx.update(() => { jig.send(to) }) }
        }
        else { cache.push(utxo) }
    }
    if (foundJig) {
        let s = confirm(`Do you want to transfer jigs from the purse to the owner?`);
        if (s) {
            let r = await rtx.export();
            await run.blockchain.broadcast(r);
            clearUTXOs();
            setInterval(() => { location.reload() }, 3000);
        }
    }
    else {
        alert('No jigs to transfer.');
        location.reload();
    }
}
transferSats = async(from, to) => {
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