const express = require("express");
const { listarProducto, crearProducto, eliminarProducto, modificarProducto } = require("../controller/productoController");
const router = express();

// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Hello from producto');
});
router.get('/listar', async (req, res) => {
  try {
    const producto = await listarProducto(); // Llama al método listarCategorias
    res.status(200).json(producto); // Envía las categorías como respuesta JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los productos', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevoproducto = await crearProducto(req.body);
    res.status(201).json(nuevoproducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await eliminarProducto(req.params.id);
    if (resultado > 0) {
      res.status(200).json({mensaje:"producto eliminado"});
    } else {
      res.status(404).json({ error: 'producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modificar una categoría
router.put('/:id', async (req, res) => {
  try {
    const resultado = await modificarProducto(req.params.id, req.body);
    if (resultado > 0) {
      res.status(200).json({ mensaje: 'producto actualizado' });
    } else {
      res.status(404).json({ error: 'producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


