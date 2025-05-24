import { ethers } from 'ethers';
import { Forwarder__factory, ChatWallet__factory } from '../../../typechain-types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface ForwardRequest {
  from: string;
  to: string;
  value: string;
  gas: string;
  nonce: string;
  data: string;
  validUntil: string;
}

export class WalletService {
  private provider: ethers.Provider;
  private signer: ethers.Signer;
  private forwarder: ReturnType<typeof Forwarder__factory.connect>;
  private chatWallet: ReturnType<typeof ChatWallet__factory.connect>;

  constructor() {
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = new ethers.JsonRpcSigner(this.provider, window.ethereum.selectedAddress);
    
    this.forwarder = Forwarder__factory.connect(
      process.env.REACT_APP_FORWARDER_ADDRESS!,
      this.signer
    );
    
    this.chatWallet = ChatWallet__factory.connect(
      process.env.REACT_APP_CHAT_WALLET_ADDRESS!,
      this.signer
    );
  }

  async getNonce(address: string): Promise<string> {
    const response = await fetch(`${API_URL}/api/nonce/${address}`);
    const data = await response.json();
    return data.nonce;
  }

  async getBalance(address: string): Promise<string> {
    const response = await fetch(`${API_URL}/api/balance/${address}`);
    const data = await response.json();
    return data.balance;
  }

  async createWallet(): Promise<void> {
    const nonce = await this.getNonce(await this.signer.getAddress());
    
    const request: ForwardRequest = {
      from: await this.signer.getAddress(),
      to: process.env.REACT_APP_CHAT_WALLET_ADDRESS!,
      value: '0',
      gas: '100000',
      nonce,
      data: this.chatWallet.interface.encodeFunctionData('createWallet'),
      validUntil: '0'
    };

    const signature = await this.signer.signTypedData(
      {
        name: 'Forwarder',
        version: '1',
        chainId: await this.signer.getChainId(),
        verifyingContract: process.env.REACT_APP_FORWARDER_ADDRESS!
      },
      {
        ForwardRequest: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'gas', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'data', type: 'bytes' },
          { name: 'validUntil', type: 'uint256' }
        ]
      },
      request
    );

    const response = await fetch(`${API_URL}/api/relay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ request, signature })
    });

    if (!response.ok) {
      throw new Error('Failed to create wallet');
    }
  }

  async sendTokens(to: string, amount: string): Promise<void> {
    const nonce = await this.getNonce(await this.signer.getAddress());
    
    const request: ForwardRequest = {
      from: await this.signer.getAddress(),
      to: process.env.REACT_APP_CHAT_WALLET_ADDRESS!,
      value: '0',
      gas: '100000',
      nonce,
      data: this.chatWallet.interface.encodeFunctionData('send', [to, amount]),
      validUntil: '0'
    };

    const signature = await this.signer.signTypedData(
      {
        name: 'Forwarder',
        version: '1',
        chainId: await this.signer.getChainId(),
        verifyingContract: process.env.REACT_APP_FORWARDER_ADDRESS!
      },
      {
        ForwardRequest: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'gas', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'data', type: 'bytes' },
          { name: 'validUntil', type: 'uint256' }
        ]
      },
      request
    );

    const response = await fetch(`${API_URL}/api/relay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ request, signature })
    });

    if (!response.ok) {
      throw new Error('Failed to send tokens');
    }
  }
} 