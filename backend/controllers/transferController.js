const User = require('../models/User');
const web3Service = require('../services/web3Service');

exports.sendFunds = async (req, res) => {
  const sender = await User.findById(req.user.id);
  const { phone, amount } = req.body;
  const receiver = await User.findOne({ phone });
  if (!receiver || !receiver.walletAddress) return res.status(404).json({ error: 'Recipient not found' });
  const tx = await web3Service.sendTransaction(sender.walletAddress, receiver.walletAddress, amount);
  res.status(200).json({ success: true, tx });
};
