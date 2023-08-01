const Web3 = require('web3');
const TreeNFT = require("../contract/Tree.abi.json");
const { newKitFromWeb3 } = require('@celo/contractkit');

const ERC20_DECIMALS = 18
const MPContractAddress = "0x2DE37Cd8d5ff68cFC325F861F20719B290293C96";

let kit
const connectCeloWallet = async function () {
  if (window.celo) {
    try {
      // notification("⚠️ Please approve this DApp to use it.")
      await window.celo.enable()
      // notificationOff()

      const web3 = new Web3(window.celo)
      console.log("web3", web3)
      kit = newKitFromWeb3(web3)

      const accounts = await kit.web3.eth.getAccounts()
      console.log("accounts", accounts);
      if (accounts.length === 0) {
        throw new Error('No account found')
      }
      kit.defaultAccount = accounts[0]
    } catch (error) {
      // notification(`⚠️ ${error}.`)
      console.error(error)
    }
  } else {
    // notification("⚠️ Please install the CeloExtensionWallet.")
  }
}
//create an instance of the contract, passing the contract abi, and the contract address

kit.defaultAccount = accounts[0]

const networkId = await kit.web3.eth.net.getId();
const deployedNetwork = TreeNFT.networks[networkId];
contractInstance = new kit.web3.eth.Contract(
  TreeNFT.abi,
  deployedNetwork && deployedNetwork.address,
);

//the mintTree function will call the mint function of your smart contract.

const mintTree = async () => {
  const species = document.querySelector('#species').value
  const age = document.querySelector('#age').value
  const location = document.querySelector('#location').value
  const proofOfPlant = document.querySelector('#proofOfPlant').value
  const proofOfLife = document.querySelector('#proofOfLife').value

  const tx = await contractInstance.methods.mint(species, age, location, proofOfPlant, proofOfLife).send({from: kit.defaultAccount});
  console.log(tx)
}


const getBalance = async function () {
  const totalBalance = await kit.getTotalBalance(kit.defaultAccount)
  const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2)
  document.querySelector("#balance").textContent = cUSDBalance
}

window.addEventListener('load', async () => {
  await connectCeloWallet()
  if (kit) {
    await getBalance()
  }
 // notificationOff()
});
