# Setting up Private Ethereum Network
 
The following steps are required when setting up the network.

1. Setup the directory to hold data and initialize the directory

    > export GETH_DATADIR=`pwd`/data
    > mkdir -p $GETH_DATADIR
    > geth --datadir $GETH_DATADIR init genesis.json