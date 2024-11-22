import mongoose from 'mongoose';
import { ReservationMesa, ReservationState } from '../core/enums.js';
import { Schema } from 'mongoose';



const reservationSchema = new Schema({
    numMesa: {
        type: Number,
        required: true,
        enum: Object.values(ReservationMesa) 
    },
    fechaDeTurno: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: ReservationState.PENDIENTE, 
        enum: Object.values(ReservationState) 
    },
    nombreCliente: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: false 
    },
    usernameUsuarioCreador: {
        type: String,
        required: true
    }
}, { timestamps: true }); // campos createdAt y updatedAt

// Crear el modelo
const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;