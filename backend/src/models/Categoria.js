const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  // Define el modelo 'Categoria'
  const Categoria = sequelize.define('Categoria', {
    id_categoria: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4, // Genera un UUID automáticamente para el id_categoria
      allowNull: false, // Este campo no puede ser nulo
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: true, // Este campo puede ser nulo
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true, // Este campo puede ser nulo
    }
  });

  // Devuelve el modelo para que pueda ser utilizado en otras partes de la aplicación
  return Categoria;
};
