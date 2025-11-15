// Optional: Advanced Faucet with ERC20 token support
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title MultiTokenFaucet
 * @dev Faucet that supports both ETH and ERC20 tokens
 * Deploy this if you want to distribute custom tokens on Base
 */
contract MultiTokenFaucet {
    address public owner;
    uint256 public ethClaimAmount;
    uint256 public claimInterval;
    
    mapping(address => uint256) public lastClaimTime;
    mapping(address => uint256) public tokenClaimAmounts;
    
    event EthClaimed(address indexed user, uint256 amount, uint256 timestamp);
    event TokenClaimed(address indexed user, address indexed token, uint256 amount, uint256 timestamp);
    event TokenAdded(address indexed token, uint256 claimAmount);
    
    error InsufficientBalance();
    error ClaimTooSoon(uint256 timeRemaining);
    error InvalidAmount();
    error OnlyOwner();
    error TransferFailed();
    error TokenNotSupported();
    
    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }
    
    constructor(uint256 _ethClaimAmount, uint256 _claimInterval) {
        owner = msg.sender;
        ethClaimAmount = _ethClaimAmount;
        claimInterval = _claimInterval;
    }
    
    function claimETH() external {
        _checkClaimEligibility(msg.sender);
        
        if (address(this).balance < ethClaimAmount) {
            revert InsufficientBalance();
        }
        
        lastClaimTime[msg.sender] = block.timestamp;
        
        (bool success, ) = payable(msg.sender).call{value: ethClaimAmount}("");
        if (!success) revert TransferFailed();
        
        emit EthClaimed(msg.sender, ethClaimAmount, block.timestamp);
    }
    
    function claimToken(address token) external {
        _checkClaimEligibility(msg.sender);
        
        uint256 amount = tokenClaimAmounts[token];
        if (amount == 0) revert TokenNotSupported();
        
        IERC20 tokenContract = IERC20(token);
        if (tokenContract.balanceOf(address(this)) < amount) {
            revert InsufficientBalance();
        }
        
        lastClaimTime[msg.sender] = block.timestamp;
        
        bool success = tokenContract.transfer(msg.sender, amount);
        if (!success) revert TransferFailed();
        
        emit TokenClaimed(msg.sender, token, amount, block.timestamp);
    }
    
    function addToken(address token, uint256 claimAmount) external onlyOwner {
        if (claimAmount == 0) revert InvalidAmount();
        tokenClaimAmounts[token] = claimAmount;
        emit TokenAdded(token, claimAmount);
    }
    
    function _checkClaimEligibility(address user) internal view {
        uint256 timeSinceLastClaim = block.timestamp - lastClaimTime[user];
        
        if (timeSinceLastClaim < claimInterval && lastClaimTime[user] != 0) {
            uint256 timeRemaining = claimInterval - timeSinceLastClaim;
            revert ClaimTooSoon(timeRemaining);
        }
    }
    
    function canClaim(address user) external view returns (bool eligible, uint256 timeRemaining) {
        if (lastClaimTime[user] == 0) {
            return (true, 0);
        }
        
        uint256 timeSinceLastClaim = block.timestamp - lastClaimTime[user];
        
        if (timeSinceLastClaim >= claimInterval) {
            return (true, 0);
        } else {
            return (false, claimInterval - timeSinceLastClaim);
        }
    }
    
    receive() external payable {}
}
