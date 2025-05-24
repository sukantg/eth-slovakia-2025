import { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const WalletStatus = () => {
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    const [acc] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAddress(acc);
    await axios.post('/wallet/connect', { walletAddress: acc }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    });
  };

  return (
    <div>
      <button onClick={connect}>Connect Wallet</button>
      <p>Wallet: {address}</p>
    </div>
  );
};

export default WalletStatus;
