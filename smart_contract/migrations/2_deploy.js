/** @format */

const CryptoKitty = artifacts.require("Cryptokitty.sol")

module.exports = async function (deployer) {
	await deployer.deploy(
		CryptoKitty,
		"CryptoKitty",
		"CK",
		"https://robohash.org",
	)
	const game = await CryptoKitty.deployed()
	await Promise.all([game.mint(), game.mint(), game.mint(), game.mint()])
}
