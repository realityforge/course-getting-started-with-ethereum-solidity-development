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
}
