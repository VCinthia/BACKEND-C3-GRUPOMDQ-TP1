
# TP1 GrupoMDQ - Caso 3 | Entrega 2

Este proyecto entregable 2 es una aplicación que responde al Caso 3 para gestionar reservas y usuarios en un restaurante.

### Integrantes:

- Cynthia Estefanía Choque Galindo | Controles, rutas de Reservation, Core y Service, configuración de MongoDB Atlas
- Guido Vizzotti | Model de Reservation, implementación de tests con Jest
- Matías Garnica | Vistas, implementación de autenticación JWT
- Mauricio Galera | Controles y rutas de usuarios
- Cinthia Romina Vota | Documentación, estructura y model de User, implementacion de bcrypt

### Repositorio GitHub:

1. [Repositorio](https://github.com/VCinthia/BACKEND-C3-GRUPOMDQ-TP1)
2. [Deploy Vercel](https://backend-c3-grupomdq-tp-1.vercel.app/api)


## Estructura del Proyecto

La aplicación está organizada en varias carpetas según las responsabilidades del sistema, incluyendo controladores, modelos, rutas, servicios, vistas, utilidades y configuraciones.

### Estructura de Carpetas

```
└── 📁caso3-grupomdq
    └── 📁public
        └── 📁images
        └── 📁javascripts
        └── 📁stylesheets
            └── style.css
    └── 📁src
        └── 📁config
            └── database.js
        └── 📁controllers
            └── reservationController.js
            └── userController.js
        └── 📁core
            └── const.js
            └── enums.js
        └── 📁models
            └── Reservation.js
            └── User.js
        └── 📁routes
            └── index.js
            └── reservationRoutes.js
            └── userRoutes.js
        └── 📁services
            └── reservationService.js
            └── userService.js
        └── 📁utils
            └── function.js
        └── 📁views
            └── error.pug
            └── index.pug
            └── main.pug
            └── newReservation.pug
            └── reservationConfirmed.pug
            └── reservationList.pug
        └── app.js
    └── 📁tests
        └── crearReserva.spec.js
    └── .env
    └── .gitignore
    └── .jest.config.js
    └── nodemon.json
    └── package-lock.json
    └── package.json
    └── README.md
    └── vercel.json
```

### Descripción General

El sistema permite a los usuarios hacer, modificar y gestionar reservas en un restaurante. El personal tiene acceso para gestionar todas las reservas, mientras que los clientes solo pueden ver y gestionar sus propias reservas.

### Entidades

#### 1. **Users**
- **ESTRUCTURA**: `nombre`, `apellido`, `username`, `rol` y `contraseña`.
   - **Modelo**: Definido en `User.js`, que representa la clase `User`.
   - **Controlador**: `userController.js`, contiene la lógica para gestionar los usuarios (CRUD).
   - **Rutas**: Definidas en `userRoutes.js`.

#### 2. **Reservations**
- **ESTRUCTURA**: `numMesa`, `fechaDeTurno`, `estado`, `nombreCliente`, `comentario` y `usernameUsuarioCreador`.
   - **Modelo**: Definido en `Reservation.js`, representa la clase `Reservation`.
   - **Controlador**: `reservationController.js`, contiene la lógica para gestionar las reservas.
   - **Rutas**: Definidas en `reservationRoutes.js`.

### Controladores

Los controladores gestionan la lógica de negocio para las principales funcionalidades:

- **userController.js**: Lógica para crear, listar, actualizar y eliminar usuarios.
- **reservationController.js**: Lógica para crear, listar, actualizar y eliminar reservas.

### Servicios

Los servicios encapsulan la lógica relacionada con la interacción con los modelos y la validación de datos:

- **userService.js**: Servicio para la lógica de los usuarios.
- **reservationService.js**: Servicio para la lógica de las reservas.

### Core

La carpeta **core** contiene constantes y enumeraciones que son utilizadas a lo largo del proyecto para definir valores clave:

- **const.js**: Define las constantes globales del sistema.
   - **Ejemplo**: 
     ```javascript
     export const baseAPI = '/api';
     ```
   
- **enums.js**: Define las enumeraciones (`enums`) utilizadas en todo el sistema, como estados de las reservas (`PENDIENTE`, `CONFIRMADA`, etc.), roles de usuario (`CLIENTE`, `PERSONAL`), y las horas y mesas disponibles para reservas.
   - **Ejemplo**: 
     ```javascript
     export const ReservationState = {
        PENDIENTE: 'Pendiente',
        CONFIRMADA: 'Confirmada',
        CANCELADA: 'Cancelada',
        COMPLETADA: 'Completada'
     };
     ```
   - Utiliza la función `crearFechaUTC` para definir los turnos de las reservas.

### Utils

La carpeta **utils** contiene funciones de utilidad que son utilizadas a lo largo del sistema:

- **function.js**: Define funciones para utilizadas en varios procesos de la aplicación.

   - **Ejemplo**: 
     ```javascript
     export function crearFechaUTC(horas, minutos, diasASumar = 0) {
        //...
     }
     ```

### Rutas

Las rutas definen los endpoints del sistema y conectan las solicitudes del usuario con los controladores:

- **userRoutes.js**: Define las rutas relacionadas con los usuarios.
- **reservationRoutes.js**: Define las rutas relacionadas con las reservas.
- **index.js**: Punto de entrada principal para las rutas.

### Vistas (Pug)

Las vistas renderizan la interfaz de usuario utilizando el motor de plantillas Pug:

- **index.pug**: Pantalla de login.
- **main.pug**: Pantalla principal después de iniciar sesión.
- **reservationList.pug**: Muestra la lista de reservas.
- **newReservation.pug**: Permite agregar una nueva reserva.
- **reservationConfirmed.pug**: Pantalla de confirmación de reserva.
- **error.pug**: Pantalla de error para manejar excepciones.

### Nuevas Implementaciones

1. **MongoDB Atlas**:
   - Los datos de usuarios y reservas se gestionan en la nube con MongoDB Atlas.
   - Configurado en `src/config/database.js`.

2. **bcrypt**:
   - Utilizado para encriptar las contraseñas de los usuarios antes de almacenarlas en la base de datos y para la comparativa en el ingreso de usuarios.

3. **JWT (JSON Web Tokens)**:
   - Autenticación basada en tokens para usuarios.
   - Implementado en el controlador de usuarios.

4. **Jest**:
   - Tests unitarios y de integración para verificar la funcionalidad del metodo para crear reservas.
   - MongoMemoryServer se utiliza para emular una base de datos MongoDB en memoria durante los tests, proporcionando un entorno aislado y seguro para pruebas.
   - Archivo de configuración: `jest.config.js`.


### Configuración del Proyecto

1. **Dependencias**: 
   Las dependencias principales están listadas en `package.json`.
   
   - **Instalar todas las dependencias**:
     ```bash
     npm install
     ```

2. **Scripts**:
   - **Inicio del servidor**:
     ```bash
     npm start
     ```
   - **Desarrollo con nodemon**:
     ```bash
     npm run dev
     ```
   - **Tests**:
     ```bash
     npm test
     ```

### Configuración del Servidor en local

El servidor está configurado en el archivo `app.js`, utilizando **Express**. Las rutas están conectadas y se renderizan vistas mediante **Pug**. El servidor por defecto corre en el puerto `3000` para local. 

El archivo `nodemon.json` está configurado para monitorear cambios en los archivos dentro de la carpeta `src`.

### Variables de Entorno

El archivo `.env` incluye las variables de entorno que tanto para puertos como para la base de datos de MongoDB Atlas.

### Cómo Ejecutar el Proyecto en Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar el servidor**:
   En modo de desarrollo:
   ```bash
   npm run dev
   ```
   O para producción:
   ```bash
   npm start
   ```

3. **Acceder al proyecto**:
   El servidor estará corriendo en `http://localhost:3000/api`.


### Fuentes:

A continuación, se listan las bibliotecas y herramientas utilizadas en el desarrollo de este proyecto:

1. [Node.js](https://nodejs.org/en/): Entorno de ejecución de JavaScript para el backend.
2. [Express.js](https://expressjs.com/): Framework web minimalista para Node.js.
3. [Pug](https://pugjs.org/api/getting-started.html): Motor de plantillas utilizado para generar vistas HTML.
4. [dotenv](https://www.npmjs.com/package/dotenv): Módulo para cargar variables de entorno desde archivos `.env`.
5. [File System (fs)](https://nodejs.org/api/fs.html): Módulo nativo de Node.js para interactuar con el sistema de archivos.
6. [Nodemon](https://nodemon.io/): Herramienta para reiniciar el servidor automáticamente en modo desarrollo.
7. [Luxon](https://moment.github.io/luxon/): Biblioteca para manipulación de fechas y horas.
8. [JSON](https://www.json.org/json-en.html): Formato de intercambio de datos utilizado para almacenar y transferir información para la primera entrega.
9. [Aprende Node.js y Express - Curso desde Cero](https://www.youtube.com/watch?v=1hpc70_OoAg): Fundamentos de Node.js y Express.
10. [bcrypt] (https://www.npmjs.com/package/bcrypt): Encriptación de contraseñas.
11. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Generación y verificación de tokens JWT.
12. [Jest](https://jestjs.io/): Framework de testing en JavaScript.
13. [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database): Base de datos en la nube.
14. [Mongoose](https://mongoosejs.com/): ODM para MongoDB.
15. [MongoMemoryServer](https://www.npmjs.com/package/mongodb-memory-server): Base de datos MongoDB en memoria utilizada para tests, evitando interactuar con la base de datos en producción o desarrollo.

---

## **Dockerización**:

### Ejecutar en local con Docker:

Desde la raíz del proyecto, ejecutar:

```bash
docker build -t reservas-app .
docker run -p 3000:3000 --env-file .env reservas-app
