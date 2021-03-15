# Tique Case Wallet

## Introduction

The Tique Case is an open-source Bitcoin SV web wallet to send and receive Jigs using the Run on Bitcoin protocol.

Tique Case is a 100% client-side wallet that requires no back-end, relying only on external APIs such as Run Connect or MatterCloud to interact with the blockchain.

Private keys and the wallet's seed phrase are stored in the browser (localStorage) and never exposed externally.

The intention of this wallet is to provide an open-sourced wallet that allows basic management of Jigs and Fungible tokens with the primary purposes of bootstraping development on the Run protocol, as well as giving services the ability to leverage Run tokens in their applications.

## Clone via GitHub

To install, clone via:

```
git clone https://github.com/jdh7190/obento.git
```

## Getting Started

Once cloned, to run the wallet locally execute the following commands:

```
npm install
```

```
npm start
```

The wallet will be available at http://localhost:7007 by default.

Alternatively, one can open the index.html file locally to start using the wallet.

## Configuration

In scripts/config.js the following configuration settings are available:

| Option | Description | Default | Notes |
| ----------- | ----------- | ----------- | ----------- |
| Dust limit  | Minimum output amount | 546 | As low as 135 may be accepted by the network as of Feb. 2021 |
| Network | Network to transact on | main   | 'main' or 'test' |
| ownerPath | Derivation path for owner private key | m/0/0 | Any valid derivation path |
| pursePath | Derivation path for purse private key | m/0/1 | Any valid derivation path |
| feePerKb | Satoshis per kilobyte to pay for transactions | 500 | Lower than 500 may not be accepted by the network |
| app | See [here](https://run.network/docs/#api-reference-run-app) for details. | Tique Case | String of application name |
| splits | Number of UTXOs to split purse outputs into | 1 | Integer value, ex. 10 |
| api | Blockchain API to fetch Run transaction from | run | 'run', 'mattercloud' or 'whatsonchain' |
| bc | Blockchain API for the purse wallet | 'mattercloud' | 'run', 'mattercloud' or 'whatsonchain'  |
| timeout | Timeout for all Run action in ms | 10000 | 60000 |
| feeThreshold | Threshold of satoshi amount to fetch UTXOs when paying for transactions | 1.1 | Ex. If tx cost is 5000, get enough UTXOs to pay for 5500 satoshis |
| enableRelayXPaymail | Whether to enable sending Jigs to RelayX | false | send.html will support @relayx.io paymails |
| bsvTxExplorer | Blockchain explorer for Send BSV | https://whatsonchain/tx/ | Include the /tx or /t depending on url  |
| rundbhost | URL for rundb | blank | https://localhost:6000 |

## Backup / restore

Upon first use, please backup your 12 word seed phrase. 

If you do not back up the wallet, an alert will display each time you visit a new page prompting you to backup your seed phrase.

## Jigs

To receive jigs, click the flip icon at the bottom left of the card to display your Owner address.

This address is linked to your owner key at the ownerPath derivation above.

Upon receipt of Jigs, they will display in the Jigs section. If an emoji is defined on the Jig's metadata (```metadata.emoji```), then it will display in the left-most column.

If a [BitcoinFiles](https://www.bitcoinfiles.org/) transaction hash is associated, that will display with priority over the emoji instead.

The name of the Jig will display in the middle column. If a name is defined on the Jig's metadata (```metadata.name```) or (```.name```) then that value will display.

If neither value is set, then the class name of the Jig will be displayed.

If a Jig extends from the Token class, then a value accounting for its decimals setting will display in the right-most column.

## Jigs Schema

When defining your Jigs, please adhere to the [Standard Metadata](https://run.network/docs/#advanced-usage-standard-metadata) proposed in the Run documentation.

The wallet leverages these fields to display information to the user.

To display properly in the wallet and support sending to others, the contract classes should define the following at a minimum:

Fungible Token Example:
```javascript
class FungibleToken extends Token {}
FungibleToken.metadata = {
    name: 'DragonCoin',
    symbol: 'DRGN',
    emoji: '🐉'
}
```

Non-Fungible Token (NFT) Example:
```javascript
class Sword extends Jig {
    init(power) { this.power = power }
    send(to) { this.owner = to }
}
Sword.metadata = {
    name: 'Excalibur',
    emoji: '🗡️'
}
```

## Sending BSV

You can send BSV to an address or paymail - click the clip in the top right corner to send BSV.

Paymail leverages the [Polynym API](https://polynym.io/).

Click the balance value to toggle between USD and BSV amounts.

The USD exchange rates is fetched from the [WhatsOnChain API](https://developers.whatsonchain.com/#exchange-rate).

## Receiving BSV

To receive BSV in the wallet, send BSV to the purse address.

When the wallet is open, it listens to the SSE endpoint provided by MatterPool.

Documentation can be found [here](https://developers.matterpool.io/#socket-streaming-sse).

A similar function is implemented to receive jigs, but must be called and modified to refresh the Jigs list.

Specify the ```run.owner.address``` as the first parameter in ```listenTx()``` and ```true``` as the second parameter to listen for incoming Run transactions.

Example:

```javascript
listenTx(run.owner.address, true);
```
This function is commented out by default.

## UTXO management

By default, UTXOs associated to the purse address are cached in ```IndexedDB```.

The purpose of this is to improve speed of the wallet, minimize network calls and potentially support offline transaction generation.

## Custom purse implementation

The wallet implements a custom [Purse](https://run.network/docs/#api-reference-apis-purse) for the purpose of caching UTXOs locally and sending BSV to a Paymail.

The implementation is named ```acornsPurse``` and can be found in scripts/purse.js.

The following functions are implemented:

```balance()``` is overriden to calculate balance from a specified array of UTXOs instead of making a network call each time.

```broadcastTx()``` is developed to broadcast a raw transaction hex to the Bitcoin SV network. 

- The node being broadcast to is configurable in purse.js based on the following nodes that Run supports:
    - RunConnect
    - WhatsOnChain
    - MatterCloud

```send()``` is developed to send BSV to an address or paymail.

```getUTXOs()``` is developed to fetch UTXOs from ```IndexedDB```.

```pay()``` is overriden to use UTXOs from the cache to pay for Run transactions. See [here](https://run.network/docs/#api-reference-apis-purse) for more details.

```broadcast()``` is overriden to let the purse know which UTXOs were consumed upon paying for a transaction that sends Jigs or Tokens and to delete them from ```IndexedDB```.

## Trusted contracts

Run has a concept known as [Trust](https://run.network/docs/#api-reference-run-trust-txid) where a list of contract transactions can be specified that will be loaded.

By default the wallet will only load Jigs from contracts that have been received over time. 

When a new Jig is received, that Jig's contract will be automatically added to the wallet's Trust list in ```localStorage.contracts```.

Trust can be configured on the Settings page, options available are:

Default - Trust jigs incrementally as they are received.

None - Do not trust any jigs other than ones trusted previously.

All - Trust everything. *Warning - using this option could potentially result in malicious code being run in the wallet. Please use with caution.

Developers can override this trust mechanism by calling ```initRun(true)``` informing the Run instance to trust everything (*).

## Local Storage

The following variables are stored in the browser's ```localStorage```:

| Variable | Purpose | Example Value |
| ----------- | ----------- | ----------- |
| ownerKey  | Private key at ownerPath derivation of seed | Kz... |
| purseKey | Private key at pursePath derivation of seed | Ly... |
| seed | 12 word seed phrase of wallet | bed take ... |
| rate | Cached USD exchange rate | 170.01 |
| usdBalance | USD balance of purse | $21.38 |
| purseSats | Satoshi balance of purse | 0.21380000 |
| hasBackedUp | Boolean if wallet has been backed up | true |
| contracts | Stringified array of contracts that run will load and trust | [] |
| sending | Stringified array of token jig locations to pass to send.html when sending Tokens | [] |

## Troubleshooting

If you run into issues using the wallet, some helper functions that can be found in scripts/helpers.js are implemented to refresh the wallet.

```softRefresh()``` - clears the cache of your Purse UTXOs and [Run Cache](https://run.network/docs/#api-reference-plugins-browsercache).
- The Purse UTXOs and Run Caches can be cleared individually by calling the ```clearUTXOs()``` and ```clearRunCache()``` functions respectively.

```hardRefresh()``` - clears the same caches as ```softRefresh()``` but also clears ```localStorage``` - make sure to backup your wallet before running this function!

Transfer functions are implemented on both the purse and owner in the case that one accidentally sends Jigs to the purse, and satoshis to the owner address.

A transfer icon is commented out on the root index.html page - once uncommented click the Transfer icon at the bottom right of the respective card to initiate - a prompt will appear asking to confirm the action.

The Transfer function has a use-case for receiving payments based on ownership of a Jig (ex. Revenue share payments, tips etc.)

Feel free to fork this repo, open issues or make pull requests.

Contact [@145](https://twetch.app/u/145) on Twetch and [@cryptoacorns](https://twitter.com/cryptoAcorns) on Twitter.

The wallet code is open-source however the design (HTML and CSS) are copyrighted by DuckCreation.