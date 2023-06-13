const jwt = require('jsonwebtoken');
const config = require('../config');

function generateToken(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.duration,
  });
}

function verifyToken(token) {
  try {
    const decodedToken = jwt.verify(token, config.jwt.secret);
    return decodedToken;
  } catch (error) {
    // Handle verification error (e.g., token expired, invalid signature)
    throw new Error('Invalid token');
  }
}

module.exports = {
      generateToken,
      verifyToken,
};