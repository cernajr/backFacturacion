const express = require('express');

const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

const { usuarioValidationRules, validate } = require('../middleware/validaciones/usuarioValidation');

router.get('/', usuarioController.getAllUsuario);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', [usuarioValidationRules(), validate], usuarioController.createUsuario);
router.put('/:id', [usuarioValidationRules(), validate], usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;