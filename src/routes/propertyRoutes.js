const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authenticateJWT } = require('../middleware/auth');

router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getPropertyById);
router.post('/', authenticateJWT, propertyController.createProperty);
router.post('/:id/amenities', authenticateJWT, propertyController.assignAmenitiesToProperty);

module.exports = router;
