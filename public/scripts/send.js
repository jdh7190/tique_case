const urlParams = new URLSearchParams(location.search);
var enforceAmt = true, tokens = [];
initRun();
run.trust(urlParams.get('loc').slice(0,64));
trustContracts(run);
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
    document.getElementById('img').innerHTML = setImage(contract?.metadata, def, contract.origin);
    document.getElementById('contractName').innerText = setName(contract, def, loc, network, def ? true : false);
    if (balance) {
        document.getElementById('tokenamt').style.display = 'block';
        if (contract.decimals > 0) {
            balance = balance / Math.pow(10, contract.decimals);
        }
        document.getElementById('tokenBalance').innerText = balance;
    }
    else { enforceAmt = false }
}
const sendTokens = async() => {
    let amt = document.getElementById('sendamt').value, pubkey = document.getElementById('sendaddr').value, pmail = false;
    if (enforceAmt) { if (!amt) { alert('Please specify an Amount to Send.'); return } }
    const validAddr = bsv.Address.isValid(pubkey);
    if ((pubkey.includes('@') || (pubkey.includes('1') && !validAddr) && enableRelayXPaymail)) {
        let address = await getAddress(validateHandle(pubkey));
        pubkey = address?.length > 0 ? address : '';
        pmail = true;
    }
    else {
        if (!validAddr) { alert('Please specify a valid Address or alias.'); return }
    }
    if (!pubkey) { alert('Please specify a valid Address or alias.'); return }
    let contract = await run.load(urlParams.get('loc'));
    //await contract.sync();
    if (contract?.interactive === undefined && !contract?.deps?.Token) { contract = contract.constructor }
    /* if (contract?.interactive !== false && pmail) {
        alert('Cannot send Interactive Tokens/Jigs to paymail!');
        return;
    } */
    if (contract?.deps?.Token) {
        try {
            const tx = new Run.Transaction();
            if (contract.decimals > 0) { amt = parseFloat(amt) * Math.pow(10, contract.decimals) }
            else { amt = parseInt(amt) }
            if (amt) {
                if (tokens.length > 1) { tx.update(() => tokens[0].combine(...tokens.slice(1))) }
                tx.update(() => tokens[0].send(pubkey, amt));
                const hex = await tx.export();
                const txid = await run.blockchain.broadcast(hex);
                const t = { txid, hex };
                const h = await evalRUNTx(t);
                if (h) addEntry(h);
                if (txid) {
                    document.getElementById('jigscon').style.display = 'none';
                    document.getElementById('confirm').style.display = 'block';
                    document.getElementById('confirmation').href = `https://run.network/explorer/?query=${txid}&network=${network}`;
                }
            }
            else { throw 'Amount is incorrect.' }
        }
        catch (e) {
            if (e.length === 0) {
                alert('Please confirm you have enough funds in the purse to pay for the transaction.')
            } else { alert(e) }
        }
    }
    else {
        if (pmail && !contract.deps.RelayNFT) {
            alert('Cannot send Jigs (NFTs) to paymails. Please enter BSV address.');
            return;
        }
        try {
            let jig = await run.load(urlParams.get('loc'));
            jig.send(pubkey);
            await jig.sync();
            const txid = jig.location.substr(0,64);
            const hex = await run.blockchain.fetch(txid);
            const t = { txid, hex };
            const h = await evalRUNTx(t);
            if (h) addEntry(h);
            if (jig.owner === pubkey) {
                document.getElementById('jigscon').style.display = 'none';
                document.getElementById('confirm').style.display = 'block';
                document.getElementById('confirmation').href = `https://run.network/explorer/?query=${txid}&network=${network}`;
            }
        }
        catch (e) {
            if (e.length === 0) {
                alert('Please confirm you have enough funds in the purse to pay for the transaction.')
            } else { alert(e) }
        }
    }
}
loadToken(urlParams.get('loc'));
document.getElementById('sendjig').addEventListener('click', sendTokens);
/* document.getElementById('burnjig').addEventListener('click', async() => {
    let ftConfirm = false;
    if (enforceAmt) {
        ftConfirm = confirm(`Before continuing, please acknowledge that the entire token balance will be burnt.`);
        if (!ftConfirm) { return }
    }
    const confirmBurn = confirm(`Are you sure you want to burn this token?`);
    if (confirmBurn) {
        const trueConfirm = confirm(`This action is irreversible and the token(s) will be lost forever.
        
A service fee of 1,000 satoshis is required. Are you sure you want to continue?`);
        if (trueConfirm) {
            if (enforceAmt) {
                const b = await destroyJig(urlParams.get('loc'), tokens);
                console.log(b)
            } else {
                const b = await destroyJig(urlParams.get('loc'));
                console.log(b)
            }
        }
    }
}) */