import ReservationModel from "../models/reservation/Reservation.js";
import { fileURLToPath } from "url";
import path from "path";
import * as functions from "../utils/function.js";
import { usuarioExiste, buscarUsuarioPorUsername } from "../services/userService.js";
import { ReservationMesa, ReservationTurnos,ReservationState, UserRol } from "../core/enums.js";
import { DateTime } from 'luxon';

export async function crearReserva(reservationData) {
  try {
    // Obtener la ruta del archivo de reservas
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const reservasFilePath = path.join(__dirname,"../models/reservation/reservation.json");
    // Leer las reservas existentes
    const reservasEnBase = await functions.leerArchivoJSON(reservasFilePath); //retorna un Object

    // Generar el nuevo ID y crear la nueva reserva
    const nuevoId = functions.generarNuevoId(reservasEnBase);
    const nuevaReserva = await crearNuevaReserva(nuevoId, reservationData);
    if(!nuevaReserva){
        return;
    }

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



export async function getReservasPorRolUsuario(username) {
  try {
    // Obtener la ruta del archivo de reservas
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const usuariosFilePath = path.join(__dirname,"../models/user/user.json");
    const reservasFilePath = path.join(__dirname,"../models/reservation/reservation.json");
    // Leer las reservas existentes
    const reservasEnBase = await functions.leerArchivoJSON(reservasFilePath); //retorna un Object

    // Filtro por tipo:
    const usuariosEnBase = await functions.leerArchivoJSON(usuariosFilePath);
    const usuarioEncontrado = buscarUsuarioPorUsername(usuariosEnBase, username);
    if(!usuarioEncontrado){
      throw {
        isClientError: true,
        message: `No se encontró ningún usuario registrado con el username: ${username}`};
    }

    let reservasSelected;
    if(usuarioEncontrado.rol === UserRol.CLIENTE){
        reservasSelected = filtrarReservasPorUsername(reservasEnBase, username);
    }else if (usuarioEncontrado.rol === UserRol.PERSONAL){
        reservasSelected = reservasEnBase;
    }

    return reservasSelected; // Retornar la nueva reserva
  } catch (error) {
    console.error("Error al  obtener las reservas:", error);
    throw error;
  }
}



export async function actualizarEstado(idReserva, nuevoEstado) {
    try {
      //ValidacionEStado
      if(!esEstadoValido(nuevoEstado)){
        throw {
          isClientError: true,
          message: `El estado: ${nuevoEstado} , no es un valor válido`};
      }

      // Obtener la ruta del archivo de reservas
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const reservasFilePath = path.join(__dirname,"../models/reservation/reservation.json");
      // Leer las reservas existentes
      const reservasEnBase = await functions.leerArchivoJSON(reservasFilePath); //retorna un Object

      // Buscar la reserva por id
      const reservaIndex = reservasEnBase.findIndex((reserva) => reserva.id == idReserva);
      if (reservaIndex == -1) { //sino encuentra coincidencia ,devuelve -1
        return null;
      }
      //Actualizo estado:
      // Buscar el índice del objeto que tenga el id que coincide
      reservasEnBase[reservaIndex].estado = nuevoEstado;

      // Guardar las reservas actualizadas en el archivo
      await functions.escribirArchivoJSON(reservasFilePath, reservasEnBase);
      return  reservasEnBase; // Retornar todas las reservas
    } catch (error) {
      console.error("Error al actualizar Estado: ", error);
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

      // Buscar la reserva por id
      const reservaIndex = reservasEnBase.findIndex((reserva) => reserva.id == idReserva);
      if (reservaIndex == -1) { //sino encuentra coincidencia ,devuelve -1
        return null;
      }
      //Elimino Objeto
      // Buscar el índice del objeto que tenga el id que coincide
      const reservaEliminada = reservasEnBase.splice(reservaIndex, 1)
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
      const reservasActivas = getReservasActivas(reservasEnBase);
      
      const totalTurnos = obtenerTotalDeturnos();
      const turnosDisponibles = eliminarTurnosOcupados(totalTurnos, reservasActivas)
  
      return turnosDisponibles; // Retornar la nueva reserva
    } catch (error) {
      console.error("Error al  buscar las reservas:", error);
      throw error;
    }
  }


export function filtrarReservasPorUsername(reservas, username) {
    return reservas.filter(reserva => reserva.usernameUsuarioCreador === username);
}

export function filtrarReservasPorId(reservas, id) {
    return reservas.filter(reserva => reserva.id == id);
}



//METODOS PRIVADOS
async function crearNuevaReserva(id, reservationData) {
  const { numMesa, fechaDeTurno, nombreCliente, comentario, usernameUsuarioCreador } = reservationData;
 if(await usuarioExiste(usernameUsuarioCreador)){
    return new ReservationModel(id,numMesa,fechaDeTurno,nombreCliente,comentario, usernameUsuarioCreador);
 }else{
    return;
 } 
}


function eliminarTurnosOcupados(totalDeTurnos, reservasActivas) {
  // Crear un conjunto para almacenar las combinaciones de mesa y fecha ocupadas
  const ocupados = new Set();

  // Llenar el conjunto con las reservas activas
  reservasActivas.forEach(reserva => {
    const clave = `${reserva.numMesa}|${reserva.fechaDeTurno}`;
    ocupados.add(clave);
  });

  // Filtrar los turnos que no están ocupados
  return totalDeTurnos.filter(turno => {
    const claveTurno = `${turno.mesa}|${turno.turno}`;
    return !ocupados.has(claveTurno);
  });
}

function obtenerTotalDeturnos(){
    const totalDeTurnos = [];
    Object.values(ReservationMesa).forEach(mesa => {
        Object.values(ReservationTurnos).forEach(turno => {
            totalDeTurnos.push({ mesa, turno });
        });
    });
    return totalDeTurnos;
}

function getReservasActivas(reservas ){
    return reservas.filter(reserva => 
         reserva.estado != ReservationState.CANCELADA && reserva.estado != ReservationState.CANCELADA );
}


function esEstadoValido(nuevoEstado) {
  return (Object.values(ReservationState).includes(nuevoEstado));
}

