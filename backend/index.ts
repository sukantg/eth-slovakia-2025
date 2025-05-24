import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import { config } from 'dotenv';
import twilio from 'twilio';
import { Forwarder__factory, ChatWallet__factory } from '../typechain-types';

config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Initialize provider and contracts
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY!, provider);

const forwarder = Forwarder__factory.connect(
  process.env.FORWARDER_ADDRESS!,
  wallet
);

const chatWallet = ChatWallet__factory.connect(
  process.env.CHAT_WALLET_ADDRESS!,
  wallet
);

// Store temporary auth codes
const authCodes = new Map<string, { code: string; expires: number }>();

// Endpoint to initiate WhatsApp authentication
app.post('/api/auth/whatsapp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

    authCodes.set(phoneNumber, { code, expires });

    // Send WhatsApp message
    await twilioClient.messages.create({
      body: `Your CryptoBlink verification code is: ${code}. This code will expire in 5 minutes.`,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phoneNumber}`
    });

    res.json({ success: true });
  } catch (error) {
    console.error('WhatsApp auth error:', error);
    res.status(500).json({ error: 'Failed to send verification code' });
  }
});

// Endpoint to verify WhatsApp code
app.post('/api/auth/verify', async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;
    const storedAuth = authCodes.get(phoneNumber);

    if (!storedAuth || storedAuth.code !== code || Date.now() > storedAuth.expires) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }

    // Clear the used code
    authCodes.delete(phoneNumber);

    // Generate JWT token
    const token = generateToken(phoneNumber);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify code' });
  }
});

// Endpoint to get user's nonce
app.get('/api/nonce/:address', async (req, res) => {
  try {
    const nonce = await forwarder.getNonce(req.params.address);
    res.json({ nonce: nonce.toString() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get nonce' });
  }
});

// Endpoint to relay meta-transactions
app.post('/api/relay', async (req, res) => {
  try {
    const { request, signature } = req.body;
    
    // Verify the request
    const isValid = await forwarder.verify(request, signature);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Execute the meta-transaction
    const tx = await forwarder.execute(request, signature);
    await tx.wait();

    res.json({ success: true, hash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: 'Failed to relay transaction' });
  }
});

// Endpoint to get user's balance
app.get('/api/balance/:address', async (req, res) => {
  try {
    const balance = await chatWallet.balance(req.params.address);
    res.json({ balance: balance.toString() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get balance' });
  }
});

// Helper function to generate JWT token
function generateToken(phoneNumber: string): string {
  // Implement JWT token generation here
  // You should use a proper JWT library like jsonwebtoken
  return 'dummy-token'; // Replace with actual JWT implementation
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
