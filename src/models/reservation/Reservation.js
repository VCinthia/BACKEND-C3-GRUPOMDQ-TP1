import { ReservationMesa, ReservationState } from '../../core/enums.js';



export default class Reservation {
    #id;
    #numMesa;
    #fechaDeTurno;
    #estado;
    #nombreCliente;
    #comentario;
    #emailUsuarioCreador;


    constructor(id,numMesa,fechaDeTurno,nombreCliente,comentario,emailUsuarioCreador) {
        this.#id = id;
        this.#numMesa = numMesa;
        this.#fechaDeTurno = fechaDeTurno;
        this.#estado = ReservationState.PENDIENTE;
        this.#nombreCliente = nombreCliente;
        this.#comentario = comentario;
        this.#emailUsuarioCreador = emailUsuarioCreador;
    }


    // Métodos públicos para acceder a los datos privados(js ES6)
    //GETTERS
    get id() {
        return this.#id;
    }
    get nunMesa() {
        return this.#numMesa;
    }
    get fechaDeTurno() {
        return this.#fechaDeTurno;
    }
    get estado() {
        return this.#estado;
    }
    get nombreCliente() {
        return this.#nombreCliente;
    }
    get comentario() {
        return this.#comentario;
    }
    get emailUsuarioCreador() {
        return this.#emailUsuarioCreador;
    }


    //SETTERS
    set id(id) {
        this.#id = id;
    }
    set nunMesa(numMesa) {
        if (!Object.values(ReservationMesa).includes(numMesa)) {
            throw new Error('Número de mesa no válido');
        }
        this.#numMesa = numMesa;
    }
    set fechaDeTurno(fechaDeTurno) {
        this.#fechaDeTurno = fechaDeTurno;
    }
    set estado(nuevoEstado) {
        if (!Object.values(ReservationState).includes(nuevoEstado)) {
            throw new Error('Estado no válido');
        }
        this.#estado = nuevoEstado;
    }
    set nombreCliente(nombreCliente) {
        this.#nombreCliente = nombreCliente;
    }
    set comentario(comentario) {
        this.#comentario = comentario;
    }
    set emailUsuarioCreador(emailUsuarioCreador) {
        this.#emailUsuarioCreador = emailUsuarioCreador;
    }


// Método para mostrar detalles de la reserva
mostrarDetalles() {
    return `
    Reserva ID: ${this.#id},
    numMesa: ${this.#numMesa},
    Fecha de Turno: ${this.#fechaDeTurno},
    Estado: ${this.#estado},
    Cliente: ${this.#nombreCliente},
    Comentario: ${this.#comentario},
    Email Usuario Creador: ${this.#emailUsuarioCreador}
    `;
}


//Método para serializar el objeto(se ejecuta automaticamente)
toJSON() {
    return {
        id: this.#id,
        numMesa: this.#numMesa,
        fechaDeTurno: this.#fechaDeTurno,
        estado: this.#estado,
        nombreCliente: this.#nombreCliente,
        comentario: this.#comentario,
        emailUsuarioCreador: this.#emailUsuarioCreador
    };
  }


}
