import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { Wallet, Coins, Network, ArrowRightLeft } from 'lucide-react';
import { base } from 'wagmi/chains';
import { useState } from 'react';

interface WalletInfoProps {
  onToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export function WalletInfo({ onToast }: WalletInfoProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });
  const { switchChain } = useSwitchChain();
  const [isSwitching, setIsSwitching] = useState(false);

  if (!isConnected) return null;

  const isBaseNetwork = chainId === base.id;

  const getChainName = (id: number) => {
    const chains: Record<number, string> = {
      1: 'Ethereum',
      8453: 'Base',
      137: 'Polygon',
      10: 'Optimism',
      42161: 'Arbitrum'
    };
    return chains[id] || `Chain ${id}`;
  };

  const handleSwitchToBase = async () => {
    try {
      setIsSwitching(true);
      onToast('Switching to Base network...', 'info');
      await switchChain({ chainId: base.id });
      setTimeout(() => {
        onToast('Successfully switched to Base!', 'success');
        setIsSwitching(false);
      }, 1000);
    } catch (error: any) {
      console.error('Failed to switch network:', error);
      const errorMessage = error?.message?.includes('rejected')
        ? 'Network switch rejected by user'
        : 'Failed to switch network. Please try again.';
      onToast(errorMessage, 'error');
      setIsSwitching(false);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Wallet className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Wallet Address</h3>
          </div>
          <p className="text-white font-mono text-sm break-all">{address}</p>
        </div>

        <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Coins className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Balance</h3>
          </div>
          <p className="text-white font-semibold text-xl">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Network className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Network</h3>
          </div>
          {isBaseNetwork && (
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/50 text-blue-400 text-xs font-medium animate-pulse">
              Base Network
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white font-semibold text-lg">{getChainName(chainId)}</p>
          {!isBaseNetwork && (
            <button
              onClick={handleSwitchToBase}
              disabled={isSwitching}
              className="group relative px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-2">
                <ArrowRightLeft className={`w-4 h-4 text-blue-400 ${isSwitching ? 'animate-spin' : ''}`} />
                <span className="text-blue-400 font-medium text-sm">Switch to Base</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
