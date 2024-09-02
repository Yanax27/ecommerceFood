const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
const producto = sequelize.define("Producto", {
    id_producto: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    estado: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
  });
  return producto;
};
