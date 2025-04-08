const express = require('express');
const router = express.Router();
const amenityController = require('../controllers/amenityController');
const { authenticateJWT } = require('../middleware/auth');

router.get('/', amenityController.getAmenities);
router.post('/', authenticateJWT, amenityController.createAmenity);

module.exports = router;
