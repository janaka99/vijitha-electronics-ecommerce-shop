const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const Transactions = await hre.ethers.getContractFactory("VijithaElectronic");
  const transaction = await Transactions.deploy();

  await transaction.waitForDeployment();

  console.log("Transactions deployed to: ", await transaction.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
