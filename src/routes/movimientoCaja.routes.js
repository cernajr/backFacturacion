const express = require('express');

const movimientoCajaController = require('../controllers/movimientoCajaController');

const router = express.Router();

const { movimientoCajaValidationRules, validate } = require('../middleware/validaciones/movimientoCajaValidation');

router.get('/', movimientoCajaController.getAllMovimientoCaja);
router.get('/:id', movimientoCajaController.getMovimientoCajaById);
router.post('/', [movimientoCajaValidationRules(), validate], movimientoCajaController.createMovimientoCaja);
router.put('/:id', [movimientoCajaValidationRules(), validate], movimientoCajaController.updateMovimientoCaja);
router.delete('/:id', movimientoCajaController.deleteMovimientoCaja);

module.exports = router;