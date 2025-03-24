const express = require('express');

const productoController = require('../controllers/productoController');

const router = express.Router();

const { productoValidationRules, validate } = require('../middleware/validaciones/productoValidation');

router.get('/', productoController.getAllProducto);
router.get('/:id', productoController.getProductoById);
router.post('/', [productoValidationRules(), validate], productoController.createProducto);
router.post('/', productoController.createProductoInventario);
router.put('/:id', [productoValidationRules(), validate], productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

module.exports = router;