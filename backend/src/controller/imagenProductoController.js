const { uploadImage } = require('../services/imgBBservices'); // Importa el servicio para ImgBB
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('ecommerce', 'postgres', 'admin', {
    dialect: 'postgres', // o el dialecto que estés utilizando
  });
const ImagenProducto = require('../models/ImagenProducto')(sequelize);

// Maneja la subida de imágenes
const uploadImageHandler = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Subir la imagen a ImgBB
      const imageUrl = await uploadImage(req.file.buffer);
  
      // Guardar la URL en la base de datos
      const newImage = await ImagenProducto.create({ url: imageUrl });
  
      res.status(200).json(newImage);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      res.status(500).json({ error: 'Error uploading image' });
    }
  };
  const listarImagen = async () => {
    try {
      const imagenProduc = await ImagenProducto.findAll(); // O ajusta según sea necesario
      return imagenProduc;
    } catch (error) {
      console.error("Error al listar las imagenes:", error);
      throw error;
    }
  };
  // Maneja la eliminación de imágenes
  const eliminarImagen = async (id) => {
    try {
      const resultado = await ImagenProducto.destroy({
        where: { id_imagen: id }
      });
      return resultado; // Retorna el número de filas afectadas
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      throw error;
    }
  };
  module.exports = {
    uploadImageHandler,
    listarImagen,
    eliminarImagen
  };
