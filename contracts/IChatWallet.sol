// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IChatWallet
 * @notice Interface for checking and interacting with user wallet from ClaimPool.
 */
interface IChatWallet {
    function walletCreated(address) external view returns (bool);
    function createWallet() external;
    function deposit(uint256) external;
}
