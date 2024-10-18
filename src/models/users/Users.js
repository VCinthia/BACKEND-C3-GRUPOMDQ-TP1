class User {
  constructor(nombre, apellido, username, rol, password) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = username;
    this.rol = rol;
    this.password = password;
  }
}

module.exports = User;