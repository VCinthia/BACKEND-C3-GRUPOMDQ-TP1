const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para la entidad Users
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Ruta para login (Obtener usuario según credenciales)
router.post('/main', userController.loginUser);

// Ruta para logout (Eliminar usuario de la sesión)
router.post('/logout', userController.logoutUser);

module.exports = router;