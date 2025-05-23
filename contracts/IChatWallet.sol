// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IChatWallet
 * @notice Interface for checking and interacting with user wallet from ClaimPool.
 */
interface IChatWallet {
    function createWallet() external;
    function walletCreated(address) external view returns (bool);
    function deposit(uint256) external;
}
