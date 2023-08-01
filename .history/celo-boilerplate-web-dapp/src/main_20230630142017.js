const ContractKit = require('@celo/contractkit');
const contractABI = require('./path/to/TreeNFT.json').abi;
const contractAddress = 'your contract address';


// Set up the provider with your Celo network details and wallet mnemonic
const kit = ContractKit.newKit('https://alfajores-forno.celo-testnet.org');
const mnemonic = 'your wallet mnemonic';

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

  const contract = new kit.web3.eth.Contract(contractABI, contractAddress);

