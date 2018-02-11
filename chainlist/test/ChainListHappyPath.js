// Notice this is the same API as used in migrations
// It essentially involves using the proxy defined by
// Truffle
const ChainList = artifacts.require('./ChainList.sol');

contract('ChainList', function(accounts) {
  // accounts is defined by the truffle test framework
  it('should be initialized with empty values', async() => {
    const instance = await ChainList.deployed();
    const data = await instance.getArticle();
    assert.equal(data[0], 0x0, 'seller');
    assert.equal(data[1], '', 'name');
    assert.equal(data[2], '', 'description');
    assert.equal(data[3], 0, 'price');
  });
});
