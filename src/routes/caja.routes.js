const express = require('express');

const cajaController = require('../controllers/cajaController');

const router = express.Router();

const { cajaValidationRules, validate } = require('../middleware/validaciones/cajaValidation');

router.get('/', cajaController.getAllCaja);
router.get('/:id', cajaController.getCajaById);
router.post('/', [cajaValidationRules(), validate], cajaController.createCaja);
router.put('/:id', [cajaValidationRules(), validate], cajaController.updateCaja);
router.delete('/:id', cajaController.deleteCaja);

module.exports = router;