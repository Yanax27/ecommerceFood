const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("TipoPago", {
    id_tipoPago: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });
};
