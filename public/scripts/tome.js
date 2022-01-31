document.getElementById('loadingkeep').style.display = 'inline-block';
initRun();
const contractLocation = tomeContract;
var royalties = [], isNFT;
const addToList = entry => {
    let img = `<img class="emoji" src="https://mornin.run/${contractLocation}/img.png"></img>`
    const cardDiv = `<div class='card' id="${entry.txid}" onclick=" ">
        <div class='card_content'>
            <span class='card_icon'>${img}</span>
            <span class='card_label first'>${entry.tokenName}</span>
            <span class='card_label second'>${entry?.price ? entry.price/100000000 : entry.satoshis}</span>
            <span class='card_end'>${entry.tokenName === 'BSV' ? entry.qty / 100000000 : entry?.qty}</span>
        </div>
    </div>`;
    document.getElementById('keeplist').insertAdjacentHTML('afterbegin', cardDiv);
    document.getElementById(`${entry.txid}`).onclick = async() => {
        document.getElementById('buyimg').src = `https://mornin.run/${contractLocation}/img.png`;
        document.getElementById('dModal').style.display = 'block';
        const sumRoyal = royalties?.reduce((a,b) => {return a + b.royalty}, 0) || 0;
        let fees = 0;
        const totalRoyalties = (Math.round(sumRoyal*entry.satoshis*100000000) / 100000000) || 0;
        const feeRateText = `${isNFT ? `Fees: ${fees = Math.round(NFT_FEE_RATE*entry.satoshis*100000000)/100000000}` 
            : `Fees: ${fees = Math.round(TOKEN_FEE_RATE*entry.satoshis*100000000)/100000000} BSV`}`;
        const royaltyText = `${sumRoyal > 0 ? `Royalties: ${totalRoyalties}` : ''}`;
        const total = Math.round((entry.satoshis+totalRoyalties+fees)*100000000) / 100000000;
        document.getElementById('msg').innerText = `${entry.qty} ${entry.tokenName}

${feeRateText}

${royaltyText}

Total ${total} BSV`;
        document.getElementById('buybtn').style.display = 'block';
        document.getElementById('buybtn').innerText = `Purchase ${total} BSV`;
        document.getElementById('buybtn').onclick = async() => {
            document.getElementById('purchload').style.display = 'inline-block';
            try {
                const rawtx = await buyOrder(entry.location, '', false, null, fees);
                console.log(`PURCHASE ORDER`, rawtx);
                const txid = await run.purse.broadcastRawTx(rawtx);
                if (txid) {
                    document.getElementById(entry.txid).remove();
                    document.getElementById('purchload').style.display = 'none';
                    document.getElementById('msg').innerHTML = `Purchased! <a href="https://whatsonchain.com/tx/${txid}" target="_blank">TXID</a>`;
                    document.getElementById('buybtn').style.display = 'none';
                    postTxToDB(txid, 'https://api.mornin.run', rawtx);
                    const t = { txid, hex: rawtx };
                    const h = await evalRUNTx(t);
                    if (h) addEntry(h);
                }
            } catch(e) {
                document.getElementById('msg').innerText = `${e}`;
                document.getElementById('buybtn').style.display = 'none';
                document.getElementById('purchload').style.display = 'none';
            }
        }
    }
}
const PROD_API_URL = `https://api.mornin.run`;
const init = async() => {
    const openOrders = await (await fetch(`${PROD_API_URL}/getOpenOrdersV2/${contractLocation}`)).json();
    console.log({openOrders})
    const contract = await run.load(contractLocation);
    console.log(contract.metadata)
    document.getElementById('tokendesc').innerText = contract?.metadata?.description || '';
    const symbol = contract.metadata.name || contract.symbol || contract.metadata.symbol;
    document.getElementById('tokenname').innerText = symbol;
    royalties = contract?.metadata?.royalties;
    isNFT = contract.deps.Token ? false : true;
    if (openOrders.length) {
        for (let i = openOrders.length - 1; i >= 0; i--) {
            const o = openOrders[i];
            const order = {
                action: 'BUY',
                qty: o?.amount || 1,
                satoshis: o?.satoshis / 100000000,
                tokenName: symbol,
                contract,
                location: o.location,
                time: o.postedTime,
                txid: o.txid,
                price: o.price
            }
            addToList(order);
        }
    } else {
        alert('No open orders found.');
    }
    document.getElementById('loadingkeep').style.display = 'none';
}
init();