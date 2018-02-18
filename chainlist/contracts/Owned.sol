pragma solidity ^0.4.11;

contract Owned {
  address owner;

  function Owned() internal {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
}
