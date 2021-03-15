const urlParams = new URLSearchParams(location.search);
var enforceAmt = true, tokens = [], contract, addresses = [];
initRun(true);
const loadToken = async(loc) => {
    let balance = 0;
    contract = await run.load(loc);
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
                document.getElementById('sendamt').step = 1 / Math.pow(10, contract.decimals);
                document.getElementById('sendamt').value = 1 / Math.pow(10, contract.decimals);
            }
        }
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
    let tokensDiv = document.getElementById('tokens');
    tokensDiv.appendChild(row);
}
getHandles = async(url) => {
    let res = await fetch('/handles', {
        method: 'post',
        body: JSON.stringify({url}),
        headers: {'Content-type': 'application/json'}
    });
    let jres = await res.json();
    return jres;
}
const dripDrop = async() => {
    let amt = document.getElementById('sendamt').value;
    let sendlink = document.getElementById('sendlink').value;
    if (enforceAmt) { if (!amt) { alert('Please specify an Amount to Send.'); return } }
    if (!sendlink) { alert('Please specify a Twetch or Tweet link.'); return }
    let paymails = await getHandles(sendlink);
    console.log({paymails})
    const proceed = confirm(`Send ${amt} tokens each to ${paymails.length} friends?`); //(Total ${parseInt(paymails.length * amt)})
    if (contract?.deps?.Token && proceed) {
        try {
            const tx = new Run.Transaction();
            contract.decimals > 0 ? amt = parseFloat(amt) * Math.pow(10, contract.decimals) : amt = parseInt(amt);
            if (amt) {
                for (let paymail of paymails) { //for (let i = 0; i < 10; i++) { //
                    try {
                        const addr = await getAddress(paymail);
                        addr !== undefined && addr !== '' ? addresses.push(addr) : '';
                        console.log(addr)
                    }
                    catch (e) { console.log(e) }
                }
                addresses = addresses.filter(a => a !== "");
                localStorage.setItem('addrs', JSON.stringify(addresses));
                for (let addr of addresses) {
                    if (tokens.length > 1) { tx.update(() => tokens[0].combine(...tokens.slice(1))) }
                    tx.update(() => tokens[0].send(addr, amt));
                }
                const rawtx = await tx.export();
                console.log(rawtx)
                await tx.publish();
                //if (tx.Hr.Bn.uh[0].location) { console.log(tx) }
            }
            else { throw 'Amount is incorrect.' }
        }
        catch (e) { alert(e) }
    }
}
loadToken(urlParams.get('loc'));
document.getElementById('sendjig').addEventListener('click', dripDrop);