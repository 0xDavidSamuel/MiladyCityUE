// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MiladyCity is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 private _tokenIdCounter;
    
    uint256 public mintPrice = 0.01 ether;
    uint256 public allowlistPrice = 0.008 ether;
    
    bool public mintEnabled = false;
    bool public allowlistEnabled = true;
    
    mapping(address => bool) public allowlist;
    mapping(bytes32 => bool) public usedTraitHashes;
    
    uint96 public royaltyBps = 500;
    address public royaltyReceiver;
    
    uint256 public withdrawLockTime;
    uint256 public constant LOCK_DURATION = 365 days;

    event PlayerMinted(address indexed owner, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("MiladyCity", "MCITY") Ownable(msg.sender) {
        royaltyReceiver = msg.sender;
        withdrawLockTime = block.timestamp + LOCK_DURATION;
    }

    function mint(string memory uri, bytes32 traitHash) public payable nonReentrant {
        require(mintEnabled || (allowlistEnabled && allowlist[msg.sender]), "Minting not active");
        require(!usedTraitHashes[traitHash], "Trait combination exists");
        
        uint256 price = allowlist[msg.sender] ? allowlistPrice : mintPrice;
        require(msg.value >= price, "Insufficient payment");

        usedTraitHashes[traitHash] = true;
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }

        emit PlayerMinted(msg.sender, tokenId, uri);
    }

    function addToAllowlist(address[] calldata addresses) external onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            allowlist[addresses[i]] = true;
        }
    }

    function removeFromAllowlist(address[] calldata addresses) external onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            allowlist[addresses[i]] = false;
        }
    }

    function setMintEnabled(bool enabled) external onlyOwner {
        mintEnabled = enabled;
    }

    function setAllowlistEnabled(bool enabled) external onlyOwner {
        allowlistEnabled = enabled;
    }

    function setMintPrice(uint256 price) external onlyOwner {
        mintPrice = price;
    }

    function setAllowlistPrice(uint256 price) external onlyOwner {
        allowlistPrice = price;
    }

    function withdraw() external onlyOwner {
        require(block.timestamp >= withdrawLockTime, "Funds locked");
        payable(owner()).transfer(address(this).balance);
    }

    function royaltyInfo(uint256, uint256 salePrice) external view returns (address, uint256) {
        return (royaltyReceiver, (salePrice * royaltyBps) / 10000);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return interfaceId == 0x2a55205a || super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
