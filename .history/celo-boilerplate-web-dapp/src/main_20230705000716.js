const Web3 = require('web3');
const TreeNFT = require("../contract/Tree.abi.json");
const { newKitFromWeb3 } = require('@celo/contractkit');
let contractInstance;

const ERC20_DECIMALS = 18
const TNContractAddress = "0x2DE37Cd8d5ff68cFC325F861F20719B290293C96";

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

      //create an instance of the contract, passing the contract abi, and the contract address
      const networkId = await kit.web3.eth.net.getId();
      const deployedNetwork = TreeNFT.networks[networkId];
      contractInstance = new kit.web3.eth.Contract(
        TreeNFT,
        TNContractAddress
      );
    } catch (error) {
      // notification(`⚠️ ${error}.`)
      console.error(error)
    }
  } else {
    // notification("⚠️ Please install the CeloExtensionWallet.")
  }
}

//the mintTree function will call the mint function of your smart contract.

const mintTree = async (event, contractInstance) => {
  event.preventDefault();
  const to = ethereum.selectedAddress; // Get the connected user's address
  const tokenId = Date.now();
  const species = document.querySelector('#species').value
  const age = document.querySelector('#age').value
  const location = document.querySelector('#location').value
  const proofOfPlant = document.querySelector('#proofOfPlant').value
  const proofOfLife = document.querySelector('#proofOfLife').value
  const tokenURI = "true";


  contractInstance = new kit.web3.eth.Contract(
    TreeNFT,
    TNContractAddress
  )
  document.querySelector('#mintButton').textContent = 'Minting...';
  const tx = await contractInstance.methods.mint(species, age, location, proofOfPlant, proofOfLife).send({from: kit.defaultAccount});
  console.log(tx);
  document.querySelector('#mintButton').textContent = 'Mint';
  alert('Tree has been minted!');
  await loadTrees();
}

//bind the mintTree function to the submit event of the form
document.querySelector('#mintForm').addEventListener('submit', mintTree);

//display the mint tree
const loadTrees = async () => {
  const treeCount = await contractInstance.methods.getTreeCount().call();
  const tbody = document.querySelector('#treeInfoTableBody');
  tbody.innerHTML = '';
  
  for(let i = 0; i < treeCount; i++) {
    const tree = await contractInstance.methods.trees(i).call();
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${tree.species}</td>
      <td>${tree.age}</td>
      <td>${tree.location}</td>
      <td>${tree.proofOfPlant}</td>
      <td>${tree.proofOfLife}</td>
    `;
    tbody.appendChild(tr);
  }
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
