const LocalPurse = Run.plugins.LocalPurse;
var blockchain;
switch(bc) {
    case 'run': blockchain = new Run.plugins.RunConnect({ network }); break;
    case 'whatsonchain': blockchain = new Run.plugins.WhatsOnChain({ network }); break;
    case 'mattercloud': blockchain = new Run.plugins.MatterCloud({ network, apiKey }); break;
    default: blockchain = new Run.plugins.RunConnect({ network });
}
const transaction = new bsv.Transaction();
transaction.feePerKb(feePerKb);
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
    async getUTXOs(amount) {
        let utxos = await getCachedUTXOs();
        if (!utxos.length) { utxos = await this.blockchain.utxos(this.address) }
        let cache = [], satoshis = 0;
        for (let utxo of utxos) {
            cache.push(utxo);
            if (amount) {
                satoshis = cache.reduce((a, curr) => { return a + curr.satoshis }, 0);
                if (satoshis >= amount * feeThreshold) { return cache }
            }
        }
    }
    async pay(rawtx, parents) {
        let tx = new bsv.Transaction(rawtx);
        let utxos = await this.getUTXOs(tx._getOutputAmount());
        if (utxos) {
            tx.from(utxos);
        }
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
    async broadcastRawTx(rawtx) {
        try {
            let tx = new bsv.Transaction(rawtx);
            let txid = await this.blockchain.broadcast(rawtx);
            if (txid) {
                let sp = spent(tx, this.address);
                let u = extractUTXOs(rawtx, this.address);
                console.log('Deleting UTXOs....', sp);
                sp.forEach(utxo => { deleteUTXO(`${utxo.txid}_${utxo.vout}`) })
                u.forEach(utxo => addUTXO(utxo))
            }
            return txid;
        }
        catch(e) { console.log(e) }
    }
}