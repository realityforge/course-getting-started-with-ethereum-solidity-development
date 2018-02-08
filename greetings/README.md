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
  necessary if truffle can not identify that a contract needs to be recompiled or re-deployed.
