const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DetallePedido", {
    id_categoria: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    subTotal: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    /*ingreso: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    egreso: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },*/
  });
};
