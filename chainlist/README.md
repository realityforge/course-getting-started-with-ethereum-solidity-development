# ChainList Application

This application was created via unboxing a new project via `truffle unbox chainskills/chainskills-box`.

# Setup

Upload the contracts to ganache:

    > truffle migrate --reset --compile-all --network ganache

Run the local `liteserver` development server via `yarn dev` for front-end hot reloading. This starts a local
server on on http://localhost:3000. (Smart contract changes must be manually recompiled and migrated.)

# Inspection

Remember that you can inspect the ganache runtime via:

    > truffle console --network ganache

and then type in commands such as:

    # Amount of ether in first account
    $ web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]),"ether").toNumber()
    
    # Get Truffles local proxy for deployed contract
    $ ChainList.deployed().then(function(i){app = i;})
    $ app.getArticle()
    
    # Watch for the SellArticleEvent events with no filter (first {}), starting from latest block (second {} configuration)
    $ app.SellArticleEvent({},{}).watch(function(error, event){console.log(event);})

# Transaction Debugging

You can also step through a transaction run on truffle as a way to debug. This is done via:

    # Assume that the Transaction hash is 0x6b99e0dcf57fd551221fc5a1a5da826418a0054a725dcb5317f91daf4b5b4833
    $ truffle debug 0x6b99e0dcf57fd551221fc5a1a5da826418a0054a725dcb5317f91daf4b5b4833 --network ganache
