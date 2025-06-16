const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Validaciones para login
const loginValidation = [
  body('usuario')
    .isLength({ min: 1 })
    .withMessage('El usuario es requerido')
    .trim(),
  body('password')
    .isLength({ min: 1 })
    .withMessage('La contraseña es requerida')
];

// Rutas públicas (no necesitan autenticación)
router.post('/login', loginValidation, authController.login);

// Rutas protegidas (necesitan autenticación)
router.get('/verify', authController.verifyToken);
router.post('/logout', authController.logout);

module.exports = router;