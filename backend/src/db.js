require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed6
    // dialectOptions: {
    //   ssl: {
    //     require: false,
    //     rejectUnauthorized: false
    //   }
    // },
  }
); //para poder conectarse a una base de datos con ssl
const basename = path.basename(__filename);

const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Categoria,
  ImagenProducto,
  Ingrediente,
  Producto,
  TipoPago,
  Pago,
  Pedido,
  DetallePedido,
  Rol,
  Usuario,
  ProductoIngrediente
} = sequelize.models;

// Definir relaciones
TipoPago.hasOne(Pago); // Relación 1 a 1 entre Pago y TipoPago
Pago.belongsTo(TipoPago); // La TipoPago pertenece a un Pago

Rol.hasMany(Usuario); // El Rol pertenece a muchos Usuario
Usuario.belongsTo(Rol); // Relación * a 1 entre Usuario y Rol

Usuario.hasMany(Pedido); // Un Usuario puede tener varios Pedido
Pedido.belongsTo(Usuario); // Relación 1 a * entre Usuario y Pedido

Pago.hasOne(Pedido); // Un Pago puede estar en un Pedido
Pedido.belongsTo(Pago); // Relación 1 a * entre Pago y Pedido

ImagenProducto.hasMany(Producto); // Relación * a 1 entre imagenes y Producto
Producto.belongsTo(ImagenProducto); // Un producto puede tener varios imagenes

Ingrediente.belongsToMany(Producto, { through: ProductoIngrediente });
Producto.belongsToMany(Ingrediente, { through: ProductoIngrediente }); // Ingrediente y Producto  N-N formando  ProcuctoIngrediente

Categoria.hasMany(Producto); // Relación * a 1 entre Producto y Categoria
Producto.belongsTo(Categoria); // Una Categoria pertenece a un Producto

Pedido.hasMany(DetallePedido); // Relación * a 1 entre DetallePedido y Pedido
DetallePedido.belongsTo(Pedido); // Un Pedido pertenece a muchos DetallePedido

Producto.hasMany(DetallePedido); // Relación 1 a * entre Producto y DetallePedido
DetallePedido.belongsTo(Producto); // Un Producto pertenece a muchos DetallePedido

module.exports = {
  // para poder importar los modelos así: const { Product, User } = require('./db.js');
  ...sequelize.models,
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
