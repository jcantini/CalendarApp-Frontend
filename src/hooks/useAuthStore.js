// Este es un custom hook para manejar las peticiones asíncronas y de esta forma me evito
// de usar Thunks.
// Está encargado de realizar cualquier interacción con el slice auth en el store.

import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() ); // Pongo el status en checking mientra hago el login y valido credenciales
        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token); // guardo el token en local storega
            localStorage.setItem('token-init-date', new Date().getTime()); // guardo fecha de creación del token
                                    // me puede servir para validar si sigue vigente cuando haga una peticion

            dispatch( onLogin({ name: data.name, uid: data.uid }) );  // cargo la info del login en el store

        } catch (error) {
           dispatch( onLogout('Wrong Credentials') );
           setTimeout( () => {               // pongo un time out de 10 milisec para que me de tiempo a 
            dispatch( clearErrorMessage() ); // mostrar el error antes de limpiarlo
           }, 10)

        }
    }

    const startRegister = async({ email, password, name }) => {
        dispatch( onChecking() );
        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token); // guardo el token en local storega
            localStorage.setItem('token-init-date', new Date().getTime()); // guardo fecha de creación del token
                                    // me puede servir para validar si sigue vigente cuando haga una peticion

            dispatch( onLogin({ name: data.name, uid: data.uid }) );  // cargo la info del login en el store

        } catch (error) {
           dispatch( onLogout( error.response.data?.msg || 'Unexpected error') );
           setTimeout( () => {               // pongo un time out de 10 milisec para que me de tiempo a 
            dispatch( clearErrorMessage() ); // mostrar el error antes de limpiarlo
           }, 10)

        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token); 
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uid }) ); 
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }

    return {
        // Propiedades
        status, 
        user, 
        errorMessage,

        // Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}
