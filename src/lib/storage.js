import { NFTStorage, File } from 'nft.storage'

const client = new NFTStorage({ token: import.meta.env.VITE_NFT_STORAGE_KEY })

export async function uploadMetadata(selections, wallet) {
  const traits = Object.entries(selections)
    .filter(([_, value]) => value !== null)
    .map(([trait_type, value]) => ({ trait_type, value }))

  const metadata = {
    name: `MiladyCity Player #${Date.now()}`,
    description: 'A MiladyCity player character',
    image: 'ipfs://PLACEHOLDER',
    attributes: traits,
    owner: wallet
  }

  const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  const cid = await client.storeBlob(blob)
  
  return `ipfs://${cid}`
}

export function generateTraitHash(selections) {
  const ordered = Object.keys(selections)
    .sort()
    .map((key) => selections[key] || 'none')
    .join('|')
  
  return btoa(ordered)
}
