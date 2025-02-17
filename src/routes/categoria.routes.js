const express = require('express');

const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

const { variasValidationRules, validate } = require('../middleware/validaciones/variasValidation');

router.get('/', categoriaController.getAllCategoria);
router.get('/:id', categoriaController.getCategoriaById);
router.post('/', [variasValidationRules(), validate], categoriaController.createCategoria);
router.put('/:id', [variasValidationRules(), validate], categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;