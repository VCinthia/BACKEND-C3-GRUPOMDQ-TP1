import express from "express";
import * as userController from '../controllers/userController.js';
const routerUser = express.Router();


// Ruta para login (Obtener usuario según credenciales)
routerUser.post('/login', userController.loginUser);

// Ruta para logout (Eliminar usuario de la sesión)
routerUser.post('/logout', userController.logoutUser);


export default routerUser;
