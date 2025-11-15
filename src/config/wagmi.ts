import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { mainnet, base, polygon, optimism, arbitrum } from 'wagmi/chains';
import { QueryClient } from '@tanstack/react-query';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

const metadata = {
  name: 'Web3 Wallet Connect',
  description: 'Connect your wallet to interact with Web3',
  url: 'https://web3app.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, base, polygon, optimism, arbitrum] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

export const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#3b82f6',
    '--w3m-border-radius-master': '8px'
  }
});
