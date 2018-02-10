pragma solidity ^0.4.19;

contract ChainList {
  // The account that put up listing
  address seller;
  string name;
  string description;
  // The price is in wei
  uint256 price;

  function sellArticle(string _name, string _description, uint256 _price) public {
    seller = msg.sender;
    name = _name;
    description = _description;
    price = _price;
  }

  function getArticle() public view returns (address, string, string, uint256) {
    return (seller, name, description, price);
  }
}
