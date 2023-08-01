import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import BigNumber from "bignumber.js"

const ERC20_DECIMALS = 18

let kit
const connectCeloWallet = async function () {
  if (window.celo) {
    try {
      notification("⚠️ Please approve this DApp to use it.")
      await window.celo.enable()
      notificationOff()

      const web3 = new Web3(window.celo)
      kit = newKitFromWeb3(web3)

      const accounts = await kit.web3.eth.getAccounts()
      if (accounts.length === 0) {
        throw new Error('No account found')
      }
      kit.defaultAccount = accounts[0]
    } catch (error) {
      notification(`⚠️ ${error}.`)
      console.error(error)
    }
  } else {
    notification("⚠️ Please install the CeloExtensionWallet.")
  }
}

window.addEventListener('load', async () => {
  await connectCeloWallet()
  if (kit) {
    await getBalance()
  }
  notificationOff()
});
