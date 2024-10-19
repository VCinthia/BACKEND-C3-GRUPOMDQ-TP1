import express from "express";
import * as reservationController from '../controllers/reservationController.js';
const routerReservation = express.Router();



//Rutas para reservaciones
routerReservation.get('/disponibles', reservationController.obtenerFechaTurnosDisponibles);

routerReservation.get('/:emailUser', reservationController.obtenerReservasPorTipoDeUsuario);
routerReservation.post('/', reservationController.crearReserva);
routerReservation.put('/:id/:nuevoEstado', reservationController.actualizarEstadoReserva);
routerReservation.delete('/:id', reservationController.eliminarReserva);


export default routerReservation;