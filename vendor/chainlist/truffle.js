module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: 4 // Rinkeby test network
    },
    live: {
      host: "localhost",
      port: 8545,
      network_id: 1, // Ethereum public network
      from: "0xbf6f5e78e154799c7856f4cf9f269cf7a7201310",
      gas: 2000000
    }
  }
};
