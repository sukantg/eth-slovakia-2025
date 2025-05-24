require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('./middlewares/rateLimit');
const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallet');
const transferRoutes = require('./routes/transfer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimit);

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('Mongo connected'));

app.use('/auth', authRoutes);
app.use('/wallet', walletRoutes);
app.use('/transfer', transferRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
