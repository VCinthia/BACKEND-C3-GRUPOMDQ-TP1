import ReservationModel from "../models/reservation/Reservation.js";
import { fileURLToPath } from "url";
import path from "path";
import * as functions from "../utils/function.js";
import { usuarioExiste, buscarUsuarioPorEmail } from "../services/userService.js";
import { ReservationMesa, ReservationTurnos,ReservationState, UserRol } from "../core/enums.js";



export async function crearReserva(reservationData) {
  try {
    // Obtener la ruta del archivo de reservas
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const reservasFilePath = path.join(__dirname,"../models/reservation/reservation.json");
    console.log(" camino: ",reservasFilePath);
    // Leer las reservas existentes
    const reservasEnBase = await functions.leerArchivoJSON(reservasFilePath); //retorna un Object
    console.log("BASE:", reservasEnBase);

    // Generar el nuevo ID y crear la nueva reserva
    const nuevoId = functions.generarNuevoId(reservasEnBase);
    const nuevaReserva = await crearNuevaReserva(nuevoId, reservationData);
    if(!nuevaReserva){
        return;
    }
    console.log("Nueva Reserva:", nuevaReserva);

    // Agregar la nueva reserva al array de reservas
    reservasEnBase.push(nuevaReserva);

    // Guardar las reservas actualizadas en el archivo
    await functions.escribirArchivoJSON(reservasFilePath, reservasEnBase);

    return nuevaReserva; // Retornar la nueva reserva
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    throw error;
  }
}



export async function getReservasPorTipoUsuario(emailUser) {
  try {
    // Obtener la ruta del archivo de reservas
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const usuariosFilePath = path.join(__dirname,"../models/user/user.json");
    const reservasFilePath = path.join(__dirname,"../models/reservation/reservation.json");
    // Leer las reservas existentes
    const reservasEnBase = await functions.leerArchivoJSON(reservasFilePath); //retorna un Object
    console.log("ReservasBASE:", reservasEnBase);

    // Filtro por tipo:
    const usuariosEnBase = await functions.leerArchivoJSON(usuariosFilePath);
    console.log("UsuariosBASE:", usuariosEnBase);
    const usuarioEncontrado = buscarUsuarioPorEmail(usuariosEnBase, emailUser);
    if(!usuarioEncontrado){
        return { message: `No se encontró ningún usuario registrado con el email proporcionado.`};
    }
    console.log("UsuariosEncontrado:", usuarioEncontrado);
    let reservasSelected;
    if(usuarioEncontrado.rol === UserRol.CLIENTE){
        reservasSelected = filtrarReservasPorEmail(reservasEnBase, emailUser);
    }else if (usuarioEncontrado.rol === UserRol.PERSONAL){
        reservasSelected = reservasEnBase;
    }
    console.log("ReservasSElec:", reservasSelected);

    if(reservasSelected.length === 0){
        return { message: `No se encontró ninguna reserva registrada por el usuario: ${emailUser} `};
    }
    console.log("Reservas Selected:", reservasSelected);

    return reservasSelected; // Retornar la nueva reserva
  } catch (error) {
    console.error("Error al  buscar las reservas:", error);
    throw error;
  }
}



