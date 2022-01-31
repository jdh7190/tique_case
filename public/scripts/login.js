const login = (message, sender) => {
    try {
      const permissions = message?.permissions;
      if (!permissions?.length) throw `No permissions specified.`;
      if (message?.challenge) {
        const pk = bsv.PrivateKey.fromWIF(localStorage.ownerKey);
        const sig = bsvMessage.sign(message.challenge, pk);
        const loginObj = { origin: sender, permissions }
        let logins = JSON.parse(localStorage?.logins || '[]');
        const loginExists = logins.findIndex(login => login.origin === sender);
        if (loginExists > -1) {
          logins[loginExists] = loginObj;
        } else { logins.push(loginObj) }
        localStorage.setItem('logins', JSON.stringify(logins));
        return { signature: sig.toString(), address: bsv.Address.fromPrivateKey(pk).toString(), login: true }
      }
      else { return { error: 'Login declined.', login: false } }
    } catch(e) { return { error: e.toString(), login: false } }
}