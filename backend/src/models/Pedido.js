const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Pedido", {
    id_pedido: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    fechaPedido:{
        type:DataTypes.DATE,
        allowNull:true
    },
    fechaEnvio:{
        type:DataTypes.DATE,
        allowNull:true
    },
    Total:{
        type: DataTypes.DOUBLE,
        allowNull:true,
    },
    metodoEnvio:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    descripcion:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    nroFactura:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    codigoAutorizacion:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    nitReceptor:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    nitEmisor:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    estado:{
        type:DataTypes.TEXT,
        allowNull:true
    }
  });
};
