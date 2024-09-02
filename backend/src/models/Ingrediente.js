const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
 const Ingrediente= sequelize.define("Ingrediente", {
    id_ingrediente: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });
  return Ingrediente
};
