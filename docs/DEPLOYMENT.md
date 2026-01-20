# Deployment Guide

## React App (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy to Vercel
npx vercel --prod

# Or Netlify
npx netlify deploy --prod --dir=dist
```

## Login Page (Vercel)
```bash
cd vercel-login
npx vercel --prod
```

Update `AuthService.cpp` with your deployed URL:
```cpp
LoginURL = TEXT("https://your-app.vercel.app");
```

## Smart Contract (Foundry)
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Initialize project
cd contracts
forge init --no-commit

# Install OpenZeppelin
forge install OpenZeppelin/openzeppelin-contracts --no-commit

# Deploy to Base
forge create src/MiladyCity.sol:MiladyCity \
  --rpc-url https://mainnet.base.org \
  --private-key $PRIVATE_KEY \
  --verify
```

## Environment Setup

### Web3Auth
1. Go to https://dashboard.web3auth.io
2. Create new project
3. Add your domains to whitelist
4. Copy Client ID to `.env`

### NFT.Storage
1. Go to https://nft.storage
2. Create account and API key
3. Copy key to `.env`

## Unreal Engine

1. Copy files from `unreal/Source/` to your UE5 project's `Source/` folder
2. Add to your `.Build.cs`:
```csharp
PublicDependencyModuleNames.AddRange(new string[] { "HTTP", "Json", "JsonUtilities" });
```
3. Configure iOS URL scheme in `Info.plist`:
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>miladycity</string>
    </array>
  </dict>
</array>
```

## Checklist

- [ ] Deploy React app
- [ ] Deploy login page
- [ ] Deploy smart contract
- [ ] Update contract address in `.env`
- [ ] Update login URL in Unreal
- [ ] Configure URL scheme in Unreal
- [ ] Test full auth flow
- [ ] Test minting flow
