import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { ethers } from 'ethers';
import { ExternalProvider } from '@ethersproject/providers';

interface ValidationResultProps {
  isValid: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

export function ValidationResult({ isValid, onClose }: ValidationResultProps) {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [transactionUrl, setTransactionUrl] = useState<string>('');

  const networkConfig = {
    chainId: '0xa045c',
    rpcUrl: 'https://open-campus-codex-sepolia.drpc.org',
    currencySymbol: 'EDU',
    explorerUrl: 'https://edu-chain-testnet.blockscout.com/tx/',
    contractAddress: '0x62559c2D560C2B5f71b29f626729dDa1341295ab',
  };

  const handleClaimRewards = async () => {
    try {
      setIsProcessing(true);
  
      if (!window.ethereum) {
        alert('MetaMask not detected. Please install MetaMask to continue.');
        setIsProcessing(false);
        return;
      }
  
      console.log('window.ethereum:', window.ethereum);
  
      const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
  
      const network = await provider.getNetwork();
      if (`0x${network.chainId.toString(16)}` !== networkConfig.chainId) {
        alert('Please switch to the Open Campus Codex Sepolia network in MetaMask.');
        setIsProcessing(false);
        return;
      }
  
      const contractAbi = [
        'function transferTokens(address recipient) public returns (bool)',
      ];
      const contract = new ethers.Contract(
        networkConfig.contractAddress,
        contractAbi,
        signer
      );
  
      const transaction = await contract.transferTokens(walletAddress);
      const receipt = await transaction.wait();
  
      setTransactionUrl(`${networkConfig.explorerUrl}${receipt.transactionHash}`);
      alert('Transaction successful!');
    } catch (error) {
      console.error('Error during transaction:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          {isValid ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Yoga Pose Validated! Congrats!
              </h3>
              <p className="text-gray-400 mb-6">
                Your pose has been verified. Enter your wallet address to claim your rewards.
              </p>
              <input
                type="text"
                placeholder="Enter Your Wallet Address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4 focus:outline-none focus:border-purple-500"
              />
              <button
                className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                onClick={handleClaimRewards}
                disabled={isProcessing || !walletAddress}
              >
                {isProcessing ? 'Processing...' : 'Claim Rewards'}
              </button>
              {transactionUrl && (
                <p className="text-green-500 mt-4">
                  Transaction successful!{' '}
                  <a
                    href={transactionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    View on Block Explorer
                  </a>
                </p>
              )}
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Invalid Yoga Pose. Try Again!
              </h3>
              <p className="text-gray-400 mb-6">
                Please ensure you're performing the pose correctly and try uploading again.
              </p>
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
