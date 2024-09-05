const express = require("express");
const router = express();
const { uploadImageHandler, listarImagen, eliminarImagen } = require('../controllers/imagenProductoController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Almacena archivos en la memoria

// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Hello from imagen');
});

// Configuración de multer para manejar archivos subidos

// Ruta para subir una imagen
router.post('/upload', upload.single('image'), uploadImageHandler);

// Ruta para listar todas las imágenes
router.get('/listar', async (req, res) => {
  try {
    const imagenes = await listarImagen();
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar las imágenes' });
  }
});

// Ruta para eliminar una imagen por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await eliminarImagen(id);
    if (resultado === 0) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    res.status(200).json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
});

module.exports = router;

