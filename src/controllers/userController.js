import { leerArchivoJSON} from "../utils/function.js";
import { fileURLToPath } from "url";
import path from "path";
import * as userService from "../services/userService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, "../models/user/user.json");

// Login de usuario - todo: refactor, no usar JSON
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await leerArchivoJSON(usersFilePath);
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) return res.status(401).send("Credenciales incorrectas");

    // Guardar el usuario en la sesión
    req.session.user = user;
    res.redirect("/main");
  } catch (error) {
    res.status(500).send("Error al leer el archivo de usuarios");
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
