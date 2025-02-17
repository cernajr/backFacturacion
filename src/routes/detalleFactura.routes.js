const express = require('express');

const detalleFacturaController = require('../controllers/detalleFacturaController');

const router = express.Router();

const { detalleFacturaValidationRules, validate } = require('../middleware/validaciones/detalleFacturaValidation');

router.get('/', detalleFacturaController.getAllDetalleFactura);
router.get('/:id', detalleFacturaController.getDetalleFacturaById);
router.post('/', [detalleFacturaValidationRules(), validate], detalleFacturaController.createDetalleFactura);
router.put('/:id', [detalleFacturaValidationRules(), validate], detalleFacturaController.updateDetalleFactura);
router.delete('/:id', detalleFacturaController.deleteDetalleFactura);

module.exports = router;