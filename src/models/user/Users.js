export default class User  {
  #nombre;
  #apellido;
  #username;
  #rol;
  #password;

  constructor(nombre, apellido, username, rol, password) {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#username = username;
    this.#rol = rol;
    this.#password = password;
  }

// Métodos públicos para acceder a los datos privados(js ES6)
//GETTERS
get nombre() {
    return this.#nombre;
}
get apellido(){
  return this.#apellido;
}
get username() {
    return this.#username;
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
set username(username) {
  this.#username = username;
}
set rol(rol) {
  if(!Object.values(UserRol).includes(rol)){
    throw new Error('Rol no válido');
  }
  this.#rol = rol;
}
set password(password) {
  this.#password = password;
}


// Método para comparar la contraseña(no tiene getter para no exponerla)
verificarPassword(password) {
  return this.#password === password;
}

mostrarDetalles() {
  return `
        Nombre: ${this.#nombre}, 
        Apellido: ${this.#apellido}, 
        Username: ${this.#username}, 
        Rol: ${this.#rol}
        `;
}

//Método para serializar el objeto (no borrar)
toJSON() {
  return {
      nombre: this.#nombre,
      apellido: this.#apellido,
      username: this.#username,
      rol: this.#rol,
      password: this.#password
      // No se incluye contrasenia por razones de seguridad
  };
}

}
