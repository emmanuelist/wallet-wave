# 🌊 Wallet Wave - Web3 Wallet Connect App

A modern, production-ready React web application for connecting to Web3 wallets using WalletConnect's Web3Modal. Built with React, TypeScript, Wagmi, and Tailwind CSS. Includes deployable smart contracts for Base network!

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-18.3.1-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.6.2-3178c6.svg)](https://www.typescriptlang.org/)
[![Wagmi](https://img.shields.io/badge/wagmi-2.19.4-success.svg)](https://wagmi.sh/)

## 📖 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Quick Start](#-quick-start)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Smart Contracts](#-smart-contracts)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Frontend
- 🔗 **WalletConnect Integration** - Seamless wallet connection using @web3modal/wagmi v5
- 💼 **Wallet Management** - Display connected wallet address and native token balance
- 🌐 **Multi-Network Support** - Supports Ethereum, Base, Base Sepolia, Polygon, Optimism, and Arbitrum
- 🎯 **Base Network Focus** - Highlights Base network (Chain ID: 8453) with visual indicators
- 🔄 **Network Switching** - Easy one-click switch to Base network
- 🎨 **Modern UI** - Beautiful gradient backgrounds, glass morphism effects, and smooth animations
- 📱 **Fully Responsive** - Mobile-friendly design that works on all devices
- 🌙 **Dark Mode** - Sleek dark theme optimized for crypto apps
- 🔔 **Toast Notifications** - User-friendly feedback for all actions
- ⚡ **Loading States** - Skeleton screens for better UX
- ❌ **Error Handling** - Comprehensive error handling for connection failures

### Smart Contracts
- 💧 **TokenFaucet** - ETH faucet with time-based claims (24-hour intervals)
- 🎁 **MultiTokenFaucet** - Advanced faucet supporting multiple ERC20 tokens
- 🔒 **Security** - Owner-controlled parameters with modern Solidity patterns
- ⛽ **Gas Optimized** - Efficient contract design
- 📊 **Event Logging** - Comprehensive events for frontend integration
- ✅ **Verified** - Auto-verification on BaseScan after deployment

## 🎬 Live Demo

> **Note:** Replace with your deployed URL once live

### Screenshots

**Wallet Connection**
- Modern gradient UI with glass morphism effects
- Connect button with smooth animations
- Support for 20+ wallet providers

**Network Management**
- Real-time network detection
- One-click network switching
- Base network highlighting

**Faucet Interface** (Base Sepolia)
- Live contract data (balance, claim amount)
- Real-time countdown timer
- Transaction status tracking

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** and npm/yarn/pnpm installed
- **Git** for version control
- **A WalletConnect Cloud Project ID** - [Get one here](https://cloud.walletconnect.com/) (free)
- **MetaMask** or any Web3 wallet for testing
- (Optional) **Base Sepolia ETH** for testing the faucet - [Get from faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/emmanuelist/wallet-wave.git
cd wallet-wave
```

#### 2. Install Dependencies

```bash
npm install
```

This will install:
- React 18 + TypeScript
- Wagmi 2 + Viem for Web3 interactions
- Tailwind CSS for styling
- Web3Modal for wallet connections

#### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your WalletConnect Project ID:

```bash
# Required: Get from https://cloud.walletconnect.com/
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional: For smart contract deployment
PRIVATE_KEY=your_wallet_private_key_here
BASESCAN_API_KEY=your_basescan_api_key_here

# Optional: Custom RPC URLs
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASE_MAINNET_RPC_URL=https://mainnet.base.org

# Optional: After deploying faucet contract
VITE_FAUCET_CONTRACT_ADDRESS=0xYourContractAddress
```

**Security Warning:** Never commit your `.env` file or share your private key!

#### 4. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

#### 5. Connect Your Wallet

1. Click the "Connect Wallet" button
2. Choose your wallet provider (MetaMask, Coinbase Wallet, etc.)
3. Approve the connection in your wallet
4. You're ready to interact with the app!

### Quick Test

To verify everything works:

1. ✅ Connect your wallet
2. ✅ Check if your address and balance are displayed
3. ✅ Try switching to Base network
4. ✅ (Optional) Switch to Base Sepolia to test the faucet

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Wagmi 2** - React hooks for Ethereum
- **Viem** - TypeScript Ethereum library
- **@web3modal/wagmi** - WalletConnect's Web3Modal
- **@tanstack/react-query** - Async state management
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## 🎯 Available Scripts

### Frontend Development

```bash
npm run dev              # Start Vite dev server (http://localhost:5173)
npm run build            # Build for production (output: dist/)
npm run preview          # Preview production build locally
npm run lint             # Run ESLint to check code quality
npm run typecheck        # Run TypeScript compiler check (no emit)
```

### Smart Contract Development

```bash
# Compilation & Testing
npm run hardhat:compile  # Compile Solidity contracts
npm run hardhat:test     # Run contract tests (Mocha/Chai)

# Deployment
npm run deploy:sepolia   # Deploy to Base Sepolia testnet
npm run deploy:base      # Deploy to Base Mainnet

# Contract Interaction
npm run faucet:status    # Check faucet status (requires FAUCET_CONTRACT_ADDRESS env)
npm run faucet:claim     # Claim tokens from faucet

# Example usage:
FAUCET_CONTRACT_ADDRESS=0xYourAddress npm run faucet:status
```

### All Available Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `npm install` | Install all dependencies | First time setup |
| `npm run dev` | Start dev server with HMR | Development |
| `npm run build` | Production build | Deployment |
| `npm run preview` | Test production build | Pre-deployment |
| `npm run lint` | Lint JavaScript/TypeScript | Code quality |
| `npm run typecheck` | Check TypeScript types | Type safety |
| `npm run hardhat:compile` | Compile smart contracts | Contract dev |
| `npm run hardhat:test` | Test contracts | Contract dev |
| `npm run deploy:sepolia` | Deploy to testnet | Testing |
| `npm run deploy:base` | Deploy to mainnet | Production |
| `npm run faucet:status` | Check faucet info | Maintenance |
| `npm run faucet:claim` | Test claim function | Testing |

## 📁 Project Structure

```
wallet-wave/
├── src/
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # React entry point
│   ├── index.css                    # Global styles with animations
│   ├── components/
│   │   ├── WalletButton.tsx         # Connect/disconnect wallet
│   │   ├── WalletInfo.tsx           # Display address, balance, network
│   │   ├── FaucetButton.tsx         # Faucet interaction component
│   │   ├── Toast.tsx                # Notification system
│   │   └── LoadingSkeleton.tsx      # Loading placeholders
│   └── config/
│       ├── wagmi.ts                 # Web3Modal & Wagmi configuration
│       └── faucet.ts                # Faucet contract ABI and address
├── contracts/
│   ├── TokenFaucet.sol              # ETH faucet contract
│   ├── MultiTokenFaucet.sol         # Multi-token faucet
│   └── README.md                    # Contract documentation
├── scripts/
│   ├── deploy.js                    # Deployment script
│   ├── check-status.js              # Check faucet status
│   └── claim.js                     # Test claim function
├── hardhat.config.js                # Hardhat configuration
├── .env.example                     # Environment template
└── README.md                        # This file
```

For detailed structure information, see [STRUCTURE.md](./STRUCTURE.md)

## 🌐 Supported Networks

| Network | Chain ID | RPC URL | Explorer | Status |
|---------|----------|---------|----------|--------|
| Ethereum | 1 | Auto | etherscan.io | ✅ Supported |
| **Base** | **8453** | Auto | basescan.org | ⭐ **Featured** |
| **Base Sepolia** | **84532** | Auto | sepolia.basescan.org | ✅ **Testnet** |
| Polygon | 137 | Auto | polygonscan.com | ✅ Supported |
| Optimism | 10 | Auto | optimistic.etherscan.io | ✅ Supported |
| Arbitrum | 42161 | Auto | arbiscan.io | ✅ Supported |

### Adding More Networks

Edit `src/config/wagmi.ts`:

```typescript
import { mainnet, base, baseSepolia, polygon, optimism, arbitrum, yourChain } from 'wagmi/chains';

const chains = [mainnet, base, baseSepolia, polygon, optimism, arbitrum, yourChain] as const;
```

## 🎨 UI Features & Design

### Visual Elements
- **Gradient Backgrounds** - Dynamic, animated gradients with pulse effects
- **Glass Morphism** - Frosted glass effects with backdrop blur
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Loading Skeletons** - Animated placeholders during loading states
- **Toast Notifications** - Success, error, and info messages with auto-dismiss
- **Responsive Grid Layout** - Adapts seamlessly to all screen sizes
- **Visual Feedback** - Connection status indicators and network badges

### Accessibility
- Semantic HTML for better screen reader support
- Keyboard navigation friendly
- High contrast ratios for readability
- ARIA labels where appropriate

### Performance
- Code splitting with dynamic imports
- Optimized bundle size
- Fast Time to Interactive (TTI)
- Efficient re-renders with React.memo where needed

## 🔧 Configuration

### Customizing Networks

Edit `src/config/wagmi.ts` to add or remove networks:

```typescript
import { mainnet, base, polygon, yourChain } from 'wagmi/chains';

const chains = [mainnet, base, polygon, yourChain] as const;
```

### Styling Theme

Modify theme colors in `src/config/wagmi.ts`:

```typescript
themeVariables: {
  '--w3m-accent': '#3b82f6',  // Primary accent color
  '--w3m-border-radius-master': '8px'
}
```

## 📱 Mobile Support

The app is fully responsive and works seamlessly on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome, Firefox)
- Mobile wallets with built-in browsers (MetaMask Mobile, Coinbase Wallet)
- Tablet devices (iPad, Android tablets)

### Mobile Wallet Connection
1. Open the app in your mobile wallet's browser
2. Connection happens automatically
3. No QR code scanning needed!

## 💎 Smart Contracts

This project includes a **TokenFaucet** smart contract ready to deploy on Base network!

### Features
- Users can claim ETH at regular intervals
- Owner-controlled parameters
- Time-based claim restrictions
- Event logging for frontend integration

### Quick Deploy

1. **Install Hardhat dependencies:**
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
```

2. **Configure your `.env`:**
```bash
PRIVATE_KEY=your_wallet_private_key
BASESCAN_API_KEY=your_basescan_api_key
```

3. **Deploy to Base Sepolia (testnet):**
```bash
npm run deploy:sepolia
```

4. **Deploy to Base Mainnet:**
```bash
npm run deploy:base
```

5. **Check faucet status:**
```bash
FAUCET_CONTRACT_ADDRESS=0x... npm run faucet:status
```

📖 **Full documentation:** See [`contracts/README.md`](./contracts/README.md)

### Available Scripts
```bash
npm run hardhat:compile  # Compile contracts
npm run hardhat:test     # Run tests
npm run deploy:sepolia   # Deploy to Base Sepolia testnet
npm run deploy:base      # Deploy to Base Mainnet
npm run faucet:status    # Check faucet status
npm run faucet:claim     # Claim from faucet
```

## 🔗 Integrating the Contract

After deploying, integrate with your React app:

1. Add contract address to `.env`:
```bash
VITE_FAUCET_CONTRACT_ADDRESS=0xYourContractAddress
```

2. Create `src/config/faucet.ts`:
```typescript
export const FAUCET_ABI = [
  "function claim() external",
  "function canClaim(address) external view returns (bool, uint256)",
  "function getBalance() external view returns (uint256)",
] as const;

export const FAUCET_ADDRESS = import.meta.env.VITE_FAUCET_CONTRACT_ADDRESS;
```

3. Use in components:
```typescript
import { useWriteContract } from 'wagmi';
import { FAUCET_ABI, FAUCET_ADDRESS } from '../config/faucet';

function ClaimButton() {
  const { writeContract } = useWriteContract();
  
  const handleClaim = () => {
    writeContract({
      address: FAUCET_ADDRESS,
      abi: FAUCET_ABI,
      functionName: 'claim',
    });
  };
  
  return <button onClick={handleClaim}>Claim ETH</button>;
}
```

## � Deployment

### Frontend Deployment

#### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration

3. **Add environment variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add `VITE_WALLETCONNECT_PROJECT_ID`
   - Add `VITE_FAUCET_CONTRACT_ADDRESS` (if deployed)

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

#### Deploy to Netlify

1. **Build the project:**
```bash
npm run build
```

2. **Deploy dist folder:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

3. **Set environment variables in Netlify dashboard**

#### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Smart Contract Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for comprehensive instructions.

**Quick Deploy:**
```bash
npm run deploy:sepolia  # Testnet
npm run deploy:base     # Mainnet
```

## 🐛 Troubleshooting

### Common Issues

#### "Project ID is required"
**Problem:** WalletConnect Project ID not set

**Solution:**
```bash
# Check if .env exists
cat .env

# Make sure it contains:
VITE_WALLETCONNECT_PROJECT_ID=your_actual_project_id

# Restart dev server
npm run dev
```

#### "Cannot connect wallet"
**Problem:** Wallet connection failing

**Solutions:**
1. Clear browser cache and cookies
2. Try different wallet (MetaMask, Coinbase Wallet)
3. Check if wallet is unlocked
4. Disable browser extensions that might interfere
5. Try incognito/private mode

#### "Wrong network" message
**Problem:** Connected to unsupported network

**Solution:**
- Click the "Switch to Base" button in the app
- Or manually switch in your wallet to a supported network

#### "npm run deploy:sepolia fails"
**Problem:** Contract deployment error

**Solutions:**
1. **Check private key format:**
   ```bash
   # Should start with 0x
   PRIVATE_KEY=0xYourKeyHere
   ```

2. **Ensure you have Base Sepolia ETH:**
   ```bash
   # Get from faucet
   https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
   ```

3. **Check Hardhat installation:**
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
   ```

#### "Transaction failed" in faucet
**Problem:** Claim transaction reverted

**Possible causes:**
- ❌ Already claimed within 24 hours
- ❌ Faucet contract has insufficient balance
- ❌ Connected to wrong network (not Base Sepolia)

**Solution:**
```bash
# Check faucet status
FAUCET_CONTRACT_ADDRESS=0xYourAddress npm run faucet:status
```

#### TypeScript errors
**Problem:** Type checking fails

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Run type check
npm run typecheck
```

#### Build fails
**Problem:** Production build errors

**Solutions:**
1. Check all environment variables are set
2. Run `npm run typecheck` to find TypeScript issues
3. Check `npm run lint` for code quality issues
4. Ensure all dependencies are installed

### Getting Help

- 📖 Check [STRUCTURE.md](./STRUCTURE.md) for project organization
- 🔍 Search [GitHub Issues](https://github.com/emmanuelist/wallet-wave/issues)
- 💬 Join [Base Discord](https://discord.gg/buildonbase)
- 📚 Review [Wagmi Docs](https://wagmi.sh)
- 🌐 Check [WalletConnect Docs](https://docs.walletconnect.com/)

## ❓ FAQ

### General Questions

**Q: Do I need to deploy a smart contract to use this app?**
A: No! The app works perfectly without smart contracts. The faucet is an optional feature for testnet testing.

**Q: Can I use this on mainnet with real money?**
A: Yes, but please audit the smart contracts before deploying with significant funds.

**Q: Which wallets are supported?**
A: All WalletConnect-compatible wallets: MetaMask, Coinbase Wallet, Rainbow, Trust Wallet, Ledger, and 150+ more.

**Q: Is this free to use?**
A: Yes! The code is MIT licensed. WalletConnect has a free tier for up to 10k users/month.

### Development Questions

**Q: How do I add a new network?**
A: Edit `src/config/wagmi.ts` and add your chain from `wagmi/chains`:
```typescript
import { myChain } from 'wagmi/chains';
const chains = [mainnet, base, myChain] as const;
```

**Q: Can I customize the UI colors?**
A: Yes! Edit `src/config/wagmi.ts` themeVariables and `tailwind.config.js` for colors.

**Q: How do I add more contract functions?**
A: 
1. Add function to `FAUCET_ABI` in `src/config/faucet.ts`
2. Use `useReadContract` or `useWriteContract` in your component
3. See [Wagmi docs](https://wagmi.sh) for examples

**Q: Can I use this with my existing smart contract?**
A: Absolutely! Just update `src/config/faucet.ts` with your contract's ABI and address.

### Deployment Questions

**Q: Where should I deploy the frontend?**
A: Vercel (recommended), Netlify, or GitHub Pages all work great.

**Q: How much does deployment cost?**
A: Frontend: Free (Vercel/Netlify). Smart contracts: ~$0.50-$2 on Base Sepolia testnet.

**Q: Can I deploy to mainnet?**
A: Yes, but ensure you:
1. Audit your smart contracts
2. Test thoroughly on testnet first
3. Start with small amounts
4. Have proper error handling

**Q: How do I update my deployed contract?**
A: Smart contracts are immutable. You'll need to:
1. Deploy a new contract version
2. Update `VITE_FAUCET_CONTRACT_ADDRESS` in `.env`
3. Redeploy your frontend

### Smart Contract Questions

**Q: Can users claim multiple times?**
A: Yes, but only once every 24 hours (configurable by owner).

**Q: How do I fund the faucet contract?**
A: 
```bash
# Method 1: During deployment (automatic)
npm run deploy:sepolia

# Method 2: Send ETH directly to contract address
# Method 3: Call deposit() function
```

**Q: Can I change the claim amount after deployment?**
A: Yes! The owner can call `updateClaimAmount()` function.

**Q: Is the contract upgradeable?**
A: No, these contracts are not upgradeable for security/simplicity. Deploy a new version if needed.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

1. 🐛 **Report Bugs** - Open an issue with details
2. 💡 **Suggest Features** - Share your ideas
3. 📖 **Improve Docs** - Fix typos, add examples
4. 🔧 **Submit PRs** - Fix bugs or add features
5. ⭐ **Star the Repo** - Show your support!

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/wallet-wave.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Test thoroughly: `npm run typecheck && npm run lint`
6. Commit: `git commit -m "feat: add your feature"`
7. Push: `git push origin feature/your-feature`
8. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow existing code patterns
- Add comments for complex logic
- Write descriptive commit messages
- Test on multiple browsers/wallets

## 📄 License

MIT License - feel free to use this project for your own purposes.

See [LICENSE](./LICENSE) file for details.

## �🙏 Acknowledgments

Special thanks to:

- [WalletConnect](https://walletconnect.com/) for the Web3Modal SDK
- [Wagmi](https://wagmi.sh/) for the amazing React hooks
- [Viem](https://viem.sh/) for the TypeScript Ethereum library
- [Base](https://base.org/) for the incredible L2 network
- [Hardhat](https://hardhat.org/) for smart contract development tools
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support & Community

- 🐦 Twitter: [@base](https://twitter.com/base)
- 💬 Discord: [Base Discord](https://discord.gg/buildonbase)
- 📚 Docs: [Base Documentation](https://docs.base.org)
- 🌐 Website: [base.org](https://base.org)

## 🗺️ Roadmap

### Current Features ✅
- [x] Wallet connection with Web3Modal
- [x] Multi-network support
- [x] TokenFaucet smart contract
- [x] Real-time contract interaction
- [x] Responsive UI with animations
- [x] Toast notifications
- [x] Network switching

### Planned Features 🔮
- [ ] Transaction history display
- [ ] ENS name resolution
- [ ] NFT gallery integration
- [ ] Token swap functionality
- [ ] Multi-signature wallet support
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard

Want to help build these? [Contribute!](#-contributing)

---

<div align="center">

**Built with ❤️ for the Web3 community**

Made with React, TypeScript, and Base

⭐ Star this repo if you found it helpful!

[Report Bug](https://github.com/emmanuelist/wallet-wave/issues) · [Request Feature](https://github.com/emmanuelist/wallet-wave/issues) · [View Demo](#)

</div>
