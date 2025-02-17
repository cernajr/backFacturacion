const express = require('express');

const tipoMovimientoController = require('../controllers/tipoMovimientoController');

const router = express.Router();

const { variasValidationRules, validate } = require('../middleware/validaciones/variasValidation');

router.get('/', tipoMovimientoController.getAllTipoMovimiento);
router.get('/:id', tipoMovimientoController.getTipoMovimientoById);
router.post('/', [variasValidationRules(), validate], tipoMovimientoController.createTipoMovimiento);
router.put('/:id', [variasValidationRules(), validate], tipoMovimientoController.updateTipoMovimiento);
router.delete('/:id', tipoMovimientoController.deleteTipoMovimiento);

module.exports = router;