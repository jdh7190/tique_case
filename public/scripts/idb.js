const initTiqueCaseDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onupgradeneeded = e => {
            const db = e.target.result;
            console.log({e}, e.oldVersion)
            switch(e.oldVersion) {
                case 0:
                    let d = indexedDB.deleteDatabase('purse');
                    d.onsuccess = e => { console.log('purse DB deleted.', e) }
                    db.createObjectStore('utxos', { keyPath: 'output' });
                    console.log(`upgrade is called for table: ${db.name}`, e);
                    db.createObjectStore('history', { keyPath: 'txid' });
                    console.log(`upgrade is called for table: ${db.name}`, e);
                    db.createObjectStore('ownerUTXOs', { keyPath: 'output' });
                    console.log(`upgrade is called for table: ${db.name}`, e);
                    break;
                case 1:
                    clearHistory();
                    const tx = e.target.transaction;
                    const historyObjectStore = tx.objectStore('history');
                    historyObjectStore.createIndex('time_idx', 'time');
                    console.log(`${db.name} table upgraded.`, e);
                    db.createObjectStore('permissions', { keyPath: 'url'});
                    console.log(`${db.name} table created.`, e);
                    db.createObjectStore('contractImages', { keyPath: 'origin'} )
                    console.log(`${db.name} table created.`, e);
                    break;
                default:
                    break;
            }
            console.log(`upgrading to version ${e.newVersion}`);
        }
        request.onsuccess = e => { resolve(e.target.result) }
        request.onerror = e => {
            console.log('error', e);
            reject(e);
        }
    })
}
//initTiqueCaseDB();
const addUTXO = utxo => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = e => {
            console.log('adding utxo...');
            let db = e.target.result;
            const tx = db.transaction('utxos', 'readwrite');
            const table = tx.objectStore('utxos');
            utxo.output = `${utxo.txid}_${utxo.vout}`;
            table.add(utxo);
        }
        request.onerror = e => { console.log('error', e) }
    }
}
const cachedUtxos = cb => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = e => {
            db = e.target.result;
            const tx = db.transaction('utxos', 'readonly');
            const table = tx.objectStore('utxos');
            const utxos = table.getAll();
            utxos.onsuccess = e => {
                const utxos = e.target.result;
                return cb(utxos);
            }
        }
        request.onerror = e => { console.log('error', e) }
    } else { cb([]) }
}
const getCachedUTXOs = () => {
    return new Promise((resolve, reject) => { cachedUtxos(utxos => { utxos.length ? resolve(utxos) : resolve([]) }) })
}
const removeUtxo = (output, cb) => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = e => {
            db = e.target.result;
            const tx = db.transaction('utxos', 'readwrite');
            const table = tx.objectStore('utxos');
            const utxos = table.delete(output);
            utxos.onsuccess = e => {
                const utxo = e;
                return cb(utxo);
            }
        }
        request.onerror = e => { console.log('error', e) }
    }
}
const deleteUTXO = output => {
    return new Promise((resolve, reject) => { removeUtxo(output, utxo => { utxo ? resolve(utxo) : resolve({}) }) })
}
const clearUTXOs = utxos => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = e => {
            let db = e.target.result;
            console.log('success');
            const tx = db.transaction('utxos', 'readwrite');
            const store = tx.objectStore('utxos');
            const reqDelete = store.clear();
            reqDelete.onsuccess = e => {
                console.log("UTXO cache cleared.", e);
                utxos?.forEach(u => addUTXO(u))
            }
        }
        request.onerror = e => { console.log('error', e) }
    }
}
const clearHistory = () => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = e => {
            let db = e.target.result;
            console.log('success');
            const tx = db.transaction('history', 'readwrite');
            const store = tx.objectStore('history');
            const reqDelete = store.clear();
            reqDelete.onsuccess = e => {
                console.log("History cache cleared.", e);
            }
        }
        request.onerror = e => { console.log('error', e) }
    }
}
const addImage = image => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = e => {
            let db = e.target.result;
            const tx = db.transaction('contractImages', 'readwrite');
            const table = tx.objectStore('contractImages');
            try {
                table.add(image);
            } catch(e) {
                console.log(e, {image});
            }
        }
        request.onerror = e => { console.log('error', e) }
    }
}
const getImage = (origin, cb) => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = e => {
            db = e.target.result;
            const tx = db.transaction('contractImages', 'readonly');
            const table = tx.objectStore('contractImages');
            const img = table.get(origin);
            img.onsuccess = e => {
                const img = e.target.result;
                return cb(img);
            }
        }
        request.onerror = e => { console.log('error', e) }
    } else { cb({}) }
}
const getContractImage = origin => {
    return new Promise((resolve, reject) => { getImage(origin, img => { img ? resolve(img) : resolve({}) }) })
}
const cachedImages = cb => {
    if (idb) {
        const request = indexedDB.open('tiquecase', dbVersion);
        request.onsuccess = e => {
            db = e.target.result;
            const tx = db.transaction('contractImages', 'readonly');
            const table = tx.objectStore('contractImages');
            const images = table.getAll();
            images.onsuccess = e => {
                const images = e.target.result;
                return cb(images);
            }
        }
        request.onerror = e => { console.log('error', e) }
    } else { cb([]) }
}
const getCachedImages = () => {
    return new Promise((resolve, reject) => { cachedUtxos(images => { images.length ? resolve(images) : resolve([]) }) })
}
const clearRunCache = () => {
    if (idb) {
        const request = indexedDB.open('run-browser-cache', 1);
        request.onsuccess = e => {
            let db = e.target.result;
            console.log('success');
            const tx = db.transaction('run-objects', 'readwrite');
            const store = tx.objectStore('run-objects');
            const reqDelete = store.clear();
            reqDelete.onsuccess = e => {
                console.log("Run Browser Cache cleared.", e);
            }
        }
        request.onerror = e => { console.log('error') }
    }
}
const outputScript = addr => {
    const address = bsv.Address.fromString(addr);
    const script = bsv.Script(address)
    const outScr = script.toASM().split(' ')[2];
    return outScr;
}
const exchrate = async() => {
    const res = await fetch(`https://api.whatsonchain.com/v1/bsv/main/exchangerate`);
    const jres = await res.json();
    return jres;
}