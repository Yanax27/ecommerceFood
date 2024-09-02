const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('ecommerce', 'postgres', 'admin', {
    dialect: 'postgres', // o el dialecto que estés utilizando
  });
const Producto = require('../models/Producto')(sequelize);

const listarProducto = async () => {
    try {
      const producto = await Producto.findAll(); // O ajusta según sea necesario
      return producto;
    } catch (error) {
      console.error("Error al listar los productos:", error);
      throw error;
    }
  };
  const crearProducto = async (data) => {
    try {
      const nuevoProducto = await Producto.create(data);
      return nuevoProducto;
    } catch (error) {
      console.error("Error al crear el Producto:", error);
      throw error;
    }
  };const eliminarProducto = async (id) => {
      try {
        const resultado = await Producto.destroy({
          where: { id_producto: id }
        });
        return resultado; // Retorna el número de filas afectadas
      } catch (error) {
        console.error("Error al eliminar el Producto:", error);
        throw error;
      }
    };
    const modificarProducto = async (id, datosActualizados) => {
      try {
        const [numFilasActualizadas] = await Producto.update(datosActualizados, {
          where: { id_producto: id }
        });
        return numFilasActualizadas; // Retorna el número de filas actualizadas
      } catch (error) {
        console.error("Error al modificar el producto:", error);
        throw error;
      }
    };
  module.exports={
    listarProducto,
    crearProducto,
    eliminarProducto,
    modificarProducto
     };