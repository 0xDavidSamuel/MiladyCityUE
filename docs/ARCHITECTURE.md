# Architecture

## Overview

MiladyCity uses a "trojan horse" approach - hiding Web3 complexity behind familiar social logins while building on decentralized infrastructure.

## Authentication Flow

1. User opens Unreal Engine game
2. Game opens Vercel-hosted login page in webview
3. User authenticates via Google/Apple/Email (Web3Auth)
4. Web3Auth creates/retrieves wallet automatically
5. Login page redirects to `miladycity://auth?wallet=0x...`
6. Unreal captures deep link, extracts wallet address
7. User is authenticated with wallet for blockchain interactions

## Character Creation Flow

1. User accesses React web app
2. Selects traits using 3D preview (Three.js)
3. Connects wallet via Web3Auth
4. Selections uploaded to IPFS as metadata
5. Trait hash generated for uniqueness check
6. Smart contract mints NFT with metadata URI
7. Character available in-game via wallet lookup

## Data Storage

| Data | Storage | Reason |
|------|---------|--------|
| Character metadata | IPFS | Decentralized, permanent |
| Trait ownership | Blockchain | Verifiable, tradeable |
| Game state | Game server | Performance |
| User preferences | Local | Privacy |

## Smart Contract

- ERC721 with URI storage
- Uniqueness enforcement via trait hashes
- Allowlist for early supporters
- Royalties for secondary sales
- Timelock on withdrawals

## Tech Stack

| Component | Technology |
|-----------|------------|
| Web Frontend | React, Three.js, Vite |
| State Management | Zustand |
| Authentication | Web3Auth |
| Storage | IPFS (NFT.Storage) |
| Blockchain | Ethereum (Base L2) |
| Smart Contract | Solidity, Foundry |
| Game Engine | Unreal Engine 5 |
| Mobile | iOS, Android |