export async function actualizarEstado(idReserva, nuevoEstado) {
    try {
      // Obtener la ruta del archivo de reservas
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const reservasFilePath = path.join(__dirname,"../models/reservation/reservation.json");
      // Leer las reservas existentes
      const reservasEnBase = await functions.leerArchivoJSON(reservasFilePath); //retorna un Object
      console.log("ReservasBASE:", reservasEnBase);

      // Buscar la reserva por id
      const reservaIndex = reservasEnBase.findIndex((reserva) => reserva.id == idReserva);
      if (reservaIndex == -1) { //sino encuentra coincidencia ,devuelve -1
        return null;
      }
      //Actualizo estado:
      // Buscar el índice del objeto que tenga el id que coincide
      reservasEnBase[reservaIndex].estado = nuevoEstado;
      console.log("ReservasActualizadas: ", reservasEnBase);

      // Guardar las reservas actualizadas en el archivo
      await functions.escribirArchivoJSON(reservasFilePath, reservasEnBase);
      return  reservasEnBase; // Retornar todas las reservas
    } catch (error) {
      console.error("Error al  buscar las reservas:", error);
      throw error;
    }
  }
  


  export async function eliminarReservaPorId(idReserva) {
    try {
      // Obtener la ruta del archivo de reservas
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const reservasFilePath = path.join(__dirname,"../models/reservation/reservation.json");
      // Leer las reservas existentes
      const reservasEnBase = await functions.leerArchivoJSON(reservasFilePath); //retorna un Object
      console.log("ReservasBASE:", reservasEnBase);

      // Buscar la reserva por id
      const reservaIndex = reservasEnBase.findIndex((reserva) => reserva.id == idReserva);
      if (reservaIndex == -1) { //sino encuentra coincidencia ,devuelve -1
        return null;
      }
      //Elimino Objeto
      // Buscar el índice del objeto que tenga el id que coincide
      const reservaEliminada = reservasEnBase.splice(reservaIndex, 1)
      console.log("ReservasActualizadas: ", reservasEnBase);
      // Guardar las reservas actualizadas en el archivo
      await functions.escribirArchivoJSON(reservasFilePath, reservasEnBase);
      return  reservasEnBase; // Retornar las reservas que quedaron
    } catch (error) {
      console.error("Error al  buscar las reservas:", error);
      throw error;
    }
  }



  export async function getFechaTurnosDisponibles() {
    try {
      // Obtener la ruta del archivo de reservas
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const reservasFilePath = path.join(__dirname,"../models/reservation/reservation.json");
      const reservasEnBase = await functions.leerArchivoJSON(reservasFilePath); //retorna un Object
      console.log("ReservasBASE:", reservasEnBase);
      const reservasActivas = getReservasActivas(reservasEnBase);

      const totalTurnos = obtenerTotalDeturnos();
      const turnosDisponibles = eliminarTurnosOcupados(totalTurnos, reservasActivas)

      console.log("TurnosDisponibles", turnosDisponibles);
  
      return turnosDisponibles; // Retornar la nueva reserva
    } catch (error) {
      console.error("Error al  buscar las reservas:", error);
      throw error;
    }
  }





export function filtrarReservasPorEmail(reservas, email) {
    return reservas.filter(reserva => reserva.emailUsuarioCreador === email);
}

export function filtrarReservasPorId(reservas, id) {
    return reservas.filter(reserva => reserva.id == id);
}



//METODOS PRIVADOS
async function crearNuevaReserva(id, reservationData) {
  const { numMesa, fechaDeTurno, nombreCliente, comentario, emailUsuarioCreador } = reservationData;
 if(await usuarioExiste(emailUsuarioCreador)){
    return new ReservationModel(id,numMesa,fechaDeTurno,nombreCliente,comentario, emailUsuarioCreador);
 }else{
    return;
 } 
}

//todo: verificar conversion hora
function eliminarTurnosOcupados(totalDeTurnos, reservasActivas) {
    return totalDeTurnos.filter(turno => {
        return !reservasActivas.some(reserva => {
            // Convertir los strings a objetos Date
            const fechaReserva = new Date(reserva.fechaDeTurno);
            const fechaTurno = new Date(turno.turno); 
            console.log("RESERVA: "+fechaReserva+" TURNO: "+fechaTurno);
            
            // Comparar numMesa y las fechas
            return reserva.numMesa === turno.mesa && fechaReserva.getTime() === fechaTurno.getTime();
        });
    });
}

function obtenerTotalDeturnos(){
    const totalDeTurnos = [];
    Object.values(ReservationMesa).forEach(mesa => {
        Object.values(ReservationTurnos).forEach(turno => {
            totalDeTurnos.push({ mesa, turno });
        });
    });
    console.log("TotalTurnos: ",totalDeTurnos);
    return totalDeTurnos;
}

function getReservasActivas(reservas ){
    return reservas.filter(reserva => 
         reserva.estado != ReservationState.CANCELADA);
}