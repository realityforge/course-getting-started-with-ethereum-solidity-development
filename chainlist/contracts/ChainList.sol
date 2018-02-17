pragma solidity ^0.4.19;

contract ChainList {
  struct Article {
    uint256 articleId;
    // The account that put up listing
    address seller;
    // The account that purchased listing
    address buyer;
    string name;
    string description;
    // The price is in wei
    uint256 price;
  }

  // Seller is indexed which means clients can search/filter on this field
  event SellArticleEvent (
    uint256 indexed _articleId,
    address indexed _seller,
    string _name,
    uint256 _price
  );

  // Buyer+Seller is indexed which means clients can search/filter on these fields
  event BuyArticleEvent (
    uint256 indexed _articleId,
    address indexed _seller,
    address indexed _buyer,
    string _name,
    uint256 _price
  );

  mapping(uint256 => Article) public articles;
  uint256 public lastArticleId;

  function sellArticle(string _name, string _description, uint256 _price) public returns (uint256) {

    lastArticleId++;
    articles[lastArticleId] = Article(lastArticleId, msg.sender, 0x0, _name, _description, _price);

    var article = articles[lastArticleId];

    // This fires the event, that just puts it in the transaction log
    // The goal being that clients can list for events
    SellArticleEvent(article.articleId, article.seller, article.name, article.price);

    return article.articleId;
  }

  function getArticle(uint256 articleId) public view returns (address, address, string, string, uint256) {
    require(articleId > 0 && articleId <= lastArticleId);
    var article = articles[articleId];
    return (article.seller, article.buyer, article.name, article.description, article.price);
  }

  // Buy an article
  function buyArticle(uint256 articleId) public payable {
    // Ensure that we have an article to sell
    require(articleId > 0 && articleId <= lastArticleId);

    // get article
    var article = articles[articleId];

    // Ensure that we don't yet have a buyer
    require(article.buyer == 0x0);
    // Ensure that the buyer is not the seller
    require(article.seller != msg.sender);
    // Ensure that the amount sent is the price
    require(msg.value == article.price);

    // Record buyer
    article.buyer = msg.sender;

    // Pay the seller with the eth passed to this transaction
    // This method will run "revert" if the transfer fails for any reason
    // we could have used the "send" method on address which returns false if transfer fails
    // but then we would have needed to check return value and execute revert outselves if it failed
    article.seller.transfer(msg.value);

    // Notify listeners
    BuyArticleEvent(article.articleId, article.seller, article.buyer, article.name, article.price);
  }
}
