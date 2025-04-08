const express = require('express');
const router = express.Router();
const hostController = require('../controllers/hostController');
const { authenticateJWT } = require('../middleware/auth');

router.get('/', hostController.getHosts);
router.get('/:id', hostController.getHostById);

module.exports = router;
