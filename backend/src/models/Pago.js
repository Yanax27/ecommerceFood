const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Pago", {
    id_pago: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    nroTargeta: {   
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fechaVencimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cvc: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    qr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
