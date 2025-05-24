const User = require('../models/User');

exports.connectWallet = async (req, res) => {
  const userId = req.user.id;
  const { walletAddress } = req.body;
  if (!walletAddress) return res.status(400).json({ error: 'Wallet required' });
  await User.findByIdAndUpdate(userId, { walletAddress });
  res.status(200).json({ success: true });
};
