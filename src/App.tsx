import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { config, queryClient } from './config/wagmi';
import { WalletButton } from './components/WalletButton';
import { WalletInfo } from './components/WalletInfo';
import { FaucetButton } from './components/FaucetButton';
import { Toast } from './components/Toast';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { useAccount, useChainId } from 'wagmi';
import { useState } from 'react';
import { Waves } from 'lucide-react';
import { baseSepolia } from 'wagmi/chains';

function WalletApp() {
  const { isConnected, isConnecting } = useAccount();
  const chainId = useChainId();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const isBaseSepolia = chainId === baseSepolia.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bS0yIDJoLTJ2Mmgydi0yem0tMiAyaC0ydjJoMnYtMnptMi0yaDJ2LTJoLTJ2MnptMi0yaDJ2LTJoLTJ2MnptLTItMmgtMnYyaDJ2LTJ6bTItMmgydi0yaC0ydjJ6bS0yLTJoLTJ2Mmgydi0yem0tNC00aDJ2LTJoLTJ2MnptLTIgMmgydi0yaC0ydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-white/10 mb-6 animate-float">
            <Waves className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
            Web3 Wallet
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Connect your wallet to interact with decentralized applications on multiple networks
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 w-full">
          <WalletButton />

          {isConnecting && <LoadingSkeleton />}
          {isConnected && (
            <>
              <WalletInfo onToast={showToast} />
              {isBaseSepolia ? (
                <FaucetButton onToast={showToast} />
              ) : (
                <div className="w-full max-w-md p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/20">
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/20">
                      <Waves className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">Faucet Available on Base Sepolia</h3>
                    <p className="text-gray-400 text-sm">
                      Switch to Base Sepolia testnet to claim free testnet ETH
                    </p>
                    <div className="pt-2">
                      <span className="text-xs text-gray-500">
                        Current network: <strong className="text-white">{chainId === 8453 ? 'Base Mainnet' : `Chain ${chainId}`}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-12 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 max-w-md">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
            <span>{isConnected ? 'Connected' : 'Not Connected'}</span>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletApp />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
