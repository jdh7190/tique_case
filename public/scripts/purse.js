const LocalPurse = Run.plugins.LocalPurse;
var blockchain, udb;
switch(bc) {
    case 'run': blockchain = new Run.plugins.RunConnect({ network }); break;
    case 'whatsonchain': blockchain = new Run.plugins.WhatsOnChain({ network }); break;
    case 'mattercloud': blockchain = new Run.plugins.MatterCloud({ network, apiKey }); break;
    default: blockchain = new Run.plugins.RunConnect({ network });
}
const transaction = new bsv.Transaction();
transaction.feePerKb(feePerKb);
if (idb) {
    const request = indexedDB.open('purse', 1);
    request.onupgradeneeded = e => {
        console.log('upgrading...')
        const db = e.target.result;
        db.createObjectStore('utxos', { keyPath: 'output' });
        console.log(`upgrade is called for table: ${db.name}`, e);
    }
    request.onsuccess = e => { udb = e.target.result }
    request.onerror = e => { console.log('error') }
}
class acornsPurse extends LocalPurse {
    async balance(utxos) {
        blockchain = new Run.plugins.WhatsOnChain({ network });
        if (!utxos) { utxos = await this.blockchain.utxos(this.address) }
        const balance = (utxos).reduce(((t, e) => t + e.satoshis), 0)
        return {utxos, balance};
    }
    async broadcastTx(utxos, address, amount, change, exportRawTx) {
        const tx = transaction.from(utxos).to(address, amount).change(change ? change : this.address).sign(this.privkey);
        const rawtx = tx.toString();
        if (exportRawTx) { return rawtx }
        let txid;
        console.log({rawtx})
        try { 
            txid = await this.blockchain.broadcast(rawtx);
            return {txid, rawtx, utxos};
        }
        catch (e) {
            console.log(e);
            if (window) { alert(e) }
        }
    }
    async send(utxos, to, amount) {
        console.log(`Sending to: ${to}`);
        if (to.includes('@') || to.includes('$') || (to.includes('1'))) {
            let res = await fetch(`https://api.polynym.io/getAddress/${to}`);
            let { address } = await res.json();
            let r = await this.broadcastTx(utxos, address, amount);
            return r;
        }
        else {
            let r = await this.broadcastTx(utxos, to, amount);
            return r;
        }
    }
    async getUTXOs(amount, db, cb) {
        let cache = [], satoshis = 0;
        if (db) {
            const tx = db.transaction('utxos', 'readonly');
            const table = tx.objectStore('utxos');
            const request = table.openCursor();
            request.onsuccess = e => {
                const cursor = e.target.result;
                if (cursor) {
                    cache.push(cursor.value);
                    if (amount) {
                        satoshis = cache.reduce((a, curr) => { return a + curr.satoshis }, 0);
                        if (satoshis >= amount * feeThreshold) { return cb(cache) }
                        else { cursor.continue() }
                    }
                    else { cursor.continue() }
                }
                else { return cb(cache) }
            }
        }
        else {
            let utxos = await this.blockchain.utxos(this.address);
            for (let utxo of utxos) {
                cache.push(utxo);
                if (amount) {
                    satoshis = cache.reduce((a, curr) => { return a + curr.satoshis }, 0);
                    if (satoshis >= amount * feeThreshold) { return cb(cache) }
                }
            }
        }
    }
    async pay(rawtx, parents) {
        const cachedUtxos = (amt) => {
            return new Promise((resolve, reject) => {
                this.getUTXOs(amt, udb, (utxos) => {
                    utxos.length ? resolve(utxos) : reject([]);
                })
            })
        }
        let tx = new bsv.Transaction(rawtx);
        let utxos = await cachedUtxos(tx._getOutputAmount());
        tx.from(utxos);
        if (parents?.length) {
            parents.forEach((parent, idx) => {
                tx.inputs[idx].output = new bsv.Transaction.Output({
                    satoshis: parent.satoshis,
                    script: new bsv.Script(parent.script)
                })
            })
        }
        tx._getInputAmount();
        tx.change(this.address).sign(this.privkey);
        return tx.toString('hex');
    }
    async broadcast(rawtx) {
        try {
            let tx = new bsv.Transaction(rawtx);
            let sp = spent(tx, this.address);
            let u = checkRawTx(rawtx, this.address, tx.hash);
            if (udb) {
                const request = indexedDB.open('purse', 1);
                request.onsuccess = e => {
                    let db = e.target.result;
                    console.log('success');
                    const tx = db.transaction('utxos', 'readwrite');
                    const table = tx.objectStore('utxos');
                    console.log('Deleting UTXOs....', sp);
                    sp.forEach(utxo => { table.delete(utxo.output) })
                    if (u.length > 0) { addUTXOs(u, db) }
                }
                request.onerror = e => { console.log('error', e) }
            }
        }
        catch(e) { console.log(e) }
    }
}