// src/routes/propertyRoutes.js
const express = require('express');
const router  = express.Router();
const propertyController = require('../controllers/propertyController');
const { authenticateJWT } = require('../middleware/auth');

// public reads
router.get('/',      propertyController.getAllProperties);
router.get('/:id',   propertyController.getPropertyById);

// authenticated writes
router.post('/',     authenticateJWT, propertyController.createProperty);
router.put('/:id',   authenticateJWT, propertyController.updateProperty);
router.delete('/:id',authenticateJWT, propertyController.deleteProperty);

module.exports = router;
