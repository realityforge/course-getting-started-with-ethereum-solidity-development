# Truffle based Example

Initialized via `truffle init`

Commands:

    Compile:        truffle compile
    Migrate:        truffle migrate
    Test contracts: truffle test

Remove `truffle-config.js` as it is only useful under windows.

# Deploying Greetings Contract

* Create the contract `contracts/Greetings.sol`
* Write migration `migrations/2_deploy_contracts.js`
* Start truffle development server `truffle develop`
* Open logs in a separate shell `truffle develop --log`
* Can force a recompile of all contracts and re-run of migration via `truffle migrate --compile-all --reset`
  on the command line or `migrate --compile-all --reset` in the development server. This is sometimes
  necessary if truffle can not identify that a contract needs to be recompiled or re-deployed. The way truffle
  determines whether there is a need to run a migration is that it checks the `Migrations` contract to
  see the value of `last_completed_migration` variable to see if it is higher than the migration number. Thus
  why `--compile-all --reset` parameters are very useful.

* To introspect the `Greetings` contract from the development console you can interact with the `Greetings`
  symbol. For example to get the deployed instance of the contract object in global variable `app` you can run
  `Greetings.deployed().then(function(instance){app = instance;})`. This is truffle specific and beyond what is
  available in web3 js library. However you can now do something like `app.getMessage()` which directly calls
  a contract view function. To send a transaction to Ethereum which is required if you are invoking a contract
  function that changes state (i.e. is not a view function), you pass a config object literal after the parameters
  like `app.setMessage('My New Message',{from: web3.eth.accounts[0]})`
