import React, { useState, useEffect } from 'react';
import { WalletService } from '../services/wallet';

interface WalletManagerProps {
  onWalletCreated: () => void;
}

export const WalletManager: React.FC<WalletManagerProps> = ({ onWalletCreated }) => {
  const [walletService, setWalletService] = useState<WalletService | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const initWallet = async () => {
      try {
        const service = new WalletService();
        setWalletService(service);
        const address = await service.signer.getAddress();
        const balance = await service.getBalance(address);
        setBalance(balance);
      } catch (err) {
        setError('Failed to initialize wallet');
      }
    };

    initWallet();
  }, []);

  const handleCreateWallet = async () => {
    if (!walletService) return;
    
    setLoading(true);
    setError('');
    
    try {
      await walletService.createWallet();
      onWalletCreated();
    } catch (err) {
      setError('Failed to create wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleSendTokens = async () => {
    if (!walletService || !recipient || !amount) return;
    
    setLoading(true);
    setError('');
    
    try {
      await walletService.sendTokens(recipient, amount);
      const address = await walletService.signer.getAddress();
      const newBalance = await walletService.getBalance(address);
      setBalance(newBalance);
      setRecipient('');
      setAmount('');
    } catch (err) {
      setError('Failed to send tokens');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Wallet Manager</h2>
      
      <div className="mb-4">
        <p className="text-gray-600">Balance: {balance} USDC</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleCreateWallet}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Wallet'}
        </button>

        <div className="space-y-2">
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient Address"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleSendTokens}
            disabled={loading || !recipient || !amount}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Tokens'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}; 