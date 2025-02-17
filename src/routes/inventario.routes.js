const express = require('express');

const inventarioController = require('../controllers/inventarioController');

const router = express.Router();

const { inventarioValidationRules, validate } = require('../middleware/validaciones/inventarioValidation');

router.get('/', inventarioController.getAllInventario);
router.get('/:id', inventarioController.getInventarioById);
router.post('/', [inventarioValidationRules(), validate], inventarioController.createInventario);
router.put('/:id', [inventarioValidationRules(), validate], inventarioController.updateInventario);
router.delete('/:id', inventarioController.deleteInventario);

module.exports = router;