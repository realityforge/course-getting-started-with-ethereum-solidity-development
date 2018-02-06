#!/usr/bin/env bash

export GETH_DATADIR=`pwd`/data

geth --networkid 4224 --mine --datadir $GETH_DATADIR --nodiscover --rpc --rpcport "8545" --port "30303" --rpccorsdomain "*" --nat "any" --rpcapi eth,web3,personal,net --unlock 0 --password $GETH_DATADIR/password.sec --ipcpath "~/Library/Ethereum/geth.ipc"
