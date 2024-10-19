import express from "express";
import * as reservationController from '../controllers/reservationController.js';
const router = express.Router();



//Rutas para reservaciones
router.get('/disponibles', reservationController.obtenerFechaTurnosDisponibles);

router.get('/:emailUser', reservationController.obtenerReservasPorTipoDeUsuario);
router.post('/', reservationController.crearReserva);
router.put('/:id/:nuevoEstado', reservationController.actualizarEstadoReserva);
router.delete('/:id', reservationController.eliminarReserva);


export default router;