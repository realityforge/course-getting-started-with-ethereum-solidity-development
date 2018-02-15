pragma solidity ^0.4.19;

contract ChainList {
  // The account that put up listing
  address seller;
  // The account that purchased listing
  address buyer;
  string name;
  string description;
  // The price is in wei
  uint256 price;

  // Seller is indexed which means clients can search/filter on this field
  event SellArticleEvent (
    address indexed _seller,
    string _name,
    uint256 _price
  );

  // Buyer+Seller is indexed which means clients can search/filter on these fields
  event BuyArticleEvent (
    address indexed _seller,
    address indexed _buyer,
    string _name,
    uint256 _price
  );

  function sellArticle(string _name, string _description, uint256 _price) public {
    seller = msg.sender;
    name = _name;
    description = _description;
    price = _price;

    // This fires the event, that just puts it in the transaction log
    // The goal being that clients can list for events
    SellArticleEvent(seller, name, price);
  }

  function getArticle() public view returns (address, address, string, string, uint256) {
    return (seller, buyer, name, description, price);
  }

  // Buy an article
  function buyArticle() public payable {
    // Ensure that we have an article to sell
    require(seller != 0x0);
    // Ensure that we don't yet have a buyer
    require(buyer == 0x0);
    // Ensure that the buyer is not the seller
    require(seller != msg.sender);
    // Ensure that the amount sent is the price
    require(msg.value == price);

    // Record buyer
    buyer = msg.sender;

    // Pay the seller with the eth passed to this transaction
    // This method will run "revert" if the transfer fails for any reason
    // we could have used the "send" method on address which returns false if transfer fails
    // but then we would have needed to check return value and execute revert outselves if it failed
    seller.transfer(msg.value);

    // Notify listeners
    BuyArticleEvent(seller, buyer, name, price);
  }
}
