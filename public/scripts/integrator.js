const checkLoginPermission = (origin, action) => {
    const logins = JSON.parse(localStorage.logins);
    if (!logins?.length) return false;
    const permit = logins.find(login => login.origin === origin && login.permissions.includes(action))
    return permit;
}
const getPermissions = origin => {
  const logins = JSON.parse(localStorage.logins);
  if (!logins?.length) return [];
  const permitted = logins.filter(login => login.origin === origin);
  return permitted[0].permissions;
}
const sign = (message, sender) => {
    try {
        const permitted = checkLoginPermission(sender, message.action);
        if (!permitted) throw `${message.action} permission not granted for ${sender}.`;
        if (message?.msg) {
            const pk = bsv.PrivateKey.fromWIF(localStorage.ownerKey);
            const sig = bsvMessage.sign(message.msg, pk);
            return { signature: sig.toString(), owner: bsv.Address.fromPrivateKey(pk).toString() }
        } else { return { error: 'Sign attempt failed.' } }
    } catch(e) { return { error: e.toString() } }
}
const getBalance = (message, sender) => {
    try {
        const permitted = checkLoginPermission(sender, message.action);
        if (!permitted) throw `${message.action} permission not granted for ${sender}.`;
        return {
            balance: parseInt(localStorage.purseSats*100000000), 
            address: bsv.Address.fromPrivateKey(bsv.PrivateKey.fromWIF(localStorage.purseKey)).toString()
        };
    } catch(e) { return { error: e.toString() } }
}
const buildTx = async(message, sender) => {
    try {
        const permitted = checkLoginPermission(sender, message.action);
        if (!permitted) throw `${message.action} permission not granted for ${sender}.`;
        const outputs = message?.outputs;
        let requiredSats = 0, rawtx;
        const purseSats = parseInt(localStorage.purseSats*100000000);
        const spendLimit = parseInt(localStorage.spendLimit) || 0;
        if (outputs?.length) {
            rawtx = new bsv.Transaction();
            outputs.forEach(o => {
                rawtx.to(o.address, o.satoshis)
            });
            requiredSats = rawtx.outputAmount;
        } else {
            rawtx = message?.rawtx;
            requiredSats = bsv.Transaction(rawtx).outputAmount;
        }
        if (!outputs && !message?.rawtx) { sendResponse({ error: 'Invalid parameters.' }) }
        if (spendLimit < requiredSats) throw `Requested amount of ${requiredSats} satoshis exceeds spending limit.`;
        if (purseSats < requiredSats) {  throw `Purse balance is insufficient to pay for ${requiredSats} satoshis.` }
        const run = initRun(false, null, null, true, true);
        const paytx = await run.purse.pay(rawtx.toString());
        const broadcast = message?.broadcast || false;
        if (broadcast) {
            await run.blockchain.broadcast(paytx);
        }
        return { rawtx: paytx, txid: bsv.Transaction(paytx).hash }
    } catch (e) { return { error: e.toString() } }
}
const sendTokens = async(message, sender) => {
    const tokenOutputs = message?.tokenOutputs;
    const base = message?.base;
    const broadcast = message?.broadcast || false;
    let amount;
    if (tokenOutputs?.length) {
      try {
        const permitted = checkLoginPermission(sender, message.action);
        if (!permitted) throw `${message.action} permission not granted for ${sender}.`;
        const spendLimit = parseInt(localStorage.spendLimit) || 0;
        const run = initRun("2", null, null, true, true);
        const jigs = await getJigs(run.owner.address);
        const tx = new Run.Transaction();
        if (base) {
          tx.base = base;
          const requiredSats = bsv.Transaction(base).outputAmount;
          if (spendLimit < requiredSats) throw `Requested amount of ${requiredSats} satoshis exceeds spending limit.`;
        }
        for (let to of tokenOutputs) {
          const contract = await run.load(to.contract);
          const tokens = jigs.filter(j => j instanceof contract);
          if (!tokens) { throw `No tokens found for ${to.contract}` }
          if (contract.deps.Token) {
            const balance = tokens.reduce(((t, e) => t + e.amount), 0);
            if (balance > 0) {
              if (contract.decimals > 0) { amount = parseFloat(to.amount) * Math.pow(10, contract.decimals) }
              else { amount = parseInt(to.amount) }
              if (tokens.length > 1) { tx.update(() => tokens[0].combine(...tokens.slice(1))) }
              tx.update(() => tokens[0].send(to.address, amount));    
            } else { return { error: `No balance for token ${contract?.metadata?.symbol || contract?.symbol || contract?.name}.` } }
          }
          else if (contract.deps.Jig) { throw 'Jig sends not supported.' }
          else { throw 'Invalid contract requested.' }
        }
        const runtx = await tx.export();
        const requiredSats = bsv.Transaction(runtx).outputAmount;
        if (localStorage.purseSats*100000000 < requiredSats) throw `Insufficient satoshis balance of ${localStorage.purseSats*100000000}. ${requiredSats} satoshis required to pay for the transaction.`;
        if (broadcast) { await run.blockchain.broadcast(runtx) }
        return { rawtx: runtx, txid: bsv.Transaction(runtx).hash };
      } catch(e) { return { error: e.toString() } }
    }
    else { return { error: 'Invalid parameters.' } }
}
const getTokens = async(message, sender) => {
    try {
      const permitted = checkLoginPermission(sender, message.action);
      if (!permitted) throw `${message.action} permission not granted for ${sender}.`;
      const run = initRun("2", null, null, true, true);
      const contract = await run.load(message?.contract);
      if (contract) {
        const jigs = await getJigs(run.owner.address);
        const tokens = jigs.filter(jig => jig instanceof contract);
        if (!tokens?.length) { return { exists: false } }
        if (contract?.deps?.Token) {
          const balance = tokens.reduce(((t, e) => t + e.amount), 0);
          return { balance };
        }
        else if (contract?.deps.Jig) { return { exists: true }}
        else { return { exists: false }}
      }
      else { throw 'No contract found.' }       
    } catch (e) { return { error: e.toString() } }
}
const pay = async(message, sender) => {
  const { rawtx, parents, action } = message;
  try {
    const permitted = checkLoginPermission(sender, action);
    if (!permitted) throw `${action} permission not granted for ${sender}.`;
    const requiredSats = bsv.Transaction(rawtx).outputAmount;
    const spendLimit = parseInt(localStorage.spendLimit) || 0;
    if (spendLimit < requiredSats) throw `Requested amount of ${requiredSats} satoshis exceeds spending limit.`;
    const run = initRun('2', null, null, true, true);
    return await run.purse.pay(rawtx, parents);
  } catch(e) {
    return {error: e.toString()}
  }
}
const ownerSign = (message, sender) => {
  const { rawtx, parents, locks, action } = message;
  let inputIdx, orderLockOutput;
  if (locks?.length) {
    try {
      const permitted = checkLoginPermission(sender, action);
      if (!permitted) throw `${action} permission not granted for ${sender}.`;
      const bsvtx = new bsv.Transaction(rawtx, {disableIsFullySigned: true});
      if (parents?.length) {
        parents.forEach((parent, idx) => {
          const script = bsv.Script(parent.script);
          bsvtx.inputs[idx].output = new bsv.Transaction.Output({satoshis: parent.satoshis, script});
          if (bsvtx.inputs[idx].output.script.toHex().includes('cdb285cc49e5ff3eed6536e7b426e8a528b05bf9276bd05431a671743e651ceb00')) {
            inputIdx = idx;
            orderLockOutput = bsvtx.inputs[idx].output;
            const solution = unlockToken(bsvtx, inputIdx, orderLockOutput.script.toHex(), orderLockOutput.satoshis, false);
            const solutionScript = bsv.Script.fromHex(solution);
            console.log(solutionScript.toHex().length, solutionScript.toHex())
            bsvtx.inputs[inputIdx].setScript(solutionScript.toHex());
          } else {
            const a = bsv.Address.fromScript(script).toString();
            if (a === run.owner.address) {
              const sigHashFlags = bsv.crypto.Signature.SIGHASH_ALL | bsv.crypto.Signature.SIGHASH_FORKID;
              const sig = bsv.Transaction.sighash.sign(bsvtx, run.owner.bsvPrivateKey, sigHashFlags,
                idx, script, new bsv.crypto.BN(parent.satoshis));
              bsvtx.inputs[idx].setScript(bsv.Script.buildPublicKeyHashIn(
                run.owner.bsvPublicKey,
                sig.toDER(),
                sigHashFlags
              ))
            }
          }
        })
      }
      return bsvtx.toString('hex');
    } catch(e) {
      return {error: e.toString()}
    }
  } else { return rawtx }
}