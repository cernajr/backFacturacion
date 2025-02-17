const express = require('express');

const compraController = require('../controllers/compraController');

const router = express.Router();

const { compraValidationRules, validate } = require('../middleware/validaciones/compraValidation');

router.get('/', compraController.getAllCompra);
router.get('/:id', compraController.getCompraById);
router.post('/', [compraValidationRules(), validate], compraController.createCompra);
router.put('/:id', [compraValidationRules(), validate], compraController.updateCompra);
router.delete('/:id', compraController.deleteCompra);

module.exports = router;