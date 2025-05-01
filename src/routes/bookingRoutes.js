// src/routes/bookingRoutes.js
const express = require('express');
const router  = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateJWT } = require('../middleware/auth');

// public reads
router.get('/',      bookingController.getAllBookings);
router.get('/:id',   bookingController.getBookingById);

// authenticated writes (no ownership check)
router.post('/',     authenticateJWT, bookingController.createBooking);
router.put('/:id',   authenticateJWT, bookingController.updateBooking);
router.delete('/:id',authenticateJWT, bookingController.deleteBooking);

module.exports = router;
