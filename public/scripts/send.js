const urlParams = new URLSearchParams(location.search);
var enforceAmt = true, tokens = [];
initRun();
run.trust(urlParams.get('loc').substr(0,64));
const loadToken = async(loc) => {
    let balance = 0;
    let contract = await run.load(loc);
    if (contract?.deps?.Token) {
        const sending = JSON.parse(localStorage.getItem('sending'));
        for (let loc of sending) {
            let jig = await run.load(loc);
            tokens.push(jig);
        }
        if (tokens.length) {
            tokens.forEach(coin => { balance += coin.amount });
            addToList(contract, loc, balance);
            if (contract.decimals > 0) {
                document.getElementById('sendamt').step = 1 / Math.pow(10, contract.decimals > 6 ? contract.decimals - 2 : contract.decimals);
                document.getElementById('sendamt').value = 1 / Math.pow(10, contract.decimals > 6 ? contract.decimals - 2 : contract.decimals);
            }
        }
    }
    else {
        let j = await run.load(loc), contract = j.constructor;
        addToList(j, loc, 0, contract);
    }
}
const addToList = (contract, loc, balance, def) => {
    let row = document.createElement('p');
    let emojiSpan = document.createElement('span');
    emojiSpan.className = "emoji";
    emojiSpan = setImage(emojiSpan, contract?.metadata, def);
    row.appendChild(emojiSpan);
    let nameSpan = document.createElement('span');
    nameSpan.id = 'contractName';
    nameSpan.className = 'contractName';
    nameSpan = setName(nameSpan, contract, def, loc, network);
    row.appendChild(nameSpan);
    if (balance) {
        document.getElementById('tokenamt').style.display = 'block';
        let bal = document.createElement('span');
        bal.className = "tokenBalance";
        if (contract.decimals > 0) {
            balance = balance / Math.pow(10, contract.decimals);
        }
        bal.innerText = balance;
        row.appendChild(bal);
    }
    else { enforceAmt = false }
    let tokensDiv = document.getElementById('tokens');
    tokensDiv.appendChild(row);
}
const sendTokens = async() => {
    let amt = document.getElementById('sendamt').value, pubkey = document.getElementById('sendaddr').value;
    if (enforceAmt) { if (!amt) { alert('Please specify an Amount to Send.'); return } }
    const validAddr = bsv.Address.isValid(pubkey);
    if ((pubkey.includes('@') || (pubkey.includes('1') && !validAddr) && enableRelayXPaymail)) {
        let address = await getAddress(validateHandle(pubkey));
        pubkey = address?.length > 0 ? address : '';
    }
    else {
        if (!validAddr) { alert('Please specify a valid Address or alias.'); return }
    }
    if (!pubkey) { alert('Please specify a valid Address or alias.'); return }
    let contract = await run.load(urlParams.get('loc'));
    if (contract?.deps?.Token) {
        try {
            const tx = new Run.Transaction();
            if (contract.decimals > 0) { amt = parseFloat(amt) * Math.pow(10, contract.decimals) }
            else { amt = parseInt(amt) }
            if (amt) {
                if (tokens.length > 1) { tx.update(() => tokens[0].combine(...tokens.slice(1))) }
                tx.update(() => tokens[0].send(pubkey, amt));
                await tx.publish();
                if (tx) {
                    document.getElementById('jigscon').style.display = 'none';
                    document.getElementById('confirm').style.display = 'block';
                    document.getElementById('confirmation').href = `https://run.network/explorer/?query=${tokens[0].location.substr(0,64)}&network=${network}`;
                }
            }
            else { throw 'Amount is incorrect.' }
        }
        catch (e) { console.log(e); alert(e) }
    }
    else {
        try {
            let jig = await run.load(urlParams.get('loc'));
            jig.send(pubkey);
            await jig.sync();
            if (jig.owner === pubkey) {
                document.getElementById('jigscon').style.display = 'none';
                document.getElementById('confirm').style.display = 'block';
                document.getElementById('confirmation').href = `https://run.network/explorer/?query=${jig.location.substr(0,64)}&network=${network}`;
            }
        }
        catch (e) { alert(e) }
    }
}
loadToken(urlParams.get('loc'));
document.getElementById('sendjig').addEventListener('click', sendTokens);