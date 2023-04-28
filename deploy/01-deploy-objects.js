const verify = require("../utils/verify")
const { ethers } = require("hardhat")

const developmentChains = ["localhost", "hardhat"]

const deployObjects = async function (hre) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("----------------------------------------------------")
    log("Deploying ObjectsNFT and waiting for confirmations...")
    const objects = await deploy("ObjectsNFT", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: developmentChains.includes(network.name) ? 1 : 5,
    })
    log(`ObjectsNFT at ${objects.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(objects.address, [])
    }
}

module.exports = deployObjects
deployObjects.tags = ["all", "objects"]
