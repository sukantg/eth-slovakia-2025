# 🚀 CryptoBlink — Phone-Based Crypto Payment System

CryptoBlink is a simple and secure crypto payment system that lets users send and receive cryptocurrency using just a **phone number** — inspired by Poland’s BLIK system, but powered by **Ethereum and Web3**.

---

## 🌍 Why CryptoBlink?

Millions of people are excluded from crypto because of:
- Long, confusing wallet addresses
- Complex interfaces
- Lack of trust and accessibility

**CryptoBlink solves that.**  
We make it possible to send ETH just by typing in someone’s phone number.

---

## 🧠 How It Works

1. **Login via SMS**  
   User enters their phone number → receives an SMS → clicks the login link.

2. **Connect Wallet**  
   After login, the user connects MetaMask or WalletConnect.

3. **Send ETH by Phone**  
   Type in the recipient’s phone number and amount → we handle the rest.

4. **Auto Claiming**  
   If the recipient is not yet registered, they get an SMS with a link to claim the funds after connecting a wallet.

---

## 🔐 Security Features

- JWT-based authentication
- SMS login tokens (expire in 5 minutes)
- Rate-limiting to prevent abuse
- Wallets handled client-side only
- Private keys never stored or exposed

---

## 💼 Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Frontend    | React + Vite + TypeScript            |
| Wallets     | MetaMask (ethers.js)                 |
| Backend     | Node.js + Express                    |
| Auth        | JWT + Twilio SMS                     |
| Database    | MongoDB (Atlas or local)             |
| Blockchain  | Ethereum via Infura/Alchemy/MetaMask |

---

## 🔧 Setup & Running

### 1. Clone and install

```bash
git clone https://github.com/your-username/cryptoblink.git
cd cryptoblink/backend
npm install
```

### 2. Configure `.env` (backend)

Create a `.env` file in `/backend`:

```env
PORT=5000
DATABASE_URL=your_mongo_connection_string
JWT_SECRET=super_secret_key

# Twilio
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890

# Ethereum
ETH_PROVIDER_URL=https://sepolia.infura.io/v3/your_id
PRIVATE_KEY=your_test_wallet_private_key
```

### 3. Start backend

```bash
node app.js
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Access: [http://localhost:5173](http://localhost:5173)

---

## 📸 Screenshots(need to do)

- Login screen (phone number input)
- Dashboard with wallet connection
- Send crypto by phone
- Confirmation modal

> Add screenshots here in markdown format or upload in repo’s `/assets`.

---

## 📊 Use Cases( need to do )

- Fast P2P payments for everyday users
- Donations by phone
- Remittances in developing countries
- Local merchant payment tool
- Emergency crypto transfers

---

## ✨ Roadmap

- [x] SMS login with Twilio
- [x] ETH transfer by phone number
- [x] MetaMask wallet integration
- [ ] On-chain escrow contract
- [ ] DAO-controlled community wallets
- [ ] iOS/Android version

---

## 🏆 For Hackathons

> CryptoBlink is designed for **mainstream adoption**, combining the simplicity of phone numbers with the power of Ethereum.

Use this in any **public goods**, **DeFi accessibility**, or **consumer-facing** category.

---

## 📫 Contact

Built with ❤️ by bratislava hackaton team 



---

