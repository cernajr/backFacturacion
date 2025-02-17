const express = require('express');

const tipoImpController = require('../controllers/tipoImpController');

const router = express.Router();

const { variasValidationRules, validate } = require('../middleware/validaciones/variasValidation');

router.get('/', tipoImpController.getAllTipoImp);
router.get('/:id', tipoImpController.getTipoImpById);
router.post('/', [variasValidationRules(), validate], tipoImpController.createTipoImp);
router.put('/:id', [variasValidationRules(), validate], tipoImpController.updateTipoImp);
router.delete('/:id', tipoImpController.deleteTipoImp);

module.exports = router;