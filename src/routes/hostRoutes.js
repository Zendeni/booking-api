// src/routes/hostRoutes.js
const express = require('express');
const router  = express.Router();
const hostController = require('../controllers/hostController');
const { authenticateJWT } = require('../middleware/auth');

// public reads
router.get('/',      hostController.getAllHosts);
router.get('/:id',   hostController.getHostById);

// authenticated writes (no ownership check)
router.post('/',     authenticateJWT, hostController.createHost);
router.put('/:id',   authenticateJWT, hostController.updateHost);
router.delete('/:id',authenticateJWT, hostController.deleteHost);

module.exports = router;
