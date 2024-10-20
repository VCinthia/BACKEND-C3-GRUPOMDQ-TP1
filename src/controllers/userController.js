import { leerArchivoJSON, escribirArchivoJSON } from '../utils/function.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../models/user/user.json');

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

