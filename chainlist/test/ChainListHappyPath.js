// Notice this is the same API as used in migrations
// It essentially involves using the proxy defined by
// Truffle
const ChainList = artifacts.require('./ChainList.sol');

contract('ChainList', function(accounts) {
  // accounts is defined by the truffle test framework
  it('should be initialized with empty values', async() => {
    const instance = await ChainList.deployed();
    const data = await instance.getArticle();
    const seller = data[0];
    const name = data[1];
    const description = data[2];
    const price = data[3];
    assert.equal(seller, 0x0);
    assert.equal(name, '');
    assert.equal(description, '');
    assert.equal(price, 0);
  });
});
