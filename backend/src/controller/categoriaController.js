const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('ecommerce', 'postgres', 'admin', {
  dialect: 'postgres', // o el dialecto que estés utilizando
});

// Importa y define el modelo
const Categoria = require('../models/Categoria')(sequelize);

// Sincroniza el modelo con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });

  const listarCategorias = async () => {
    try {
      const categorias = await Categoria.findAll(); // O ajusta según sea necesario
      return categorias;
    } catch (error) {
      console.error("Error al listar las categorías:", error);
      throw error;
    }
  };
  
const crearCategoria = async (data) => {
  try {
    const nuevaCategoria = await Categoria.create(data);
    return nuevaCategoria;
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};const eliminarCategoria = async (id) => {
    try {
      const resultado = await Categoria.destroy({
        where: { id_categoria: id }
      });
      return resultado; // Retorna el número de filas afectadas
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      throw error;
    }
  };
  const modificarCategoria = async (id, datosActualizados) => {
    try {
      const [numFilasActualizadas] = await Categoria.update(datosActualizados, {
        where: { id_categoria: id }
      });
      return numFilasActualizadas; // Retorna el número de filas actualizadas
    } catch (error) {
      console.error("Error al modificar la categoría:", error);
      throw error;
    }
  };

  const buscarCategoriaPorId = async (id) => {
    try {
      const categoria = await Categoria.findByPk(id); // Ajusta según el ORM
      if (!categoria) {
        throw new Error('Categoría no encontrada');
      }
      return categoria;
    } catch (error) {
      console.error("Error al buscar la categoría por ID:", error);
      throw error;
    }
  };
  
  const buscarCategoriaPorNombre = async (nombre) => {
    try {
      const categoria = await Categoria.findOne({ where: { nombre } }); 
      if (!categoria) {
        throw new Error('Categoría no encontrada');
      }
      return categoria;
    } catch (error) {
      console.error("Error al buscar la categoría por nombre:", error);
      throw error;
    }
  };
  module.exports = {
    crearCategoria,
    eliminarCategoria,
    modificarCategoria,
    listarCategorias,
  };