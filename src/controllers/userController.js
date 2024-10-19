import { leerArchivoJSON, escribirArchivoJSON } from '../utils/function.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../models/user/user.json');

// Obtener todos los usuarios (GET /users)
export const getUsers = async (req, res) => {
    try {
        const users = await leerArchivoJSON(usersFilePath);
        res.json(users);
    } catch (error) {
        res.status(500).send('Error al leer el archivo de usuarios');
    }
};

// Login de usuario
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const users = await leerArchivoJSON(usersFilePath);
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) return res.status(401).send('Credenciales incorrectas');
        
        // Guardar el usuario en la sesión
        req.session.user = user;
        res.redirect('/main')
        // res.render('main', { user: req.session.user }); // Enviar el usuario a la vista 'main'
    } catch (error) {
        res.status(500).send('Error al leer el archivo de usuarios');
    }
};

// Logout de usuario
export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.render('index');
    });
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    const newUser = req.body;
    try {
        const users = await leerArchivoJSON(usersFilePath);
        users.push(newUser);
        await escribirArchivoJSON(usersFilePath, users);
        res.status(201).send('Usuario creado con éxito');
    } catch (error) {
        res.status(500).send('Error al crear el usuario');
    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
        const users = await leerArchivoJSON(usersFilePath);
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return res.status(404).send('Usuario no encontrado');
        
        users[index] = { ...users[index], ...updatedUser };
        await escribirArchivoJSON(usersFilePath, users);
        res.send('Usuario actualizado con éxito');
    } catch (error) {
        res.status(500).send('Error al actualizar el usuario');
    }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        let users = await leerArchivoJSON(usersFilePath);
        users = users.filter(user => user.id !== id);
        await escribirArchivoJSON(usersFilePath, users);
        res.send('Usuario eliminado con éxito');
    } catch (error) {
        res.status(500).send('Error al eliminar el usuario');
    }
};