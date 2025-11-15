import hre from "hardhat";

async function main() {
  const ethers = hre.ethers;
  const contractAddress = process.env.FAUCET_CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    console.error("❌ Please set FAUCET_CONTRACT_ADDRESS environment variable");
    process.exit(1);
  }

  console.log("💰 Claiming from faucet...\n");
  console.log("Contract Address:", contractAddress);

  // Get contract instance
  const TokenFaucet = await ethers.getContractFactory("TokenFaucet");
  const faucet = TokenFaucet.attach(contractAddress);

  const [signer] = await ethers.getSigners();
  console.log("Your Address:", signer.address);

  // Check if can claim
  const [canClaim, timeRemaining] = await faucet.canClaim(signer.address);

  if (!canClaim) {
    console.log("\n❌ Cannot claim yet!");
    console.log("Time remaining:", Number(timeRemaining) / 3600, "hours");
    process.exit(1);
  }

  console.log("\n✅ Eligible to claim!");
  
  // Get balance before claim
  const balanceBefore = await ethers.provider.getBalance(signer.address);
  console.log("\nBalance before:", ethers.formatEther(balanceBefore), "ETH");

  // Claim tokens
  console.log("\n📤 Sending claim transaction...");
  const tx = await faucet.claim();
  console.log("Transaction hash:", tx.hash);

  console.log("⏳ Waiting for confirmation...");
  const receipt = await tx.wait();
  console.log("✅ Transaction confirmed!");
  console.log("Block number:", receipt.blockNumber);
  console.log("Gas used:", receipt.gasUsed.toString());

  // Get balance after claim
  const balanceAfter = await ethers.provider.getBalance(signer.address);
  console.log("\nBalance after:", ethers.formatEther(balanceAfter), "ETH");

  const claimed = balanceAfter - balanceBefore + receipt.gasUsed * receipt.gasPrice;
  console.log("Amount claimed:", ethers.formatEther(claimed), "ETH");

  console.log("\n🎉 Claim successful!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error.message);
    process.exit(1);
  });
