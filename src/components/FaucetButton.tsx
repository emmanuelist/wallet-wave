import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { FAUCET_ABI, FAUCET_ADDRESS } from '../config/faucet';
import { formatEther } from 'viem';
import { Droplet, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FaucetButtonProps {
  onToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export function FaucetButton({ onToast }: FaucetButtonProps) {
  const { address, isConnected } = useAccount();
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Check if user can claim
  const { data: claimStatus, refetch: refetchClaimStatus } = useReadContract({
    address: FAUCET_ADDRESS,
    abi: FAUCET_ABI,
    functionName: 'canClaim',
    args: address ? [address] : undefined,
  });

  // Get claim amount
  const { data: claimAmount } = useReadContract({
    address: FAUCET_ADDRESS,
    abi: FAUCET_ABI,
    functionName: 'claimAmount',
  });

  // Get faucet balance
  const { data: faucetBalance } = useReadContract({
    address: FAUCET_ADDRESS,
    abi: FAUCET_ABI,
    functionName: 'getBalance',
  });

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [eligible, timeRemainingBigInt] = claimStatus || [false, 0n];

  // Update countdown timer
  useEffect(() => {
    if (timeRemainingBigInt) {
      setTimeRemaining(Number(timeRemainingBigInt));
      
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            refetchClaimStatus();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemainingBigInt, refetchClaimStatus]);

  // Handle transaction states
  useEffect(() => {
    if (isConfirmed) {
      onToast('Successfully claimed 0.01 ETH! 🎉', 'success');
      refetchClaimStatus();
    }
  }, [isConfirmed, onToast, refetchClaimStatus]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.message.includes('ClaimTooSoon')
        ? 'You need to wait 24 hours between claims'
        : error.message.includes('InsufficientBalance')
        ? 'Faucet is empty. Please try again later.'
        : 'Claim failed. Please try again.';
      onToast(errorMessage, 'error');
    }
  }, [error, onToast]);

  const handleClaim = () => {
    if (!eligible) {
      onToast('You cannot claim yet. Please wait.', 'error');
      return;
    }

    writeContract({
      address: FAUCET_ADDRESS,
      abi: FAUCET_ABI,
      functionName: 'claim',
    });
    onToast('Sending claim transaction...', 'info');
  };

  if (!isConnected || !address) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const isProcessing = isPending || isConfirming;
  const canClaimNow = eligible && !isProcessing;

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Faucet Info Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-cyan-500/20">
            <Droplet className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Base Sepolia Faucet</h3>
            <p className="text-gray-400 text-sm">Claim testnet ETH every 24 hours</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
            <span className="text-gray-400 text-sm">Claim Amount</span>
            <span className="text-white font-semibold">
              {claimAmount ? formatEther(claimAmount) : '0.01'} ETH
            </span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
            <span className="text-gray-400 text-sm">Faucet Balance</span>
            <span className="text-white font-semibold">
              {faucetBalance ? formatEther(faucetBalance) : '0'} ETH
            </span>
          </div>

          {!canClaimNow && timeRemaining > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm">
                Next claim in: <strong>{formatTime(timeRemaining)}</strong>
              </span>
            </div>
          )}

          {isConfirmed && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">
                Claim successful!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Claim Button */}
      <button
        onClick={handleClaim}
        disabled={!canClaimNow}
        className={`
          w-full py-4 px-6 rounded-xl font-semibold text-white text-lg
          transition-all duration-300 flex items-center justify-center gap-3
          ${canClaimNow
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50'
            : 'bg-gray-500/20 cursor-not-allowed opacity-50'
          }
        `}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {isPending ? 'Confirming in wallet...' : 'Processing claim...'}
          </>
        ) : (
          <>
            <Droplet className="w-5 h-5" />
            {canClaimNow ? 'Claim 0.01 ETH' : 'Cannot Claim Yet'}
          </>
        )}
      </button>

      {/* Contract Info */}
      <div className="text-center">
        <p className="text-gray-500 text-xs">
          Contract:{' '}
          <a
            href={`https://sepolia.basescan.org/address/${FAUCET_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {FAUCET_ADDRESS.slice(0, 6)}...{FAUCET_ADDRESS.slice(-4)}
          </a>
        </p>
      </div>
    </div>
  );
}
