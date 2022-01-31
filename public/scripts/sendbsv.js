document.getElementById('tokenBalance').innerText = localStorage.getItem('purseSats');
initRun();
const sendBSV = async() => {
    amt = parseInt(parseFloat(document.getElementById('sendamt').value) * 100000000);
    pubkey = document.getElementById('sendaddr').value;
    if (!amt) { alert('Please specify an Amount to Send.'); return }
    const validAddr = bsv.Address.isValid(pubkey);
    if (!pubkey || (!pubkey.includes('@') && !pubkey.includes('$') && !validAddr)) { alert('Please specify a Paymail or Address.'); return }
    try {
        const utxos = await run.purse.getUTXOs(amt);
        const sent = await run.purse.send(utxos, pubkey, amt, amt === parseInt(localStorage.purseSats*100000000));
        if (sent) {
            document.getElementById('jigscon').style.display = 'none';
            document.getElementById('confirm').style.display = 'block';
            document.getElementById('confirmation').href = `${bsvtxExplorer}${sent.txid}`;
            let u = extractUTXOs(sent.rawtx, run.purse.address);
            sent.utxos.forEach(utxo => { deleteUTXO(`${utxo.txid}_${utxo.vout}`) })
            u.forEach(utxo => addUTXO(utxo))
        }
    }
    catch (e) { alert(e) }
}
document.getElementById('sendbsv').addEventListener('click', sendBSV);