const express = require('express');

const proveedorController = require('../controllers/proveedorController');

const router = express.Router();

const { proveedorValidationRules, validate } = require('../middleware/validaciones/proveedorValidation');

router.get('/', proveedorController.getAllProveedor);
router.get('/:id', proveedorController.getProveedorById);
router.post('/', [proveedorValidationRules(), validate], proveedorController.createProveedor);
router.put('/:id', [proveedorValidationRules(), validate], proveedorController.updateProveedor);
router.delete('/:id', proveedorController.deleteProveedor);

module.exports = router;