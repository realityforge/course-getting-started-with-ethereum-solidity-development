module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {

    // Define a network. Can be any name except for the name "develop" which
    // refers to the builtin truffle network
    ganache: {
      host: 'localhost',
      port: 7545,
      // "*" here in case we want to connect to any arbitrary
      // network we create. We could have locked it down to a specific
      // port but this is easier
      network_id: '*'
    }
  }
};
