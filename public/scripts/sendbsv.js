var db;
const addToList = () => {
    let row = document.createElement('p');
    let emojiSpan = document.createElement('span');
    emojiSpan.className = "emoji";
    emojiSpan.innerHTML = `<img src="images/bsv-icon.svg" class="emoji">`
    row.appendChild(emojiSpan);
    let nameSpan = document.createElement('span');
    nameSpan.id = 'contractName';
    nameSpan.className = 'contractName';
    nameSpan.innerText = `Bitcoin SV`;
    row.appendChild(nameSpan);
    let bal = document.createElement('span');
    bal.className = "tokenBalance"
    bal.innerText = localStorage.getItem('purseSats');
    row.appendChild(bal)
    let tokensDiv = document.getElementById('tokens');
    tokensDiv.appendChild(row);
}
addToList();
initRun();
if (idb) {
    const request = indexedDB.open('purse', 1);
    request.onsuccess = e => { db = e.target.result }
    request.onerror = e => { console.log('error') }
}
const sendBSV = async() => {
    amt = parseInt(parseFloat(document.getElementById('sendamt').value) * 100000000);
    pubkey = document.getElementById('sendaddr').value;
    if (!amt) { alert('Please specify an Amount to Send.'); return }
    const validAddr = bsv.Address.isValid(pubkey);
    if (!pubkey || (!pubkey.includes('@') && !pubkey.includes('$') && !validAddr)) { alert('Please specify a Paymail or Address.'); return }
    try {
        run.purse.getUTXOs(amt, idb ? db : null, async(utxos) => {
            const sent = await run.purse.send(utxos, pubkey, amt);
            if (sent) {
                document.getElementById('jigscon').style.display = 'none';
                document.getElementById('confirm').style.display = 'block';
                document.getElementById('confirmation').href = `${bsvtxExplorer}${sent.txid}`;
                let u = checkRawTx(sent.rawtx, run.purse.address, sent.txid);
                if (db) {
                    const request = indexedDB.open('purse', 1);
                    request.onsuccess = e => {
                        let db = e.target.result;
                        console.log('success');
                        const tx = db.transaction('utxos', 'readwrite');
                        const table = tx.objectStore('utxos');
                        sent.utxos.forEach(utxo => { table.delete(utxo.output) })
                        if (u.length > 0) { addUTXOs(u, db) }
                    }
                    request.onerror = e => { console.log('error', e) }
                }
            }
        })
    }
    catch (e) { alert(e) }
}
document.getElementById('sendbsv').addEventListener('click', sendBSV);