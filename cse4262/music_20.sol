//SPDX-License-Identifier: MIT
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.3/contracts/token/ERC20/ERC20.sol";

pragma solidity ^0.8.17;

contract music_20 is ERC20{
    address public owner;
    constructor(address own)  ERC20("MusicCoin","MC"){
         owner = own;
        _mint(owner, 1000000000 * (10 ** 18));
    }

    
}