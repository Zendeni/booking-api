const service = require('../services/bookingService');

exports.getAllBookings = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.userId) filters.userId = req.query.userId;
    const b = await service.getAllBookings(filters);
    res.json(b);
  } catch (err) {
    next(err);
  }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const b = await service.getBookingById(req.params.id);
    res.json(b);
  } catch (err) {
    next(err);
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const b = await service.createBooking(req.body);
    res.status(201).json(b);
  } catch (err) {
    next(err);
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const u = await service.updateBooking(req.params.id, req.body);
    res.json(u);
  } catch (err) {
    next(err);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    await service.deleteBooking(req.params.id);
    res.json({});
  } catch (err) {
    next(err);
  }
};
