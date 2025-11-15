import hre from "hardhat";

async function main() {
  const ethers = hre.ethers;
  console.log("🚀 Deploying TokenFaucet to Base...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Get account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH\n");

  // Deployment parameters
  const claimAmount = ethers.parseEther("0.01"); // 0.01 ETH per claim
  const claimInterval = 24 * 60 * 60; // 24 hours in seconds

  console.log("Deployment parameters:");
  console.log("- Claim Amount:", ethers.formatEther(claimAmount), "ETH");
  console.log("- Claim Interval:", claimInterval / 3600, "hours\n");

  // Deploy contract
  console.log("Deploying TokenFaucet...");
  const TokenFaucet = await ethers.getContractFactory("TokenFaucet");
  const faucet = await TokenFaucet.deploy(claimAmount, claimInterval);

  await faucet.waitForDeployment();
  const faucetAddress = await faucet.getAddress();

  console.log("✅ TokenFaucet deployed to:", faucetAddress);

  // Fund the faucet with initial ETH
  // Use 0.02 ETH to leave enough for gas
  const fundAmount = hre.ethers.parseEther("0.02"); // Fund with 0.02 ETH
  console.log("\n💰 Funding faucet with", hre.ethers.formatEther(fundAmount), "ETH...");
  
  const fundTx = await deployer.sendTransaction({
    to: faucetAddress,
    value: fundAmount,
  });
  await fundTx.wait();

  console.log("✅ Faucet funded successfully!");

  // Verify deployment
  const contractBalance = await ethers.provider.getBalance(faucetAddress);
  console.log("\n📊 Contract Info:");
  console.log("- Address:", faucetAddress);
  console.log("- Balance:", ethers.formatEther(contractBalance), "ETH");
  console.log("- Owner:", await faucet.owner());
  console.log("- Claim Amount:", ethers.formatEther(await faucet.claimAmount()), "ETH");
  console.log("- Claim Interval:", Number(await faucet.claimInterval()) / 3600, "hours");

  // Wait for block confirmations
  console.log("\n⏳ Waiting for block confirmations...");
  await fundTx.wait(5);

  // Verify on BaseScan
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n🔍 Verifying contract on BaseScan...");
    try {
      await hre.run("verify:verify", {
        address: faucetAddress,
        constructorArguments: [claimAmount, claimInterval],
      });
      console.log("✅ Contract verified on BaseScan!");
    } catch (error) {
      console.log("❌ Verification failed:", error.message);
      console.log("You can verify manually later with:");
      console.log(`npx hardhat verify --network ${hre.network.name} ${faucetAddress} ${claimAmount} ${claimInterval}`);
    }
  }

  console.log("\n✨ Deployment complete!");
  console.log("\n📝 Save this contract address for your frontend:");
  console.log(`VITE_FAUCET_CONTRACT_ADDRESS=${faucetAddress}`);
  
  console.log("\n🔗 View on BaseScan:");
  const explorerUrl = hre.network.name === "base" 
    ? "https://basescan.org/address/"
    : "https://sepolia.basescan.org/address/";
  console.log(explorerUrl + faucetAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
