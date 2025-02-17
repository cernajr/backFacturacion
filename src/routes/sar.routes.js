const express = require('express');

const sarController = require('../controllers/sarController');

const router = express.Router();

const { sarValidationRules, validate } = require('../middleware/validaciones/sarValidation');

router.get('/', sarController.getAllSar);
router.get('/:id', sarController.getSarById);
router.post('/', [sarValidationRules(), validate], sarController.createSar);
router.put('/:id', [sarValidationRules(), validate], sarController.updateSar);
router.delete('/:id', sarController.deleteSar);

module.exports = router;