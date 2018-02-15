// Notice this is the same API as used in migrations
// It essentially involves using the proxy defined by
// Truffle
const ChainList = artifacts.require('./ChainList.sol');

contract('ChainList', function(accounts) {
  // accounts is defined by the truffle test framework

  const seller = accounts[0];
  const buyer = accounts[1];
  const name = 'My iPhone';
  const description = 'Good condition';
  const price = Number(web3.toWei(1, 'ether'));

  it('should be initialized with empty values', async() => {
    const contract = await ChainList.deployed();
    const results = await contract.getArticle();
    assert.equal(results[0], 0x0, 'seller');
    assert.equal(results[1], 0x0, 'buyer');
    assert.equal(results[2], '', 'name');
    assert.equal(results[3], '', 'description');
    assert.equal(results[4], 0, 'price');
  });

  it('should set values when sellArticle invoked', async() => {
    const contract = await ChainList.deployed();
    /*
     * The receipt includes the events as well as other details about the transaction.
     */
    const receipt = await contract.sellArticle(name, description, price, { from: seller });

    assert.equal(receipt.logs.length, 1, 'One event should have been triggered');

    const event = receipt.logs[0];
    assert.equal(event.event, 'SellArticleEvent');
    assert.equal(event.args._seller, seller);
    assert.equal(event.args._name, name);
    assert.equal(event.args._price, price);

    const results = await contract.getArticle();
    assert.equal(results[0], seller, 'seller');
    assert.equal(results[1], 0x0, 'buyer');
    assert.equal(results[2], name, 'name');
    assert.equal(results[3], description, 'description');
    assert.equal(results[4], price, 'price');
  });

  it('should be able to buy Article', async() => {
    const contract = await ChainList.deployed();

    // Just be aware that the state of the block chain is flowing through from earlier test ....
    // boo - state is not clean but at least it means we can buy the article already setup

    const sellerBalanceBeforeBuy = web3.eth.getBalance(seller).toNumber();
    const buyerBalanceBeforeBuy = web3.eth.getBalance(buyer).toNumber();
    /*
     * The receipt includes the events as well as other details about the transaction.
     */
    const receipt = await contract.buyArticle({ from: buyer, value: price });

    assert.equal(receipt.logs.length, 1, 'One event should have been triggered');

    const event = receipt.logs[0];
    assert.equal(event.event, 'BuyArticleEvent');
    assert.equal(event.args._seller, seller);
    assert.equal(event.args._buyer, buyer);
    assert.equal(event.args._name, name);
    assert.equal(event.args._price, price);

    const sellerBalanceAfterBuy = web3.eth.getBalance(seller).toNumber();
    const buyerBalanceAfterBuy = web3.eth.getBalance(buyer).toNumber();

    assert.equal(sellerBalanceAfterBuy, sellerBalanceBeforeBuy + Number(price), 'Seller should have got the ETH from transaction');
    assert(buyerBalanceAfterBuy <= buyerBalanceBeforeBuy - Number(price),
      'Buyer should have paid the ETH for transaction + gas');

    const results = await contract.getArticle();
    assert.equal(results[0], seller, 'seller');
    assert.equal(results[1], buyer, 'buyer');
    assert.equal(results[2], name, 'name');
    assert.equal(results[3], description, 'description');
    assert.equal(results[4], price, 'price');
  });
});
