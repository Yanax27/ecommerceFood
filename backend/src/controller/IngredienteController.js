const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('ecommerce', 'postgres', 'admin', {
    dialect: 'postgres', // o el dialecto que estés utilizando
  });
const Ingrediente = require('../models/Ingrediente')(sequelize);

const listarIngrediente = async () => {
    try {
      const categorias = await Ingrediente.findAll(); // O ajusta según sea necesario
      return categorias;
    } catch (error) {
      console.error("Error al listar las categorías:", error);
      throw error;
    }
  };
  const crearIngrediente = async (data) => {
    try {
      const nuevoIngrediente = await Ingrediente.create(data);
      return nuevoIngrediente;
    } catch (error) {
      console.error("Error al crear el Ingrediente:", error);
      throw error;
    }
  };const eliminarIngrendiente = async (id) => {
      try {
        const resultado = await Ingrediente.destroy({
          where: { id_ingrediente: id }
        });
        return resultado; // Retorna el número de filas afectadas
      } catch (error) {
        console.error("Error al eliminar el Ingrediente:", error);
        throw error;
      }
    };
    const modificarIngrediente = async (id, datosActualizados) => {
      try {
        const [numFilasActualizadas] = await Ingrediente.update(datosActualizados, {
          where: { id_ingrediente: id }
        });
        return numFilasActualizadas; // Retorna el número de filas actualizadas
      } catch (error) {
        console.error("Error al modificar el Ingrediente:", error);
        throw error;
      }
    };
  module.exports={
    listarIngrediente,
    crearIngrediente,
    modificarIngrediente,
    eliminarIngrendiente
  };