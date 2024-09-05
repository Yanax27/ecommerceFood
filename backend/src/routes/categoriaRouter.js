const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const router = express.Router();

router.get('/', categoriaController.getAllCategorias);
router.get('/:id_categoria', categoriaController.getCategoriaById);
router.post('/', categoriaController.createCategoria);
router.patch('/:id_categoria', categoriaController.updateCategoria);
router.delete('/:id_categoria', categoriaController.deleteCategoria);

module.exports = router;
