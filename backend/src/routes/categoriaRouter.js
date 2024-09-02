const express = require("express");
const router = express();
const { crearCategoria, eliminarCategoria, modificarCategoria,listarCategorias } = require('../controller/categoriaController.js'); // Asegúrate de ajustar la ruta

// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Hello from categoria',);
});
router.get('/listar', async (req, res) => {
  try {
    const categorias = await listarCategorias(); // Llama al método listarCategorias
    res.status(200).json(categorias); // Envía las categorías como respuesta JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al listar las categorías', error });
  }
});
// Crear una categoría
router.post('/', async (req, res) => {
  try {
    const nuevaCategoria = await crearCategoria(req.body);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await eliminarCategoria(req.params.id);
    if (resultado > 0) {
      res.status(200).json({mensaje:"Categoria eliminada"});
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modificar una categoría
router.put('/:id', async (req, res) => {
  try {
    const resultado = await modificarCategoria(req.params.id, req.body);
    if (resultado > 0) {
      res.status(200).json({ mensaje: 'Categoría actualizada' });
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await buscarCategoriaPorId(id);
    res.status(200).json(categoria);
  } catch (error) {
    res.status(404).json({ message: 'Categoría no encontrada', error });
  }
});

// Ruta para buscar por nombre
router.get('/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;
    const categoria = await buscarCategoriaPorNombre(nombre);
    res.status(200).json(categoria);
  } catch (error) {
    res.status(404).json({ message: 'Categoría no encontrada', error });
  }
});
module.exports = router;


