Entidades: 
    - Users
    - Reservations

---
Users:

Modelado (x cada entidad)
    -json //Cin
    -js (clase) //Cin

Controllers
    - entidadController.js // Mauri

Routes
    - entidad.js (usa funciones de controlador para las rutas) // Mauri

---
Reservations:

Modelado (x cada entidad)
    -json // Guido
    -js (clase) // Guido
Controllers
    - entidadController.js  //Cyn

Routes
    - entidad.js (usa funciones de controlador para las rutas)  //Cyn

----

Utils -> veremos
    - Solo funciones que usemos todos

Views //Mati
    - Login
    - Pantalla princial Main (ver si es x usuario o por cliente/personal)
        - Lista Reservas (ver si va con input segun tipo usuario)
            - Modificar Estado Pendiente(Pasar a Confirmar) o Eliminar reserva (ATENTO REFRESH)
        - Agregar Reserva (Crea Pendientes | Trae lista desde json con hora, mesa, etc ya predefinidas)
        - Logout -> vuelve al Login

---



Para correr proyecto:

npx nodemon src/app.js
