// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./IChatWallet.sol";

/**
 * @title ClaimPool
 * @notice Escrow contract for sending USDC to users via OTP; funds are claimed on-chain.
 */
contract ClaimPool is ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdc;
    IChatWallet public immutable wallet;

    struct Locked {
        uint256 amount;
        bytes32 otpHash;
        uint256 expiry;
    }

    mapping(address => Locked) public claims;
    event LockedFunds(address indexed to, uint256 amount);
    event Claimed(address indexed user, uint256 amount);

    constructor(address usdcAddress, address walletAddress) {
        usdc = IERC20(usdcAddress);
        wallet = IChatWallet(walletAddress);
    }

    function lock(
        address to,
        uint256 amount,
        bytes32 otpHash,
        uint256 ttl
    ) external {
        require(claims[to].amount == 0, "Claim already pending");
        usdc.safeTransferFrom(msg.sender, address(this), amount);
        claims[to] = Locked({
            amount: amount,
            otpHash: otpHash,
            expiry: block.timestamp + ttl
        });
        emit LockedFunds(to, amount);
    }

    function claim(string memory otp) external nonReentrant {
        address user = msg.sender;
        Locked memory locked = claims[user];
        require(locked.amount > 0, "No claim");
        require(block.timestamp <= locked.expiry, "Expired");
        require(
            keccak256(abi.encodePacked(otp)) == locked.otpHash,
            "Invalid OTP"
        );

        delete claims[user];

        if (!wallet.walletCreated(user)) {
            wallet.createWallet();
        }

        usdc.safeTransfer(address(wallet), locked.amount);
        wallet.deposit(locked.amount);

        emit Claimed(user, locked.amount);
    }

    function cancel(address to) external {
        // Optional: allow sender to cancel after timeout (not implemented in MVP)
    }
}
