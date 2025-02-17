const express = require('express');

const detalleVentaController = require('../controllers/detalleVentaController');

const router = express.Router();

const { detalleVentaValidationRules, validate } = require('../middleware/validaciones/detalleVentaValidation');

router.get('/', detalleVentaController.getAllDetalleVenta);
router.get('/:id', detalleVentaController.getDetalleVentaById);
router.post('/', [detalleVentaValidationRules(), validate], detalleVentaController.createDetalleVenta);
router.put('/:id', [detalleVentaValidationRules(), validate], detalleVentaController.updateDetalleVenta);
router.delete('/:id', detalleVentaController.deleteDetalleVenta);

module.exports = router;