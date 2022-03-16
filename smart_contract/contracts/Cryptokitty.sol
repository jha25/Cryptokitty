// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Token.sol";

contract Cryptokitty is ERC721Token {
    struct Kitty {
        uint256 id;
        uint256 generation;
        uint256 geneA;
        uint256 geneB;
    }
    mapping(uint256 => Kitty) public kitties;
    uint256 public nextId;
    address public admin;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _tokenURIBase
    ) ERC721Token(_name, _symbol, _tokenURIBase) {
        admin = msg.sender;
    }

    function breed(uint256 kitty1Id, uint256 kitty2Id) external {
        require(
            kitty1Id < nextId && kitty2Id < nextId,
            "The 2 kitties must exist"
        );
        Kitty storage kitty1 = kitties[kitty1Id];
        Kitty storage kitty2 = kitties[kitty2Id];
        require(
            ownerOf(kitty1Id) == msg.sender && ownerOf(kitty2Id) == msg.sender,
            "msg.sender must own the two kitties"
        );
        uint256 maxGen = kitty1.generation > kitty2.generation
            ? kitty1.generation
            : kitty2.generation;
        uint256 geneA = _random(4) > 1 ? kitty1.geneA : kitty2.geneA;
        uint256 geneB = _random(4) > 1 ? kitty1.geneB : kitty2.geneB;
        kitties[nextId] = Kitty(nextId, maxGen, geneA, geneB);
        _mint(msg.sender, nextId);
        nextId++;
    }

    function mint() external {
        require(msg.sender == admin, "Only Admin");
        kitties[nextId] = Kitty(nextId, 1, _random(10), _random(10));
        _mint(msg.sender, nextId);
        nextId++;
    }

    function _random(uint256 max) internal view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.timestamp, block.difficulty))
            ) % max;
    }
}
