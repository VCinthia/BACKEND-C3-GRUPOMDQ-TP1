
# Documentación del Proyecto: **CASO3-GRUPOMDQ**

### Índice:
1. [Descripción General](#descripcion-general)
2. [Entidades](#entidades)
   - [Users](#users)
   - [Reservations](#reservations)
3. [Controladores y Rutas](#controladores-y-rutas)
4. [Vistas](#vistas)
5. [Utilidades (Utils)](#utilidades-utils)
6. [Cómo correr el proyecto](#como-correr-el-proyecto)

---

## Descripción General
Este proyecto consiste en un sistema de gestión de usuarios y reservas. Cada entidad está modelada en formato JSON y a través de clases en JavaScript. Los controladores definen la lógica para interactuar con los datos, mientras que las rutas configuran los endpoints para la interacción con la API. El proyecto también incluye vistas para interactuar con el sistema a través de una interfaz web y utilidades compartidas.

---

## Entidades

### Users

**Modelado:**

- **JSON** (`users.json`): El archivo JSON contiene la estructura de los usuarios con atributos como `nombre`, `apellido`, `username`, `rol` (Cliente/Personal), y `password`.

- **Clase JS** (`Users.js`): El modelo en JavaScript define la clase `User` con los mismos atributos mencionados anteriormente. Incluye métodos para crear y manipular usuarios.

### Reservations

**Modelado:**

- **JSON** (`reservations.json`): Este archivo almacena la información de las reservas, como `usuario`, `fecha`, `mesa`, `estado` (pendiente, confirmada, cancelada).

- **Clase JS** (`Reservations.js`): Define la clase `Reservation`, con atributos como el `usuario`, `fecha`, `mesa`, `estado` y `usernameUsuarrioCreador`.

---

## Controladores y Rutas

### Controladores

- **UsersController.js** (`src/controllers/userController.js`): Este archivo contiene la lógica relacionada con los usuarios, como listar todos los usuarios, crear un nuevo usuario, y modificar la información de los usuarios.

- **ReservationsController.js** (`src/controllers/reservationController.js`): Define la lógica relacionada con las reservas, como listar todas las reservas, crear una nueva reserva, y cambiar el estado de las reservas.

### Rutas

Las rutas usan las funciones de los controladores para definir los endpoints.

- **Rutas para Usuarios** (`src/routes/users.js`)

- **Rutas para Reservas** (`src/routes/reservations.js`)

---

## Vistas

Las vistas están diseñadas para que los usuarios puedan interactuar con el sistema. Se renderizan a través de `Pug` en las siguientes pantallas:

1. **Login**: Pantalla inicial para iniciar sesión.
2. **Pantalla Principal** (Dependiendo del rol): 
   - Si es cliente, puede gestionar sus reservas.
   - Si es personal, puede gestionar todas las reservas.
3. **Lista de Reservas**: Permite ver una lista de reservas con un filtro por tipo de usuario.
4. **Modificar Estado**: Los usuarios del personal pueden cambiar el estado de una reserva de 'Pendiente' a 'Confirmada' o eliminar una reserva.
5. **Agregar Reserva**: Los clientes pueden crear una nueva reserva seleccionando la fecha y la mesa de una lista predefinida.
6. **Logout**: Cierra la sesión y redirige al login.


---

## Utilidades (Utils)

La carpeta `utils` incluirá funciones comunes que serán utilizadas por todos los desarrolladores. Aquí se almacenarán funciones reutilizables que no pertenecen a una entidad específica.

Ejemplos de posibles utilidades:
- Funciones de validación de datos.
- Funciones de manejo de fechas y horas.

---

## Cómo correr el proyecto

Para ejecutar el proyecto en un entorno de desarrollo, sigue estos pasos:

1. Asegúrate de tener instaladas todas las dependencias:
   ```bash
   npm install
   ```

2. Ejecuta el servidor usando `nodemon` (recomendado para desarrollo):
   ```bash
   npx nodemon src/app.js
   ```

   O si tienes `nodemon` instalado globalmente:
   ```bash
   nodemon src/app.js
   ```

3. El servidor estará escuchando en el puerto 3000 (puedes configurarlo en `app.js`):
   ```bash
   http://localhost:3000
   ```

