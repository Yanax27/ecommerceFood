const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, usuarioController.getAllUsuarios);
router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);
router.post('/', usuarioController.createUsuario);
router.get('/:id', authMiddleware,usuarioController.getUsuariobyId);
router.patch('/:id', authMiddleware, usuarioController.updateUsuario);
router.delete('/:id', authMiddleware, usuarioController.deleteUsuario);

module.exports = router;