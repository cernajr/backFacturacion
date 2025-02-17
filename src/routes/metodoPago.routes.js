const express = require('express');

const metodoPagoController = require('../controllers/metodoPagoController');

const router = express.Router();

const { variasValidationRules, validate } = require('../middleware/validaciones/variasValidation');

router.get('/', metodoPagoController.getAllMetodoPago);
router.get('/:id', metodoPagoController.getMetodoPagoById);
router.post('/', [variasValidationRules(), validate], metodoPagoController.createMetodoPago);
router.put('/:id', [variasValidationRules(), validate], metodoPagoController.updateMetodoPago);
router.delete('/:id', metodoPagoController.deleteMetodoPago);

module.exports = router;