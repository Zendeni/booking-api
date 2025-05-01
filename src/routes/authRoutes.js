const express = require('express');
const jwt     = require('jsonwebtoken');
const prisma  = require('../prisma/client');
const ServiceError = require('../utils/ServiceError');
const router  = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
      throw new ServiceError('Missing credentials', 400);
    }
    const or = [];
    if (username) or.push({ username });
    if (email)    or.push({ email });
    const user = await prisma.user.findFirst({ where: { OR: or } });
    if (!user) throw new ServiceError('User not found', 401);
    if (user.password !== password) {
      throw new ServiceError('Invalid password', 401);
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
