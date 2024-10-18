import { DateTime } from 'luxon';



/**
 * Retorna una fecha Personalizada en formato ISO
 * @param {number} horas
 * @param {number} minutos
 * @param {number} diasASumar - que se suman a la fecha de hoy
 * @returns la fecha en formato ISO
 */
export function crearFechaUTC(horas, minutos, diasASumar = 0) {
    const hoy = DateTime.local();
    const fechaConDias = hoy.plus({ days: diasASumar });
    const fechaAjustada = fechaConDias.set({ hour: horas, minute: minutos, second: 0, millisecond: 0 });
    const fechaComoUTC = fechaAjustada.setZone('utc', { keepLocalTime: true }); // Convierto a UTC manteniendo la hora local
    return fechaComoUTC.toISO();
}




/**
 * Genera el próximo ID para un array de objetos que contienen una propiedad "id".
 * @param {Array<Object>} objetosConId - Un array de objetos, cada uno con una propiedad "id".
 * @returns {number} el número del id correlavito al ultimo objeto
 */
export function generarNuevoId(objetosConId) {
    if (objetosConId.length > 0) {
        const ultimoObjeto = objetosConId[objetosConId.length - 1];
        return ultimoObjeto.id + 1;
    }
    return 1; // Si el array está vacío, el ID será 1
}





