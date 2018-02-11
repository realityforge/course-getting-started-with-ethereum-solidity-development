// Notice this is the same API as used in migrations
// It essentially involves using the proxy defined by
// Truffle
var ChainList = artifacts.require('./ChainList.sol');

contract('ChainList', function(accounts) {
  // accounts is defined by the truffle test framework
  it('should be initialized with empty values', function() {
    return ChainList.deployed().then(function(instance) {
      return instance.getArticle();
    }).then(function(data) {
      var seller = data[0];
      var name = data[1];
      var description = data[2];
      var price = data[3];
      assert.equal(seller, 0x0);
      assert.equal(name, '');
      assert.equal(description, '');
      assert.equal(price, 0);
    });
  });
});
