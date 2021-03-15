async pay(rawtx, parents) {
    console.log('pay:', rawtx);
    let tx = new bsv.Transaction(rawtx), utxos = [], outputs = [], otx = new bsv.Transaction(rawtx);
    let inSats, outSats;
    let utxo = {
        satoshis: 6928,
        script: "76a914f186a67f23c65490f5f703fd97b639396ea59c0288ac",
        txId: "c608657fb412c8faffae59f6e4ff9218452bfa3c77321ce4cfa9c19e8f48db95",
        vout: 3,
    }
    console.log(tx.inputs, parents)
    /* for (let i = 0; i < tx.inputs.length; i++) {
        utxos.push({
            txid: tx.inputs[i].prevTxId.toString('hex'),
            vout: tx.inputs[i].outputIndex,
            satoshis: 546,
            script: tx.inputs[i].script
        });
        inSats += parents[i].satoshis;
    } */
    utxos.push(utxo);
    tx.from(utxos);
    console.log('added purse utxo', tx.toString('hex'));
    tx.clearOutputs();
    console.log(tx.inputs[0].output, tx.inputs[1].output)
    for (let i = 0; i < otx.outputs.length; i++) {
        let output = new bsv.Transaction.Output({ satoshis: dustLimit, script: otx.outputs[i].script });
        i > 0 ? tx.addOutput(output) : tx.addOutput(otx.outputs[i]);
        tx.inputs[0].output = output;
    }
    tx._getInputAmount();
    console.log('After adding outputs', tx.toString('hex'), {tx})
    tx.change(this.address)
    //tx.addOutput(new bsv.Transaction.Output({ satoshis: 1000, script: bsv.Script.fromAddress(this.address) }))
    console.log('After adding change', tx.toString('hex'))
    tx.sign(this.privkey);
    console.log('After signing', tx.toString('hex'))
    //this.getUTXOs()
    /* const newTx = transaction.from(utxos)
    for (let i = 0; i < tx.outputs.length; i++) {
        i > 0 ? newTx.addOutput(new bsv.Transaction.Output({ satoshis: dustLimit, script: tx.outputs[i].script })) : newTx.addOutput(tx.outputs[i]);
    }
    newTx.change(this.address); */
    //console.log(newTx._getInputAmount());
    //console.log(newTx.inputs)

    /* let sigs = newTx.getSignatures(this.privkey);
    console.log(this.privkey)
    console.log({sigs}, sigs[0].prevTxId.toString('hex'), sigs[0].signature.toString('hex'))
    console.log(`newTx.outputAmount ${newTx.outputAmount}`, 'Fee: ', newTx.inputAmount - newTx.outputAmount)
    newTx.sign(this.privkey);
    //newTx.applySignature(sigs[0]);
    console.log(newTx, newTx.toString('hex'));
    return newTx.toString('hex'); */
    return tx.toString('hex');
}
async broadcast(rawtx) {
    console.log(`broadcast: `, rawtx)
}