# 🚀 WhatSwap — WhatsApp-Based Crypto Payment System

**WhatSwap** lets users send and receive cryptocurrency through **WhatsApp** — blending the familiarity of chat with the power of Ethereum and Web3.

Inspired by Poland's BLIK and WhatsApp Pay, **WhatSwap** eliminates friction from crypto payments by using your **chat identity**.

---

## 🌍 Why WhatSwap?

Millions of users hesitate to use crypto due to:
- Long, complex wallet addresses
- Confusing UIs and wallet management
- Lack of real-world adoption in daily communication

**WhatSwap fixes that.**  
Send ETH directly through WhatsApp chat — no wallet address needed.

---

## 🧠 How It Works

1. **Start WhatsApp Chat**  
   Send a message (like "Hi") to the WhatSwap bot.

2. **Verify via OTP**  
   The bot replies with an OTP to confirm your WhatsApp number.

3. **Connect Wallet**  
   After verification, you receive a secure link to connect MetaMask or WalletConnect.

4. **Send ETH via WhatsApp**  
   Simply message:  
   `Send 0.05 ETH to +1234567890`  
   The bot processes it and sends the crypto.

5. **Claim if Unregistered**  
   If the recipient isn’t onboarded yet, they get a WhatsApp message with a secure claim link to connect their wallet and receive the funds.

---

## 🔐 Security Features

- WhatsApp number verification via OTP
- JWT-based session authentication
- Rate-limiting on message processing
- Wallets remain client-side only
- Private keys never stored or exposed

---

## 💼 Tech Stack

| Layer       | Technology                           |
|-------------|---------------------------------------|
| Frontend    | React + Vite + TypeScript             |
| Wallets     | MetaMask (ethers.js)                  |
| Backend     | Node.js + Express                     |
| Messaging   | Twilio WhatsApp API                   |
| Auth        | JWT + OTP                             |
| Database    | MongoDB (Atlas or local)              |
| Blockchain  | Ethereum via Infura/Alchemy/MetaMask  |

---

## 🔧 Setup & Running

### 1. Clone and install

```bash
git clone https://github.com/your-username/whatswap.git
cd whatswap/backend
npm install
