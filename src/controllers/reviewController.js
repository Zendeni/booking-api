const reviewService = require('../services/reviewService');

const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    console.error('Error in createReview:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReview,
};
