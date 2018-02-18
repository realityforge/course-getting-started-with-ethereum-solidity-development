pragma solidity ^0.4.11;

import "./Owned.sol";

contract Mortal is Owned {

  function kill() public onlyOwner {
    selfdestruct(owner);
  }
}
