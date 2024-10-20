import UserModel from "../models/user/User.js";
import { fileURLToPath } from "url";
import path from "path";
import * as functions from "../utils/function.js";

export function crearUsuario(usuarioCreador) {
  //todo: agregar validacion que no se agregue un usuario con el mismo "username" que es la PK
  const { nombre, apellido, username, rol, contrasenia } = usuarioCreador;
  return new UserModel(nombre, apellido, username, rol, contrasenia);
}

/**
 * Busca un Usuario registrado que coincida con el username
 * @param {Array<Object>} usuarios
 * @param {String} username
 * @returns Si hay una coincidencia retorna el Objeto User, de lo contrario retorna Undefined
 */
export function buscarUsuarioPorUsername(usuarios, username) {
  return usuarios.find((usuario) => usuario.username == username);
}

export async function usuarioExiste(usernameUsuarioCreador) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const usuariosFilePath = path.join(__dirname, "../models/user/user.json");
    const usuariosEnBase = await functions.leerArchivoJSON(usuariosFilePath);

    const usuarioIndex = usuariosEnBase.findIndex(
      (usuario) => usuario.username === usernameUsuarioCreador
    );
    if (usuarioIndex == -1) {
      //sino encuentra coincidencia ,devuelve -1
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error al validar usuario:", error);
    throw error;
  }
}
