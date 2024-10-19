const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../models/users/users.json');

// Función para obtener todos los usuarios (GET /users)
const getUsers = (req, res) => {
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Error al leer el archivo de usuarios');
        const users = JSON.parse(data);
        res.json(users);
    });
};

// Obtener usuario según credenciales (Login)
const loginUser = (req, res) => {
    const { username, password } = req.body;
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Error al leer el archivo de usuarios');
        const users = JSON.parse(data);
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) return res.status(401).send(users);
        
        // Persistir el usuario logueado en la sesión
        req.session.user = user;
        res.render('main', { user: req.session.user }); //envío el usuario al main para utilizarlo
    });
};

// Eliminar usuario de la sesión (Logout)
const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.send('Usuario deslogueado con éxito');
    });
};

// Crear un nuevo usuario
const createUser = (req, res) => {
    const newUser = req.body;
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Error al leer el archivo de usuarios');
        const users = JSON.parse(data);
        users.push(newUser);
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send('Error al guardar el usuario');
            res.status(201).send('Usuario creado con éxito');
        });
    });
};

// Actualizar un usuario
const updateUser = (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Error al leer el archivo de usuarios');
        const users = JSON.parse(data);
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return res.status(404).send('Usuario no encontrado');
        users[index] = { ...users[index], ...updatedUser };
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send('Error al actualizar el usuario');
            res.send('Usuario actualizado con éxito');
        });
    });
};

// Eliminar un usuario
const deleteUser = (req, res) => {
    const { id } = req.params;
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Error al leer el archivo de usuarios');
        let users = JSON.parse(data);
        users = users.filter(user => user.id !== id);
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send('Error al eliminar el usuario');
            res.send('Usuario eliminado con éxito');
        });
    });
};

module.exports = {
    getUsers,
    loginUser,
    logoutUser,
    createUser,
    updateUser,
    deleteUser
};