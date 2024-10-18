import { UserRol } from "../../core/enums.js";


export default class User  {
  #nombre;
  #apellido;
  #email;
  #rol;
  #contrasenia;


  constructor(nombre, apellido, email, rol, contrasenia) {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#email = email;
    this.#rol = rol;
    this.#contrasenia = contrasenia;
  }


// Métodos públicos para acceder a los datos privados(js ES6)
//GETTERS
get nombre() {
    return this.#nombre;
}
get apellido(){
  return this.#apellido;
}
get email() {
    return this.#email;
}
get rol(){
  return this.#rol;
}


 //SETTERS
set nombre(nombre) {
  this.#nombre = nombre;
}
set apellido(apellido) {
  this.#apellido = apellido;
}
set email(email) {
  this.#email = email;
}
set rol(rol) {
  if(!Object.values(UserRol).includes(rol)){
    throw new Error('Rol no válido');
  }
  this.#rol = rol;
}
set contrasenia(contrasenia) {
  this.#contrasenia = contrasenia;
}




// Método para comparar la contraseña(no tiene getter para no exponerla)
verificarContrasenia(contrasenia) {
  return this.#contrasenia === contrasenia;
}


mostrarDetalles() {
  return `
        Nombre: ${this.#nombre},
        Apellido: ${this.#apellido},
        Email: ${this.#email},
        Rol: ${this.#rol}
        `;
}


//Método para serializar el objeto (no borrar)
toJSON() {
  return {
      nombre: this.#nombre,
      apellido: this.#apellido,
      email: this.#email,
      rol: this.#rol,
      contrasenia: this.#contrasenia
      // No se incluye contrasenia por razones de seguridad
  };
}


}





