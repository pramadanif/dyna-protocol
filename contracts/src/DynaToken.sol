// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DynaToken
 * @dev ERC20 Token for the DYNA Protocol. Features include initial supply minting,
 * burn capabilities, and ownership management.
 */
contract DynaToken is ERC20, ERC20Burnable, Ownable {
    constructor(
        uint256 initialSupply,
        address initialOwner
    ) ERC20("DYNA", "DYNA") Ownable(initialOwner) {
        _mint(initialOwner, initialSupply);
    }

    /**
     * @dev Mint new tokens. Only the owner can call this function.
     * Useful if the protocol needs to emit more rewards over time.
     * @param to The address to receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
