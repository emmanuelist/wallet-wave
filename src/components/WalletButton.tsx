import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';
import { useState } from 'react';

export function WalletButton() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
          <p className="text-sm text-gray-300">{formatAddress(address)}</p>
        </div>
        <button
          onClick={() => disconnect()}
          className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/20"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4 text-red-400" />
            <span className="text-white font-medium">Disconnect</span>
          </div>
        </button>
      </div>
    );
  }

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      await open();
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <div className="flex items-center gap-3">
        <Wallet className={`w-5 h-5 text-white ${isConnecting ? 'animate-pulse' : ''}`} />
        <span className="text-white font-semibold text-lg">
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </span>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-white/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </button>
  );
}
