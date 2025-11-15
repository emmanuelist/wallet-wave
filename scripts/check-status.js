import hre from "hardhat";

async function main() {
  const ethers = hre.ethers;
  const contractAddress = process.env.FAUCET_CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    console.error("❌ Please set FAUCET_CONTRACT_ADDRESS environment variable");
    process.exit(1);
  }

  console.log("🔍 Checking faucet status...\n");
  console.log("Contract Address:", contractAddress);

  // Get contract instance
  const TokenFaucet = await ethers.getContractFactory("TokenFaucet");
  const faucet = TokenFaucet.attach(contractAddress);

  // Get contract info
  const balance = await ethers.provider.getBalance(contractAddress);
  const owner = await faucet.owner();
  const claimAmount = await faucet.claimAmount();
  const claimInterval = await faucet.claimInterval();

  console.log("📊 Contract Status:");
  console.log("- Balance:", ethers.formatEther(balance), "ETH");
  console.log("- Owner:", owner);
  console.log("- Claim Amount:", ethers.formatEther(claimAmount), "ETH");
  console.log("- Claim Interval:", Number(claimInterval) / 3600, "hours");

  // Check if user can claim
  const [signer] = await ethers.getSigners();
  const [canClaim, timeRemaining] = await faucet.canClaim(signer.address);

  console.log("\n👤 Your Account:", signer.address);
  console.log("- Can Claim:", canClaim ? "Yes ✅" : "No ❌");
  if (!canClaim) {
    console.log("- Time Until Next Claim:", Number(timeRemaining) / 3600, "hours");
  }

  // Get last claim time
  const lastClaimTime = await faucet.lastClaimTime(signer.address);
  if (lastClaimTime > 0) {
    const date = new Date(Number(lastClaimTime) * 1000);
    console.log("- Last Claimed:", date.toLocaleString());
  } else {
    console.log("- Last Claimed: Never");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
