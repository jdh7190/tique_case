const runBase = async(location, cancel, fees) => {
    const lockedTokens = await run.load(location);
    const tx = new Run.Transaction();
    if (!cancel) {
        const base = bsv.Transaction();
        base.to(lockedTokens.owner.address, lockedTokens.owner.satoshis);
        const royalties = lockedTokens.constructor.metadata.royalties;
        if (royalties?.length) { royalties?.forEach(r => { base.to(r.address, parseInt(lockedTokens.owner.satoshis * r.royalty)) }) }
        if (FEE_ADDRESS && fees) {
            base.to(FEE_ADDRESS, parseInt(fees*100000000))
        } 
        tx.base = base.toString('hex');
    }
    tx.update(() => {
        lockedTokens.send(run.owner.address, lockedTokens.amount);
    });
    const raw = await tx.export({ sign: false, pay: cancel ? false : true });
    tx.rollback();
    return raw;
}
const getCancelUtxo = (rawtx, idx) => {
    const bsvtx = new bsv.Transaction(rawtx);
    const address = bsv.Address.fromScript(bsvtx.outputs[idx].script).toString();
    let utxo = new bsv.Transaction.UnspentOutput({
        "address": address,
        "txid": bsvtx.hash,
        "vout": idx,
        "satoshis": bsvtx.outputs[idx].satoshis,
        "scriptPubKey": bsvtx.outputs[idx].script.toHex(),
        "outputIndex": idx
    });
    return utxo;
}
const getLockingScript = (rawtx, idx) => {
    return bsv.Transaction(rawtx).outputs[idx];
}
const unlockToken = (tx, inputIndex, lockingScript, satoshis, cancel) => {
    const template = '$preimage $trailingPrevouts $isCancel';
    const preimageSigHashType = (cancel ? bsv.crypto.Signature.SIGHASH_NONE : (bsv.crypto.Signature.SIGHASH_SINGLE | bsv.crypto.Signature.SIGHASH_ANYONECANPAY)) | bsv.crypto.Signature.SIGHASH_FORKID;
    const scriptCode = bsv.Script.fromHex(lockingScript);
    const value = new bsv.crypto.BN(satoshis);
    const preimg = bsv.Transaction.sighash.sighashPreimage(tx, preimageSigHashType, inputIndex, scriptCode, value).toString('hex');
    const asm = template
        .replace('$preimage', preimg)
        .replace('$trailingPrevouts', '0')
        .replace('$isCancel', cancel ? 'OP_TRUE' : 'OP_FALSE');
    return bsv.Script.fromASM(asm).toHex();
}
const buyOrder = async(location, raw, cancel, cancelIdx, fees) => {
    var feePerKb = 1000;
    bsv.Transaction.FEE_PER_KB = feePerKb;
    run.trust('*')
    const txid = location.slice(0,64);
    const idx = parseInt(location.slice(-1));
    const rawtx = !raw ? await run.blockchain.fetch(txid) : raw;
    const lockingScript = getLockingScript(rawtx, idx);
    const rawRunTx = await runBase(location, cancel, fees);
    const runTx = bsv.Transaction(rawRunTx);
    runTx.inputs[0].output = runTx.outputs[1];
    if (cancel) {
        runTx.from(getCancelUtxo(rawtx, cancelIdx));
        console.log(runTx.toString())
        runTx.sign(run.purse.bsvPrivateKey);
    }
    const solution = unlockToken(runTx, 0, lockingScript.script.toHex(), lockingScript.satoshis, cancel);
    runTx.inputs[0].setScript(solution);
    return runTx.toString('hex');
}
const sell = async(tokenContract, satoshis, amount) => {
    run.trust('*')
    const contract = await run.load(tokenContract);
    await contract.sync();
    await run.inventory.sync();
    const tokens = run.inventory.jigs.filter(jig => jig instanceof contract);
    console.log({tokens});
    if (contract.decimals > 0) {
        amount *= Math.pow(10, contract.decimals);
    }
    const base = bsv.Transaction();
    base.to(run.purse.address, 546);
    const runtx = new Run.Transaction();
    runtx.base = base.toString('hex');
    const OrderLock = await run.load('d6170025a62248d8df6dc14e3806e68b8df3d804c800c7bfb23b0b4232862505_o1');
    const salesOrder = new OrderLock(run.purse.address, satoshis);
    runtx.update(() => {
        tokens[0].combine(...tokens.slice(1));
        tokens[0].send(salesOrder, amount);
    });
    const rawtx = await runtx.export();
    console.log(rawtx);
}