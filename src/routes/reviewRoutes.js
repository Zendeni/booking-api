const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateJWT } = require('../middleware/auth');

router.post('/', authenticateJWT, reviewController.createReview);

module.exports = router;
