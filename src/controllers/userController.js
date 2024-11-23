import * as userService from "../services/userService.js";
import User from '../models/User.js'



export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send("Credenciales incorrectas");
    }
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

export async function crearUsuario(req, res) {
  try {
    // Extraer los datos del usuario desde el cuerpo de la solicitud
    const { nombre, apellido, username, rol, password } = req.body;

    // Crear un nuevo objeto con los datos proporcionados
    const nuevoUsuario = {
      nombre,
      apellido,
      username,
      rol,
      password, // todo encriptar la contraseña
    };

    const usuarioCreado = await userService.crearUsuario(nuevoUsuario);

    return res.status(201).json(usuarioCreado);
  } catch (error) {
    console.error("Error en el controlador:", error);
    if (error.isClientError) {
      return res
        .status(error.statusCode || 400)
        .json({ message: error.message });
    }
    return res.status(500).json({ message: MSG_ERROR_500 });
  }
}
