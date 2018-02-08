pragma solidity ^0.4.18;

contract Greetings {
  string public message;

  function Greetings() public {
    message = 'Hello';
  }

  function setMessage(string _message) public {
    message = _message;
  }

  function getMessage() public view returns (string){
    return message;
  }
}
