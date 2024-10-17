class User {
  constructor(nombre, apellido, mail, rol, contraseña) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mail = mail;
    this.rol = rol;
    this.contraseña = contraseña;
  }
}

module.exports = User;