//SPDX-License-Identifier: MIT
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.3/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


pragma solidity ^0.8.17;

contract music_721 is ERC721URIStorage{
    uint[] private myArray = new uint[](100);
    mapping(address => uint[]) private  owner_music;
    mapping(uint => address) private  music_owner;

    address public owner;
    constructor() ERC721 ("OnlyMusic", "OM"){
        owner = msg.sender;
        for (uint i = 100; i > 0; i--) {
            myArray[100-i] = i ;
        }
    }
    modifier onlyOwner{
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    function mint(address _to,uint256 _tokenId,string calldata _uri) public onlyOwner {
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _uri);
    }

    function post(address _to ,string calldata _uri) external  returns (uint256){
        uint token = myArray[myArray.length - 1];
        myArray.pop();
        music_owner[token]= _to;
        owner_music[_to].push(token);
        _mint(_to, token);
        _setTokenURI(token, _uri);
        return token;
    }

    function purchase(address buyer, uint token) external {
        owner_music[buyer].push(token);


    }
}