# MiladyCity

A decentralized gaming ecosystem combining a web-based 3D character creator with an Unreal Engine mobile MMO.

## Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  React Creator  │────▶│   Smart Contract │────▶│   IPFS Storage  │
│  (Three.js)     │     │   (Base L2)      │     │   (NFT.Storage) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  Vercel Login   │────▶│  Unreal Engine  │
│  (Web3Auth)     │     │  (Mobile MMO)   │
└─────────────────┘     └─────────────────┘
```

## Components

- **src/** - React Three Fiber character creator
- **contracts/** - Solidity smart contract (ERC721)
- **vercel-login/** - Web3Auth login page for Unreal
- **unreal/** - C++ source for UE5 integration

## Quick Start
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- `VITE_WEB3AUTH_CLIENT_ID` - Web3Auth dashboard
- `VITE_NFT_STORAGE_KEY` - NFT.Storage API key
- `VITE_CONTRACT_ADDRESS` - Deployed contract address

## License

MIT
