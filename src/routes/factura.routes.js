const express = require('express');

const facturaController = require('../controllers/facturaController');

const router = express.Router();

const { facturaValidationRules, validate } = require('../middleware/validaciones/facturaValidation');

router.get('/', facturaController.getAllFactura);
router.get('/:id', facturaController.getFacturaById);
router.post('/', [facturaValidationRules(), validate], facturaController.createFactura);
router.put('/:id', [facturaValidationRules(), validate], facturaController.updateFactura);
router.delete('/:id', facturaController.deleteFactura);

module.exports = router;