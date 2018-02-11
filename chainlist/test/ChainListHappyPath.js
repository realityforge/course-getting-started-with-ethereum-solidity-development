// Notice this is the same API as used in migrations
// It essentially involves using the proxy defined by
// Truffle
const ChainList = artifacts.require('./ChainList.sol');

contract('ChainList', function(accounts) {
  // accounts is defined by the truffle test framework

  it('should be initialized with empty values', async() => {
    const contract = await ChainList.deployed();
    const results = await contract.getArticle();
    assert.equal(results[0], 0x0, 'seller');
    assert.equal(results[1], '', 'name');
    assert.equal(results[2], '', 'description');
    assert.equal(results[3], 0, 'price');
  });

  it('should set values when sellArticle invoked', async() => {
    const contract = await ChainList.deployed();
    const seller = accounts[0];
    const name = 'My iPhone';
    const description = 'Good condition';
    const price = web3.toWei(1, 'ether');
    await contract.sellArticle(name, description, price, { from: seller });

    const results = await contract.getArticle();
    assert.equal(results[0], seller, 'seller');
    assert.equal(results[1], name, 'name');
    assert.equal(results[2], description, 'description');
    assert.equal(results[3], price, 'price');
  });
});
