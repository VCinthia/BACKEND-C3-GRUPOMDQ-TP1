import User from '../models/user/User.js'
import Reservation from '../models/reservation/Reservation.js';
import { UserRol } from './enums.js';


export const userJson = '../models/users/users.json';





// Crear una instancia de User
export const usuarioCliente1 = new User('Juan', 'Pérez', 'juan.perez@gmail.com', UserRol.CLIENTE,'passJuan');
export const usuarioCliente2 = new User('Ana', 'García', 'ana.garcia@gmail.com', UserRol.CLIENTE, 'passAna');
export const usuarioPersonal1 = new User('Carlos', 'López', 'carlos.lopez@gmail.com', UserRol.PERSONAL, 'passCarlos');




// Crear una instancia de Reservation
export const reserva1 = new Reservation(1, 5, ReservationTurnos.HOY_TURNO_UNO, 'Carlos Lopez', 'Soy celiaco', usuarioCliente1);
export const reserva2 = new Reservation(2, 3, ReservationTurnos.HOY_TURNO_DOS, 'Ana García', 'Vegetariana', usuarioCliente2);
export const reserva3 = new Reservation(3, 8, ReservationTurnos.MANIANA_TURNO_UNO, 'Carlos López', 'Sin lactosa', usuarioPersonal1);







