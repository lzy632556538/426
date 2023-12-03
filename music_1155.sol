// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.3/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.3/contracts/utils/Strings.sol";
import "./music_721.sol";
import "./music_20.sol";

/**
该智能合约功能是：用户可以购买音乐资产或使用代币进行交换。合约维护了一个用户注册列表，并限制只有已注册的用户才能执行特定的操作。

MusicCoin、point、music1、music2和music3，这些常量的值分别为0、1、2、3和4，用于代表不同的音乐资产。

users的映射(mapping)，用于存储用户的注册状态。

在构造函数(constructor)中，使用了ERC1155的构造函数来设置metadata URI，即元数据的链接。

构造函数中使用 _mint 函数来创建初始的音乐资产和代币。其中，music1、music2和music3被创建了各自数量为1的音乐资产，并标注了价格；MusicCoin和point被创建了各自数量为100,000的代币。

onlyUser 修饰器，用于限制只有已注册的用户才能执行修饰的函数。

purchase 函数用于购买音乐资产。它接受目标地址(to)、代币(token)和数量(amount)作为参数，并且只允许已注册的用户调用。函数中使用 _safeTransferFrom 函数来执行代币的转移操作，从合约的拥有者(owner)向目标地址(to)转移指定数量的音乐资产(token)，并且从目标地址(to)向合约的拥有者(owner)转移指定数量的代币(0)。此外，还从合约的拥有者(owner)向目标地址(to)转移了指定数量的代币(1/10)。

purchaseByPoint 函数用于使用代币购买音乐资产。它接受目标地址(to)、代币(token)和数量(amount)作为参数，并且只允许已注册的用户调用。函数中使用 _safeTransferFrom 函数来执行代币的转移操作，从目标地址(to)向合约的拥有者(owner)转移指定数量的代币(1)，并且从合约的拥有者(owner)向目标地址(to)转移指定数量的音乐资产(token)。

charge 函数用于充值代币。它接受目标地址(to)和价格(price)作为参数，并且只允许已注册的用户调用。函数中使用 _safeTransferFrom 函数来执行代币的转移操作，从合约的拥有者(owner)向目标地址(to)转移指定数量的代币(0)，以支付指定的价格。

register 函数用于注册用户。它返回一个布尔值，表示注册是否成功。如果调用该函数的地址尚未注册(users[msg.sender] == 0)，则将其注册为已注册用户(users[msg.sender] = 1)，并返回true；否则返回false。
 */

contract music_1155 is ERC1155{
    uint256 public constant MusicCoin = 0;
    uint256 public constant point = 1;
    uint256 public constant music1 = 2;
    uint256 public constant music2 = 3;
    uint256 public constant music3 = 4;
    music_721 private music721;
    music_20 private music20;
    address public owner;
    mapping(address => uint) users;

    
    
    constructor() ERC1155("https://ipfs.io/ipfs/QmPaYic4frfb3cn4TJTYL3gEPPZwXuPWfUrjekHoh9oWTA/{id}.jpg"){
        owner = msg.sender;
        music721 = new music_721();
        music20 = new music_20(msg.sender);
        _mint(msg.sender,music1,1,"price:100");
        _mint(msg.sender,music2,1,"price:200");
        _mint(msg.sender,music3,1,"price:300");
        _mint(msg.sender,MusicCoin,100000,"");
        _mint(msg.sender,point,100000,"");
    }

    modifier onlyUser() {
        require(users[msg.sender] == 1 && msg.sender != owner);
        _;
    }
    function purchase( address to, uint token, uint amount) external onlyUser{
        _safeTransferFrom(owner,to,token,1,"");
        _safeTransferFrom(to,owner,0,amount,"");
        _safeTransferFrom(owner,to,1,amount/10,"");

    }

    function purchaseByPoint( address to, uint token, uint amount) external onlyUser {
        _safeTransferFrom(to,owner,1,amount,"");
        _safeTransferFrom(owner,to,token,1,"");
    }

    function charge(address to, uint price) external onlyUser {
        _safeTransferFrom(owner,to,0,price,"");
    }
    
    function register() external returns (bool) {
        users[msg.sender] = 1;

    }




}