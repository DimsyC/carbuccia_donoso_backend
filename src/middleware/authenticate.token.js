const jwt = require('../utils/jwt');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    // Token is missing, return 401 Unauthorized
    return res.status(401).json({ message: 'Authorization token not found.' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verifyToken(token)

    // Attach the decoded payload to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid or expired, return 403 Forbidden
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
