// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TokenFaucet
 * @dev A simple faucet contract that allows users to claim ETH periodically
 * Perfect for testing on Base network with your wallet connection app
 */
contract TokenFaucet {
    // State variables
    address public owner;
    uint256 public claimAmount;
    uint256 public claimInterval;
    
    // Mapping to track last claim time for each address
    mapping(address => uint256) public lastClaimTime;
    
    // Events
    event Claimed(address indexed user, uint256 amount, uint256 timestamp);
    event Deposited(address indexed from, uint256 amount);
    event ClaimAmountUpdated(uint256 oldAmount, uint256 newAmount);
    event ClaimIntervalUpdated(uint256 oldInterval, uint256 newInterval);
    event EmergencyWithdraw(address indexed to, uint256 amount);
    
    // Errors
    error InsufficientBalance();
    error ClaimTooSoon(uint256 timeRemaining);
    error InvalidAmount();
    error OnlyOwner();
    error TransferFailed();
    
    // Modifiers
    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }
    
    /**
     * @dev Constructor sets the initial claim amount and interval
     * @param _claimAmount Amount of ETH users can claim (in wei)
     * @param _claimInterval Time in seconds between claims
     */
    constructor(uint256 _claimAmount, uint256 _claimInterval) {
        owner = msg.sender;
        claimAmount = _claimAmount;
        claimInterval = _claimInterval;
    }
    
    /**
     * @dev Allows users to claim tokens from the faucet
     */
    function claim() external {
        // Check if enough time has passed since last claim
        uint256 timeSinceLastClaim = block.timestamp - lastClaimTime[msg.sender];
        
        if (timeSinceLastClaim < claimInterval && lastClaimTime[msg.sender] != 0) {
            uint256 timeRemaining = claimInterval - timeSinceLastClaim;
            revert ClaimTooSoon(timeRemaining);
        }
        
        // Check if contract has enough balance
        if (address(this).balance < claimAmount) {
            revert InsufficientBalance();
        }
        
        // Update last claim time
        lastClaimTime[msg.sender] = block.timestamp;
        
        // Transfer tokens to user
        (bool success, ) = payable(msg.sender).call{value: claimAmount}("");
        if (!success) revert TransferFailed();
        
        emit Claimed(msg.sender, claimAmount, block.timestamp);
    }
    
    /**
     * @dev Check if an address can claim tokens
     * @param user Address to check
     * @return eligible Whether the user can claim
     * @return timeRemaining Time until user can claim (0 if they can claim now)
     */
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
    
    /**
     * @dev Deposit ETH into the faucet
     */
    function deposit() external payable {
        if (msg.value == 0) revert InvalidAmount();
        emit Deposited(msg.sender, msg.value);
    }
    
    /**
     * @dev Update the claim amount (only owner)
     * @param _newAmount New claim amount in wei
     */
    function updateClaimAmount(uint256 _newAmount) external onlyOwner {
        if (_newAmount == 0) revert InvalidAmount();
        uint256 oldAmount = claimAmount;
        claimAmount = _newAmount;
        emit ClaimAmountUpdated(oldAmount, _newAmount);
    }
    
    /**
     * @dev Update the claim interval (only owner)
     * @param _newInterval New interval in seconds
     */
    function updateClaimInterval(uint256 _newInterval) external onlyOwner {
        if (_newInterval == 0) revert InvalidAmount();
        uint256 oldInterval = claimInterval;
        claimInterval = _newInterval;
        emit ClaimIntervalUpdated(oldInterval, _newInterval);
    }
    
    /**
     * @dev Emergency withdraw function (only owner)
     * @param _to Address to send funds to
     */
    function emergencyWithdraw(address payable _to) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = _to.call{value: balance}("");
        if (!success) revert TransferFailed();
        emit EmergencyWithdraw(_to, balance);
    }
    
    /**
     * @dev Get contract balance
     * @return balance Current ETH balance of the contract
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Transfer ownership (only owner)
     * @param newOwner Address of new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
    
    // Fallback function to accept ETH
    receive() external payable {
        emit Deposited(msg.sender, msg.value);
    }
}
