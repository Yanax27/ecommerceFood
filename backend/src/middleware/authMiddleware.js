const jwt = require('jsonwebtoken');
const resError = require('../utils/resError');
const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.jwt;
  console.log(token)
  if (!token) {
    return resError(res, 401, 'No autenticado');
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return resError(res, 401, 'Token inválido');
    }

    req.user = decoded; // Añadimos los datos del usuario decodificados al request
    next();
  });
};

module.exports = authMiddleware;