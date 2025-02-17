const express = require('express');

const rolController = require('../controllers/rolController');

const router = express.Router();

const { variasValidationRules, validate } = require('../middleware/validaciones/variasValidation');

router.get('/', rolController.getAllRol);
router.get('/:id', rolController.getRolById);
router.post('/', [variasValidationRules(), validate], rolController.createRol);
router.put('/:id', [variasValidationRules(), validate], rolController.updateRol);
router.delete('/:id', rolController.deleteRol);

module.exports = router;