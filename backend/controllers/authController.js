const smsService = require('../services/smsService');
const jwtService = require('../services/jwtService');
const Token = require('../models/Token');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

exports.sendSMS = async (req, res) => {
  const { phone } = req.body;
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await Token.create({ phone, token, expiresAt });
  await smsService.sendSMS(phone, `Login: https://yourdomain.com/login?token=${token}`);
  res.status(200).json({ success: true });
};

exports.verifyToken = async (req, res) => {
  const { token } = req.query;
  const tokenEntry = await Token.findOne({ token });
  if (!tokenEntry || tokenEntry.expiresAt < new Date()) {
    return res.status(401).json({ error: 'Token expired or invalid' });
  }
  const user = await User.findOneAndUpdate({ phone: tokenEntry.phone }, { phone: tokenEntry.phone }, { upsert: true, new: true });
  const jwt = jwtService.generateToken({ id: user._id, phone: user.phone });
  await Token.deleteOne({ token });
  res.status(200).json({ token: jwt });
};
