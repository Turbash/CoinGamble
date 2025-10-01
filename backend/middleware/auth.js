const jwt = require('jsonwebtoken');

const auth = {};

auth.verifyUser = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

auth.verifyCollector = (req, res, next) => {
  auth.verifyUser(req, res, () => {
    if (req.user.role === 'collector') {
      next();
    } else {
      return res.status(403).json({ error: 'Access denied: Collectors only' });
    }
  });
};

auth.verifyExpert = (req, res, next) => {
  auth.verifyUser(req, res, () => {
    if (req.user.role === 'expert') {
      next();
    } else {
      return res.status(403).json({ error: 'Access denied: Experts only' });
    }
  });
};

module.exports = auth;
