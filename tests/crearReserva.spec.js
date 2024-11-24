/*
// Mockear el servicio completo antes de importar cualquier cosa
jest.mock('../src/services/reservationService.js', () => ({
  esFechaTurnoValido: jest.fn(), // Mock de la función esFechaTurnoValido
}));

*/

import { jest } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Reservation from '../src/models/Reservation.js';
import User from '../src/models/User.js';
import { esFechaTurnoValido, crearReserva } from '../src/services/reservationService.js';
import request from 'supertest';
import app from '../src/app.js';

describe('Pruebas para crearReserva', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }


    // Mock del modelo User
    jest.mock('../src/models/User.js');
    User.findOne = jest.fn().mockResolvedValue({
      username: 'jp', // Simulamos que el usuario existe
    });
  });

  afterEach(async () => {
    await Reservation.deleteMany();
    jest.clearAllMocks(); // Limpia los mocks
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });


  //TEST 1:
  it('debería crear una reserva correctamente', async () => {
    const requestBody = {
      reserva: '4|2024-11-24T20:00:00.000Z',
      nombreCliente: 'Juan Pérez',
      comentario: 'Cena',
      usernameUsuarioCreador: 'jp',
    };

    const [numMesa, fechaDeTurno] = requestBody.reserva.split('|');
    const reservationData = {
      numMesa: parseInt(numMesa, 10),
      fechaDeTurno: fechaDeTurno,
      nombreCliente: requestBody.nombreCliente,
      comentario: requestBody.comentario,
      usernameUsuarioCreador: requestBody.usernameUsuarioCreador,
    };

    const nuevaReserva = await crearReserva(reservationData);

    expect(nuevaReserva).toHaveProperty('_id');
    expect(nuevaReserva.numMesa).toBe(4);
    expect(nuevaReserva.nombreCliente).toBe('Juan Pérez');
    expect(nuevaReserva.comentario).toBe('Cena');
    expect(nuevaReserva.usernameUsuarioCreador).toBe('jp');
    expect(nuevaReserva.estado).toBe('Pendiente');
  });




  //TEST 2:
  it('debería lanzar un error si la fecha no es válida', async () => {
    const reservationData = {
      numMesa: 4,
      fechaDeTurno: '2000-11-22T20:00:00.000Z',
      nombreCliente: 'Juan Pérez',
      comentario: 'Cena',
      usernameUsuarioCreador: 'jp',
    };

    await expect(crearReserva(reservationData)).rejects.toEqual({
      isClientError: true,
      message: `La reserva para la mesa ${reservationData.numMesa} en la fecha ${reservationData.fechaDeTurno} no es válida.`,
    });
  });
  


  //TEST 3:
  it('debería lanzar un error si el usuario no existe', async () => {
    const reservationData = {
      numMesa: 4,
      fechaDeTurno: '2024-11-24T20:00:00.000Z',
      nombreCliente: 'Juan Pérez',
      comentario: 'Cena',
      usernameUsuarioCreador: 'jp',
    };

    // Simulamos que el usuario "noExiste" no está en la base de datos
    User.findOne.mockResolvedValueOnce(null);  // Simula que el usuario no existe

    await expect(crearReserva(reservationData)).rejects.toThrow(
      `El usuario con username ${reservationData.usernameUsuarioCreador} no existe en la base de datos.`
    );
  });

});
