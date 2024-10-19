import * as reservationService from '../services/reservationService.js';
const MSG_ERROR_500 = 'Error interno del servidor. Por favor, inténtalo de nuevo más tarde.';

export async function crearReserva( req, res) {
    try {
        console.log("REQUEST CONTROLLER: " ,req.body);
        const nuevaReserva = await reservationService.crearReserva(req.body);
        if(!nuevaReserva) return res.status(404).json({ message: `El usuario con email: ${req.body.emailUsuarioCreador}, no está registrado en la base de datos ` }); 
        res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error("Error en el controlador:", error);
        if (error.isClientError) {
            return res.status(error.statusCode || 400).json({ message: error.message });
        }
        return res.status(500).json({ message: MSG_ERROR_500});
    }
};



export async function obtenerReservasPorTipoDeUsuario (req, res) {
    try {
        const reservas = await reservationService.getReservasPorTipoUsuario(req.params.emailUser);
        if (!reservas ) {return res.status(404).json({ message: 'No se encontraron reservas' });}
        else if(reservas.message){
            return res.status(400).json({ message: reservas.message });
        }
        res.json(reservas);
    } catch (error) {
        console.error("Error en el controlador:", error);
        if (error.isClientError) {
            return res.status(error.statusCode || 400).json({ message: error.message });
        }
        return res.status(500).json({ message: MSG_ERROR_500});
    }
};


export async function actualizarEstadoReserva (req, res) {
    try {
        const reservas = await reservationService.actualizarEstado(req.params.id, req.params.nuevoEstado);
        if (!reservas) return res.status(404).json({ message: `No se encontró la reserva con id: ${req.params.id}` });
        res.json(reservas);
    } catch (error) {
        console.error("Error en el controlador:", error);
        if (error.isClientError) {
            return res.status(error.statusCode || 400).json({ message: error.message });
        }
        return res.status(500).json({ message: MSG_ERROR_500 });
    }
};


export async function eliminarReserva (req, res) {
    try {
        const reservas = await reservationService.eliminarReservaPorId(req.params.id);
        if (!reservas) return res.status(404).json({ message: `No se encontró la reserva con id: ${req.params.id}` });
        res.json(reservas);
    } catch (error) {
        console.error("Error en el controlador:", error);
        if (error.isClientError) {
            return res.status(error.statusCode || 400).json({ message: error.message });
        }
        return res.status(500).json({ message: MSG_ERROR_500});
    }
};



export async function obtenerFechaTurnosDisponibles (req, res) {
    try {
        const fechaTurnosDisponibles = await reservationService.getFechaTurnosDisponibles();
        res.json(fechaTurnosDisponibles);
    } catch (error) {
        console.error("Error en el controlador:", error);
        if (error.isClientError) {
            return res.status(error.statusCode || 400).json({ message: error.message });
        }
        return res.status(500).json({ message: MSG_ERROR_500});
    }
};
