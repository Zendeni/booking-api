const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/auth');

router.get('/', userController.getUsers);
router.post('/', authenticateJWT, userController.createUser);

module.exports = router;
