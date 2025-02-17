const express = require('express');

const ventaController = require('../controllers/ventaController');

const router = express.Router();

const { ventaValidationRules, validate } = require('../middleware/validaciones/ventaValidation');

router.get('/', ventaController.getAllVenta);
router.get('/:id', ventaController.getVentaById);
router.post('/', [ventaValidationRules(), validate], ventaController.createVenta);
router.put('/:id', [ventaValidationRules(), validate], ventaController.updateVenta);
router.delete('/:id', ventaController.deleteVenta);

module.exports = router;