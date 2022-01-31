const LocalPurse = Run.plugins.LocalPurse;
const P2PKH_SIGSCRIPT_SIZE = 1 + 73 + 1 + 33
const P2PKH_OUTPUT_SIZE = 8 + 1 + 1 + 1 + 1 + 20 + 1 + 1
const P2PKH_INPUT_SIZE = 36 + 1 + P2PKH_SIGSCRIPT_SIZE + 4
var blockchain;
switch(bc) {
    case 'run': blockchain = new Run.plugins.RunConnect({ network }); break;
    case 'whatsonchain': blockchain = new Run.plugins.WhatsOnChain({ network }); break;
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
    async broadcastTx(utxos, address, amount, change, exportRawTx, sendMax) {
        const tx = transaction.from(utxos);
        let feeReq;
        if (sendMax) {
            const feeFactor = (feePerKb / 1000);
            const txsize = tx._estimateSize() * feeFactor;
            feeReq = txsize + (P2PKH_INPUT_SIZE * feeFactor * tx.inputs.length) + (P2PKH_OUTPUT_SIZE * feeFactor);
            tx._fee = parseInt(feeReq);
        }
        tx.to(address, sendMax ? amount - tx._fee : amount).change(change ? change : this.address).sign(this.privkey);
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
    async send(utxos, to, amount, max) {
        console.log(`Sending to: ${to}`);
        if (to.includes('@') || to.includes('$') || (to.includes('1'))) {
            let res = await fetch(`https://api.polynym.io/getAddress/${to}`);
            let { address } = await res.json();
            let r = await this.broadcastTx(utxos, address, amount, null, false, max);
            return r;
        }
        else {
            let r = await this.broadcastTx(utxos, to, amount, null, false, max);
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
                else if (satoshis === amount || between(amount, satoshis-100, satoshis+100)) { return cache }
            }
        }
        return [];
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
        tx.inputs.forEach(input => { // fee estimation
            if (!input.script.toBuffer().length) {
              input.setScript(bsv.deps.Buffer.alloc(950))
            }
        })
        tx._getInputAmount();
        tx.change(this.address).sign(this.privkey);
        const spnt = spent(tx);
        const currUTXOs = extractUTXOs(tx.toString(), this.address);
        spnt.forEach(utxo => deleteUTXO(`${utxo.txid}_${utxo.vout}`));
        currUTXOs.forEach(utxo => addUTXO(utxo));
        return tx.toString();
    }
    async broadcastRawTx(rawtx) {
        let tx = new bsv.Transaction(rawtx);
        let txid = await this.blockchain.broadcast(rawtx);
        if (txid) {
            let sp = spent(tx);
            let u = extractUTXOs(rawtx, this.address);
            console.log('Deleting UTXOs....', sp);
            sp.forEach(utxo => { deleteUTXO(`${utxo.txid}_${utxo.vout}`) })
            u.forEach(utxo => addUTXO(utxo))
        }
        return txid;
    }
}