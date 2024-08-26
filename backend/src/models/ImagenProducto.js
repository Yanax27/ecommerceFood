const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ImagenProducto", {
    id_imagen: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });
};
