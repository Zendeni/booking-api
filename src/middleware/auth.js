const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'supersecretkey'; // set a better secret in .env

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user; // now available in controller logic
    next();
  });
};

module.exports = { authenticateJWT, SECRET };
