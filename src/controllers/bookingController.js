const bookingService = require('../services/bookingService');

const getBookings = async (req, res) => {
  try {
    const { userId } = req.query;

    const filters = {
      userId,
    };

    const bookings = await bookingService.getAllBookings(filters);
    res.json(bookings);
  } catch (error) {
    console.error('Error in getBookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};


const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error in createBooking:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBookings,
  createBooking,
};
