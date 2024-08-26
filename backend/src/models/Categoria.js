const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Categoria", {
    id_categoria: {
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
      }

  });
};
