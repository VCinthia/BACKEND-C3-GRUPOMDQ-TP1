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
    // Referencia al usuario creador
    usernameUsuarioCreador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo User
        required: true,
        validate: {
            validator: async function(v) {
                const user = await User.findOne({ username: v });
                return !!user; // Si el usuario con ese username existe, devuelve true
            },
            message: props => `El usuario con username ${props.value} no existe en la base de datos.`
        }
    }
}, { timestamps: true }); // campos createdAt y updatedAt

// Crear el modelo
const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;