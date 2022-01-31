var unit = 'USD', tokensCount = 0, jigsCount = 0, balElem = document.getElementById('bsvBalance'), jigsbtn = document.getElementById('sendjigs');
var inputAddr = document.getElementById('purseAddr');
var ownerAddr = document.getElementById('ownerAddr');
var tokenAddr = document.getElementById('tokenAddr') ,jigs = [], contracts = [], constructors = [], enableHistory = false;
Run.util.sha256 = async h => {return new Uint8Array(await crypto.subtle.digest('SHA-256', h))}
const qrCode = value => {
    let qrAddr = document.getElementById('qr');
    qrAddr.innerText = '';
    const qrcode = new QRCode(qrAddr, { width: 100, height: 100 });
    document.getElementById('qmsg').innerText = value.path[0].previousElementSibling.innerText;
    qrcode.makeCode(value.path[0].previousElementSibling.innerText);
    qModal.style.display = 'block';
}
update = u => {
    const storedBalance = parseInt(localStorage.getItem('purseSats') * 100000000);
    const added = u.reduce(((t, e) => t + e.satoshis), 0)
    sync(storedBalance + added);
}
const listenTx = (address, jig) => {
    let centrifuge;
    const filter = outputScript(address);
    if (network === 'main') { centrifuge = new Centrifuge('wss://socket.whatsonchain.com/mempool') }
    else { throw `${network} network not supported.`}
    centrifuge.on('publish', async message => {
        const hex = message.data.hex;
        if (hex.includes(filter)) {
            let u = extractUTXOs(hex, address);
            if (jig) {
                for (let utxo of u) {
                    let j = await run.load(`${utxo.txid}_o${utxo.vout}`);
                    insertJig(j);
                    document.getElementById('list').innerText = '';
                    loadAll();
                    //loadToken(j.constructor.location);
                }
            }
            else {
                const spnt = spent(bsv.Transaction(hex));
                console.log(spnt);
                spnt.forEach(utxo => deleteUTXO(`${utxo.txid}_${utxo.vout}`));
                u.forEach(utxo => addUTXO(utxo))
                update(u);
            }
        }
    });
    centrifuge.on('disconnect', ctx => { console.log('Disconnected: ' + ctx.reason) });
    centrifuge.on('connect', ctx => { console.log('Connected with client ID ' + ctx.client + ' over ' + ctx.transport) });
    centrifuge.connect();
}
const loadToken = async loc => {
    let balance = 0, contract = constructors.find(c => c.origin === loc);
    if (contract?.deps?.Token) {
        const tokens = jigs.filter(jig => jig instanceof contract);
        if (tokens.length) {
            tokens.forEach(coin => { balance += coin.amount });
            addToList(contract, loc, balance);
            tokensCount++;
        }
    }
    else if (contract) {
        const nfts = jigs.filter(jig => jig instanceof contract);
        nfts.forEach(nft => addToList(nft, loc, 0, contract));
        jigsCount++;
    }
}
insertJig = jig => {
    if (typeof jig === 'object') {
        const jigIdx = jigs.findIndex(i => i.location === jig.location);
        if (jigIdx < 0) { jigs.push(jig) }
        const conIdx = constructors.findIndex(i => i.location === jig.constructor.origin);
        if (conIdx < 0) { constructors.push(jig.constructor) }
        if (!contracts.includes(jig.constructor.origin)) { contracts.push(jig.constructor.origin) }
    }
}
const loadAll = async() => {
    let utxos = await run.blockchain.utxos(run.owner.address), utxoLoc, again = false;
    for (utxo of utxos) {
        try {
            postTxToDB(utxo.txid);
            utxoLoc = `${utxo.txid}_o${utxo.vout}`;
            let jig = await run.load(utxoLoc);
            insertJig(jig);
            if (!enableHistory && jig.constructor.origin === tomeContract) { enableHistory = true }
        }
        catch (e) {
            console.log(e);
            const txToTrust = e.toString().substr(166, 64) || e.txid;
            if (txToTrust?.length === 64 && trust === "0") {
                if (!banned.includes(txToTrust)) {
                    run.trust(txToTrust);
                    again = true;
                }
            }
        }
    }
    if (again) {
        await loadAll();
        again = false;
    }
    if (contracts && !again) {
        for (let contract of contracts) { await loadToken(contract) }
        localStorage.setItem('contracts', JSON.stringify(contracts));
    }
    document.getElementById('loading').style.display = 'none';
}
const initWallet = async() => {
    await initTiqueCaseDB();
    trustContracts(run);
    inputAddr.innerText = run.purse.address;
    ownerAddr.innerText = run.owner.address;
    tokenAddr.innerText = run.owner.address;
    document.getElementById('sendbsv').addEventListener('click', () => { location.href = './sendbsv.html' })
    balElem.addEventListener('click', switchUnits);
    const qrcodes = Array.from(document.getElementsByClassName('qrcode'));
    qrcodes.forEach(q => q.addEventListener('click', qrCode))
    listenTx(run.purse.address);
    balance();
    await loadAll();
    if (enableHistory) lazyLoadHistory();
    await sleep(500);
    if (!jigsCount) document.getElementById('nftlist').innerText += 'You do not have any NFTs.';
    if (!tokensCount) document.getElementById('tokenlist').innerText += 'You do not have any Tokens.';
}
sendCache = loc => {
    const contract = constructors.find(c => c.origin === loc);
    if (contract?.deps?.Token) {
        const sending = jigs.filter(jig => jig instanceof contract);
        let send = [];
        sending.forEach(jig => { send.push(jig.location) });
        localStorage.setItem('sending', JSON.stringify(send));
    }
}
networkSync = async() => {
    const bal = await run.purse.balance();
    bal.utxos.forEach(u => addUTXO(u));
    const res = await exchrate();
    localStorage.setItem('rate', res.rate);
    sync(bal.balance);
}
const balance = async() => {
    const bal = await run.purse.balance();
    const res = await exchrate();
    localStorage.setItem('rate', res.rate);
    sync(bal.balance);
    if (bal.utxos.length) {
        clearUTXOs(bal.utxos);
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
        balElem.innerText = `$${localStorage.getItem('usdBalance')}`;
        unit = 'USD';
    }
    else {
        balElem.innerText = `${localStorage.getItem('purseSats')} BSV`;
        unit = 'BSV';
    }
}
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
    }
}
else {
    document.getElementById('loading').style.display = 'inline-block';
    if (localStorage.getItem('hasBackedUp') === 'false') {alert('Please backup your wallet!')}
    initRun();
    initWallet();
}
const addToList = (contract, loc, balance, def) => {
    const contractId = def ? def.origin : contract.origin;
    const exists = document.getElementById(`${contractId}_${loc}element`);
    if (exists) { return }
    loc = balance > 0 ? loc : contract.location;
    let amt = contract.decimals > 0 ? balance / Math.pow(10, contract.decimals) : balance;
    const cardDiv = `<div class='card' id="${loc}" onclick="sendJig(this.id)">
        <div class='card_content'>
            <span class='card_icon'>${setImage(contract?.metadata, def, contract.origin)}</span>
            <span class='card_label'>${setName(contract, def, loc, network, def ? true : false)}</span>
            <span class='card_end'>${amt || ''}</span>
        </div>
    </div>`;
    def ? document.getElementById('nftlist').insertAdjacentHTML('afterbegin', cardDiv) : document.getElementById('tokenlist').insertAdjacentHTML('afterbegin', cardDiv);
}
const sendJig = id => {
    const loc = id;
    sendCache(loc);
    location.href = `./send.html?loc=${loc}`;
}