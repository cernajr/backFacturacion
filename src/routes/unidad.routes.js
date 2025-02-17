const express = require('express');

const unidadController = require('../controllers/unidadController');

const router = express.Router();

const { variasValidationRules, validate } = require('../middleware/validaciones/variasValidation');

router.get('/', unidadController.getAllUnidad);
router.get('/:id', unidadController.getUnidadById);
router.post('/', [variasValidationRules(), validate], unidadController.createUnidad);
router.put('/:id', [variasValidationRules(), validate], unidadController.updateUnidad);
router.delete('/:id', unidadController.deleteUnidad);

module.exports = router;