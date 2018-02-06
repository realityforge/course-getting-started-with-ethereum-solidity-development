# Setting up Private Ethereum Network
 
The following steps are required when setting up the network.

1. Setup the directory to hold data and initialize the directory

```bash
$ export GETH_DATADIR=`pwd`/data
$ mkdir -p $GETH_DATADIR
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

Select a networkid that does not align with a public network (i.e. not a low number). We choose 4224. Then
there are several parameters relating to network connectivity of the node and some relating to mining.

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
