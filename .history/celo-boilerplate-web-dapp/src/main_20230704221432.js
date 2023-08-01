const Web3 = require('web3');
const TreeNFT = require('');
const { newKitFromWeb3 } = require('@celo/contractkit');

const ERC20_DECIMALS = 18

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
