const ContractKit = require('@celo/contractkit');

// Set up the provider with your Celo network details and wallet mnemonic
const kit = ContractKit.newKit('https://alfajores-forno.celo-testnet.org');
const mnemonic = 'goose abstract unhappy style elegant pitch enrich theme fish man angry quarter pole size voyage kitchen ghost soul control ski burst during pony blouse';

async function init() {
  const wallet = kit.wallet.fromMnemonic(mnemonic);
  kit.connection.addAccount(wallet);
}

init()
  .then(() => {
    console.log('Celo connection successful');
  })
  .catch(error => {
    console.error('Failed to initialize Celo connection:', error);
  });

const contractABI = require('./path/to/TreeNFT.json').abi;
const contractAddress = '0xf572EB2839B769aECa7b317704E7545b2dC01Dae';
const contract = new kit.web3.eth.Contract(contractABI, contractAddress);

async function getTreeInfo(tokenId) {
  const result = await contract.methods.getTreeInfo(tokenId).call();
  const [species, age, location, proofOfPlant, proofOfLife] = result;
  return { species, age, location, proofOfPlant, proofOfLife };
}

// Usage example
getTreeInfo(1)
  .then(treeInfo => {
    console.log(treeInfo);
  })
  .catch(error => {
    console.error(error);
  });

async function updateTreeInfo(tokenId, newSpecies, newAge, newLocation, newProofOfPlant, newProofOfLife) {
  const accounts = await kit.web3.eth.getAccounts();
  const result = await contract.methods
    .updateTreeInfo(tokenId, newSpecies, newAge, newLocation, newProofOfPlant, newProofOfLife)
    .send({ from: accounts[0] });

  // Wait for the transaction to be mined
  await result.transactionConfirmation;

  // Emit the updated treeInfo
  const updatedTreeInfo = {
    species: newSpecies,
    age: newAge,
    location: newLocation,
    proofOfPlant: newProofOfPlant,
    proofOfLife: newProofOfLife,
  };

  return updatedTreeInfo;
}

// Usage example
updateTreeInfo(1, 'New species', 5, 'New location', 'New proof of plant', 'New proof of life')
  .then(updatedTreeInfo => {
    console.log(updatedTreeInfo);
  })
  .catch(error => {
    console.error(error);
  });
