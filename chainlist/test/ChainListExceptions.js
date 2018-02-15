// Notice this is the same API as used in migrations
// It essentially involves using the proxy defined by
// Truffle
const ChainList = artifacts.require('./ChainList.sol');

contract('ChainList', function(accounts) {

  const seller = accounts[1];
  const buyer = accounts[2];
  const name = 'My iPhone';
  const description = 'Good condition';
  const price = Number(web3.toWei(1, 'ether'));

  it('should throw an exception if you try to buy an article when there is no article for sale', async() => {
    const contract = await ChainList.deployed();
    let error = null;
    try {
      await contract.buyArticle({ from: buyer, value: price });
    } catch (e) {
      error = e;
    }

    // Expect an error
    assert(error);

    const results = await contract.getArticle();
    // Make sure there is still no item sold or bought
    assert.equal(results[0], 0x0, 'seller');
    assert.equal(results[1], 0x0, 'buyer');
  });

  it('should throw an exception if you try to buy your own article', async() => {
    const contract = await ChainList.deployed();

    await contract.sellArticle(name, description, price, { from: seller });

    let error = null;
    try {
      await contract.buyArticle({ from: seller, value: price });
    } catch (e) {
      error = e;
    }

    // Expect an error
    assert(error);

    const results = await contract.getArticle();
    assert.equal(results[0], seller, 'seller');
    assert.equal(results[1], 0x0, 'buyer');
    assert.equal(results[2], name, 'name');
    assert.equal(results[3], description, 'description');
    assert.equal(results[4], price, 'price');
  });

  it('should throw an exception if you do not send enough ETH to cover transaction', async() => {
    const contract = await ChainList.deployed();

    let error = null;
    try {
      await contract.buyArticle({ from: buyer, value: 1 });
    } catch (e) {
      error = e;
    }

    // Expect an error
    assert(error);

    const results = await contract.getArticle();
    assert.equal(results[0], seller, 'seller');
    assert.equal(results[1], 0x0, 'buyer');
  });


  it('should throw an exception if it is already bought', async() => {
    const contract = await ChainList.deployed();

    await contract.buyArticle({ from: buyer, value: price });

    const buyer2 = accounts[3];

    let error = null;
    try {
      await contract.buyArticle({ from: buyer2, value: price });
    } catch (e) {
      error = e;
    }

    // Expect an error
    assert(error);

    const results = await contract.getArticle();
    assert.equal(results[0], seller, 'seller');
    assert.equal(results[1], buyer, 'buyer');
  });
});
