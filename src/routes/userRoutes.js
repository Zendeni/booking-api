// src/routes/userRoutes.js
const express = require('express');
const router  = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/auth');

// public reads
router.get('/',      userController.getAllUsers);
router.get('/:id',   userController.getUserById);

// authenticated writes
router.post('/',     authenticateJWT, userController.createUser);
router.put('/:id',   authenticateJWT, userController.updateUser);
router.delete('/:id',authenticateJWT, userController.deleteUser);

module.exports = router;
