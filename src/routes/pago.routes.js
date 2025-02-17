const express = require('express');

const pagoController = require('../controllers/pagoController');

const router = express.Router();

const { pagoValidationRules, validate } = require('../middleware/validaciones/pagoValidation');

router.get('/', pagoController.getAllPago);
router.get('/:id', pagoController.getPagoById);
router.post('/', [pagoValidationRules(), validate], pagoController.createPago);
router.put('/:id', [pagoValidationRules(), validate], pagoController.updatePago);
router.delete('/:id', pagoController.deletePago);

module.exports = router;