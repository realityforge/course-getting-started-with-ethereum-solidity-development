# Setting up Private Ethereum Network
 
The following steps are required when setting up the network.

1. Setup the directory to hold data and initialize the directory

```bash
$ export GETH_DATADIR=`pwd`/data
$ mkdir -p $GETH_DATADIR
$ cd $GETH_DATADIR
$ puppeth # this tool helps you to create genesis.json from cli wizard
$ geth --datadir $GETH_DATADIR init genesis.json
```

Run the command `tree $GETH_DATADIR` to see the layout of the directory.

2. Create a number of accounts. We will create 3 with the same password `letmein`.

```bash
$ geth --datadir $GETH_DATADIR account new
$ geth --datadir $GETH_DATADIR account new
$ geth --datadir $GETH_DATADIR account new
```

And make sure they are all created by running the command

```bash
geth --datadir $GETH_DATADIR account list
```

3. Start the node as a miner.

Select a networkid that does not align with a public network. We choose 4224. Then there are several
parameters relating to network connectivity of the node and some relating to mining.

Public networks include:
* 1 - Main net
* 2 - Morden test net (obsoletet)
* 3 - Ropsten test net
* 4 - Rinkeby test net
* 42 - Kovan test net

Before running the command we need to create a file that contains password for the account that the coinbase
transaction will deposit the mining reward into.

```bash
$ echo letmein > $GETH_DATADIR/password.sec
```

Then run the startup command:

```bash
$ ./startup.sh
```

Notes:
* `~/Library/Ethereum/geth.ipc` is the default location of ethereum ipc endpoint used by mist. This makes it
  easy to talk to Ethereum from mist.
* `--unlock 0` indicates the account where mining rewards will be deposited, with the password of that account
  specified by `--password`.

4. Attach to running node to inspect it. This relies on ipc endpoint being setup correctly. You can open up
  a console once the geth node is running by executing `geth attach`. Then you can run all sorts of commands
  in the console:

  - `eth.accounts` - list the addresses of the accounts on the node.
  - `eth.coinbase` - the coinbase of node/block (which happens to always be the first account in our configuration).
  - `eth.getBalance(eth.coinbase)` - get the number of wei in coinbase account.
  - `eth.getBalance(eth.accounts[0])` - get the number of wei in coinbase account.
  - `eth.getBalance(eth.accounts[1])` - get the number of wei in second account (Should be zero atm).
  - `web3.fromWei(eth.getBalance(eth.coinbase),'ether')` - get the number of ether in mining account.
  - `miner.stop()` - stop miner.
  - `miner.start()` - start miner.
  - `miner.start(3)` - start miner using up to 3 threads.
  - `net.version` - retrieve the networkid of network.
  - `personal.unlockAccount(eth.accounts[1],'letmein',300)` - unlock the second account for 300 seconds.
  - `personal.unlockAccount(eth.accounts[2])` - unlock the third account for 10 minutes and prompt for password.
  - `eth.sendTransaction({from: eth.coinbase, to: eth.accounts[1], value: web3.toWei(100, "ether")})` - Transfer
    100 ether from coinbase account (i.e. miner) to the second account.

  This console just provides access to a configured instance of the web3 javascript API so anything you can do
  with that API can be done from the console. See the [Javascript API](https://github.com/ethereum/wiki/wiki/JavaScript-API)
  and the [JavaScript Console](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console) documentation
  for further details.
