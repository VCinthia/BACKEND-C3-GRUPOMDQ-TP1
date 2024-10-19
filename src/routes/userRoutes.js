import express from "express";
import * as userController from '../controllers/userController.js';
const routerUser = express.Router();


// Rutas para la entidad Users
routerUser.get('/', userController.getUsers);
routerUser.post('/', userController.createUser);
routerUser.put('/:id', userController.updateUser);
routerUser.delete('/:id', userController.deleteUser);

// Ruta para login (Obtener usuario según credenciales)
routerUser.post('/main', userController.loginUser);

// Ruta para logout (Eliminar usuario de la sesión)
routerUser.post('/logout', userController.logoutUser);


export default routerUser;
