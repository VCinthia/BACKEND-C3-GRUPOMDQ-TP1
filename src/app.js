/*
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
*/

//utilizando módulos ES (ECMAScript Modules)
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import userRouters from './routes/userRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import { fileURLToPath } from 'url';
import dotnet from 'dotenv'
import { baseAPI } from './core/const.js';

const app = express();
const PUERTO = process.env.PORT || 3000;


// Simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//lo coloqué antes de las rutas y cambié a true para que se pueda enviar el form del login
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.get('/', function (req, res) {
  res.render('index');
});

app.get('/main', function (req, res) {
  res.render('main');
});

app.get('/newReservation', function (req, res) {
  res.render('newReservation');
});

app.get('/reservationList', function (req, res) {
  res.render('reservationList');
});


//lo agregué para probar si funciona el login (Mati)
app.post('/main', (req, res) => {
    const { username, password } = req.body;
    // validación de credenciales y condicional
    
    res.render('main');
});


app.use(logger('dev'));
app.use(express.json());  // Middleware para analizar el cuerpo de la solicitud
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

//DEFINICION DE RUTAS
app.use(baseAPI+'/', indexRouter);
app.use(baseAPI+'/users', userRouters);
app.use(baseAPI+'/reservations', reservationRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//INICIO DEL SERVIDOR
app.listen(PUERTO, () => {//VER SI HAY QUE CAMBIARLO PARA RENDERIZAR EN EL NAVEGADOR
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});





//module.exports = app;
export default app;