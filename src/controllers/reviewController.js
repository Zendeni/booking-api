const service = require('../services/reviewService');

exports.getAllReviews = async (req, res, next) => {
  try {
    const r = await service.getAllReviews();
    res.json(r);
  } catch (err) {
    next(err);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const r = await service.getReviewById(req.params.id);
    res.json(r);
  } catch (err) {
    next(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const r = await service.createReview(req.body);
    res.status(201).json(r);
  } catch (err) {
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const u = await service.updateReview(req.params.id, req.body);
    res.json(u);
  } catch (err) {
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    await service.deleteReview(req.params.id);
    res.json({});
  } catch (err) {
    next(err);
  }
};
