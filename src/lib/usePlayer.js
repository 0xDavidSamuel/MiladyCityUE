import { useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { useStore } from './store'
import { web3auth, connect, getAccounts } from './web3auth'
import { uploadMetadata, generateTraitHash } from './storage'

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS

const CONTRACT_ABI = [
  'function mint(string memory tokenURI) public payable',
  'function mintPrice() public view returns (uint256)'
]

export function usePlayer() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { selections, wallet, setWallet } = useStore()

  const connectWallet = useCallback(async () => {
    try {
      setLoading(true)
      const provider = await connect()
      const address = await getAccounts(provider)
      setWallet(address)
      return address
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [setWallet])

  const mintPlayer = useCallback(async () => {
    try {
      setLoading(true)
      
      if (!wallet) {
        await connectWallet()
      }

      const tokenURI = await uploadMetadata(selections, wallet)
      
      const provider = new ethers.BrowserProvider(web3auth.provider)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      
      const mintPrice = await contract.mintPrice()
      const tx = await contract.mint(tokenURI, { value: mintPrice })
      await tx.wait()

      return tx.hash
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [wallet, selections, connectWallet])

  return {
    loading,
    error,
    wallet,
    connectWallet,
    mintPlayer,
    traitHash: generateTraitHash(selections)
  }
}
