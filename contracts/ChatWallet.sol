// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title ChatWallet
 * @notice Stores USDC balances per user; supports gasless deposits and transfers via ERC-2771.
 */
contract ChatWallet is ERC2771Context, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdc;
    mapping(address => uint256) public balance;
    mapping(address => bool) public walletCreated;

    event WalletCreated(address indexed user);
    event Deposited(address indexed user, uint256 amount);
    event Sent(address indexed from, address indexed to, uint256 amount);

    constructor(
        address trustedForwarder,
        address usdcAddress
    ) ERC2771Context(trustedForwarder) {
        usdc = IERC20(usdcAddress);
    }

    function createWallet() external {
        address sender = _msgSender();
        require(!walletCreated[sender], "Wallet exists");
        walletCreated[sender] = true;
        emit WalletCreated(sender);
    }

    function deposit(uint256 amount) external {
        address sender = _msgSender();
        if (!walletCreated[sender]) {
            walletCreated[sender] = true;
            emit WalletCreated(sender);
        }
        usdc.safeTransferFrom(sender, address(this), amount);
        balance[sender] += amount;
        emit Deposited(sender, amount);
    }

    function send(address to, uint256 amount) external {
        address sender = _msgSender();
        require(balance[sender] >= amount, "Insufficient");
        if (!walletCreated[to]) {
            walletCreated[to] = true;
            emit WalletCreated(to);
        }
        balance[sender] -= amount;
        balance[to] += amount;
        emit Sent(sender, to, amount);
    }

    function _msgSender()
        internal
        view
        override(Context, ERC2771Context)
        returns (address sender)
    {
        return ERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }
}
