const express = require('express');

const detalleCompraController = require('../controllers/detalleCompraController');

const router = express.Router();

const { detalleCompraValidationRules, validate } = require('../middleware/validaciones/detalleCompraValidation');

router.get('/', detalleCompraController.getAllDetalleCompra);
router.get('/:id', detalleCompraController.getDetalleCompraById);
router.post('/', [detalleCompraValidationRules(), validate], detalleCompraController.createDetalleCompra);
router.put('/:id', [detalleCompraValidationRules(), validate], detalleCompraController.updateDetalleCompra);
router.delete('/:id', detalleCompraController.deleteDetalleCompra);

module.exports = router;