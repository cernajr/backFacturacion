const express = require('express');

const clienteController = require('../controllers/clienteController');

const router = express.Router();

const { clienteValidationRules, validate } = require('../middleware/validaciones/clienteValidation');

router.get('/', clienteController.getAllCliente);
router.get('/:id', clienteController.getClienteById);
router.post('/', [clienteValidationRules(), validate], clienteController.createCliente);
router.put('/:id', [clienteValidationRules(), validate], clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;