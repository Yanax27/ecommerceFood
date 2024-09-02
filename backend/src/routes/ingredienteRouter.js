const express = require("express");
const router = express();
const { crearIngrediente, eliminarIngrendiente, modificarIngrediente, listarIngrediente} = require('../controller/IngredienteController'); // Asegúrate de ajustar la ruta
// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Hello from ingrediente');
});
router.get('/listar', async (req, res) => {
  try {
    const ingrediente = await listarIngrediente(); // Llama al método listarCategorias
    res.status(200).json(ingrediente); // Envía las categorías como respuesta JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los ingredientes', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevoIngrediente = await crearIngrediente(req.body);
    res.status(201).json(nuevoIngrediente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await eliminarIngrendiente(req.params.id);
    if (resultado > 0) {
      res.status(200).json({mensaje:"Ingrediente eliminado"});
    } else {
      res.status(404).json({ error: 'Ingrediente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modificar una categoría
router.put('/:id', async (req, res) => {
  try {
    const resultado = await modificarIngrediente(req.params.id, req.body);
    if (resultado > 0) {
      res.status(200).json({ mensaje: 'Ingrediente actualizado' });
    } else {
      res.status(404).json({ error: 'Ingrediente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

