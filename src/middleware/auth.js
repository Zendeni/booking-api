// src/middleware/auth.js
const jwt           = require('jsonwebtoken');
const prisma        = require('../prisma/client');
const ServiceError  = require('../utils/ServiceError');

function authenticateJWT(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new ServiceError('Authentication required', 401));
  }

  // accept both "Bearer <token>" or raw token
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader.trim();

  try {
    const payload = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    next(new ServiceError('Invalid or expired token', 401));
  }
}

async function authorizeUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    return next(new ServiceError('Forbidden', 403));
  }
  next();
}

async function authorizeHost(req, res, next) {
  const host = await prisma.host.findUnique({ where: { id: req.params.id } });
  if (!host) return next(new ServiceError('Host not found', 404));
  if (host.userId !== req.user.id) {
    return next(new ServiceError('Forbidden', 403));
  }
  next();
}

async function authorizeProperty(req, res, next) {
  const prop = await prisma.property.findUnique({
    where: { id: req.params.id },
    include: { host: true }
  });
  if (!prop) return next(new ServiceError('Property not found', 404));
  if (prop.host.userId !== req.user.id) {
    return next(new ServiceError('Forbidden', 403));
  }
  next();
}

async function authorizeBooking(req, res, next) {
  const booking = await prisma.booking.findUnique({ where: { id: req.params.id } });
  if (!booking) return next(new ServiceError('Booking not found', 404));
  if (booking.userId !== req.user.id) {
    return next(new ServiceError('Forbidden', 403));
  }
  next();
}

async function authorizeReview(req, res, next) {
  const review = await prisma.review.findUnique({ where: { id: req.params.id } });
  if (!review) return next(new ServiceError('Review not found', 404));
  if (review.userId !== req.user.id) {
    return next(new ServiceError('Forbidden', 403));
  }
  next();
}

// **Named exports** so you can do:
//    const { authenticateJWT, authorizeUser, … } = require('../middleware/auth')
module.exports = {
  authenticateJWT,
  authorizeUser,
  authorizeHost,
  authorizeProperty,
  authorizeBooking,
  authorizeReview,
};
