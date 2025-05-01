// src/routes/reviewRoutes.js
const express = require('express');
const router  = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateJWT } = require('../middleware/auth');

// public reads
router.get('/',      reviewController.getAllReviews);
router.get('/:id',   reviewController.getReviewById);

// authenticated writes
router.post('/',     authenticateJWT, reviewController.createReview);
router.put('/:id',   authenticateJWT, reviewController.updateReview);
router.delete('/:id',authenticateJWT, reviewController.deleteReview);

module.exports = router;
