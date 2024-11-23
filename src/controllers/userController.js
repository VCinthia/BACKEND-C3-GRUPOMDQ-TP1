import * as userService from "../services/userService.js";
import User from '../models/User.js';
import bcrypt from 'bcrypt'; // Importa bcrypt

// Login de usuario
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca al usuario por nombre de usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("Usuario incorrecto");
    }

    // Compara la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Contraseña incorrecta");
    }

    // Almacena el usuario en la sesión si las credenciales son correctas
    req.session.user = user;
    res.redirect("/main");
  } catch (error) {
    console.error("Error al autenticar el usuario:", error);
    res.status(500).send("Error en el servidor");
  }
};

// Logout de usuario
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error al cerrar sesión");
    res.render("index");
  });
};

// Crear un nuevo usuario
export async function crearUsuario(req, res) {
  try {
    // Extraer los datos del usuario desde el cuerpo de la solicitud
    const { nombre, apellido, username, rol, password } = req.body;

    // Encriptar la contraseña con bcrypt
    const salt = await bcrypt.genSalt(10); // Genera un "salt" para agregar aleatoriedad
    const hashedPassword = await bcrypt.hash(password, salt); // Genera el hash

    // Crear un nuevo objeto con la contraseña encriptada
    const nuevoUsuario = {
      nombre,
      apellido,
      username,
      rol,
      password: hashedPassword, // Almacena la contraseña encriptada
    };

    // Llama al servicio para guardar el usuario
    const usuarioCreado = await userService.crearUsuario(nuevoUsuario);

    return res.status(201).json(usuarioCreado);
  } catch (error) {
    console.error("Error en el controlador:", error);
    if (error.isClientError) {
      return res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
    //return res.status(500).json({ message: MSG_ERROR_500 });
    return res.status(500).json({ message: error.message });
  }
}
