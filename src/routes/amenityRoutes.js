// src/routes/amenityRoutes.js
const express = require('express');
const router  = express.Router();
const amenityController = require('../controllers/amenityController');
const { authenticateJWT } = require('../middleware/auth');

// public reads
router.get('/',      amenityController.getAllAmenities);
router.get('/:id',   amenityController.getAmenityById);

// authenticated writes
router.post('/',     authenticateJWT, amenityController.createAmenity);
router.put('/:id',   authenticateJWT, amenityController.updateAmenity);
router.delete('/:id',authenticateJWT, amenityController.deleteAmenity);

module.exports = router;
