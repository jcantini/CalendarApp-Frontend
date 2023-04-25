/* Creo una instancia de Axios para hacer las llamadas a Axios. Haciendolo así, no tengo que estar 
   especificando la url de conexión en cada lugar donde necesite hacer una petición. 
   Este archivo me sirve para gestionar todos los accesos a Calendar Backend.
   Si tuviera otros backend a los que accedo, me creo un archipo similar por cada backend que necesite acceder.
*/


import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables(); // obtengo la variable de entorno con la url base

const calendarApi = axios.create({ // (1)
    baseURL: VITE_API_URL
});

// Interceptores 
// Es algo particular que tiene Axios que me permite interceptar una petición antes o después de que se haga 
// y así puedo añadir o modificar la respuesta o la petición.

// Agrego un interceptor para una req/request. Se va a ejecutar para para todas las peticiones que soliciten.
calendarApi.interceptors.request.use( config => {

    config.headers = { // le agrego un header a cualquier petición, conservando los headers que ya vengan
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default calendarApi; // (2)


/*
(1)
Esta instancia que creo de axios me sirve para que no tenga que estar especificando por ej
la base de la url que quiero acceder x ej me evito axios.get('http://localhost:4000/api' + '/auth/new') 
Directamente llamo a calendarApi que ya va a tener configurada la url base.

(2)
Uso export default porque la configuración de los interceptores la hago más abajo y? Sera que quiero que
calendarApi sea la de default. Se podria también hacer como un export normal.
*/