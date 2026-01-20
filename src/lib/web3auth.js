import { Web3Auth } from '@web3auth/modal'
import { CHAIN_NAMESPACES } from '@web3auth/base'

const clientId = import.meta.env.VITE_WEB3AUTH_CLIENT_ID

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: '0x1',
  rpcTarget: 'https://rpc.ankr.com/eth',
  displayName: 'Ethereum Mainnet',
  blockExplorer: 'https://etherscan.io',
  ticker: 'ETH',
  tickerName: 'Ethereum'
}

export const web3auth = new Web3Auth({
  clientId,
  chainConfig,
  uiConfig: {
    appName: 'MiladyCity',
    mode: 'dark',
    loginMethodsOrder: ['google', 'apple', 'email_passwordless']
  }
})

export async function initWeb3Auth() {
  await web3auth.initModal()
  return web3auth
}

export async function connect() {
  const provider = await web3auth.connect()
  return provider
}

export async function disconnect() {
  await web3auth.logout()
}

export async function getAccounts(provider) {
  const accounts = await provider.request({ method: 'eth_accounts' })
  return accounts[0]
}
