// Slice para manejar el state y las actions referidas a la autenticación (1)

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
       status: 'cheking', // 'authenticated', 'not-authenticated'
       user: {}, // info del usuario
       errorMessage: undefined
    },
    reducers: {
        onChecking: (state, /* action */) => { // para chequear si el usuario esta autenticado
       //     state.status = 'cheking';
            state.user   = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload } ) => { 
            state.status = 'authenticated'; // si estoy ejecutando onLogin => que el usuario ya fue autenticado
            state.user   = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user   = {};
            state.errorMessage = payload;
        //    localStorage.clear();
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    }
});


export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;

/*
    Normalmente para manejar las actions que impliquen código asíncrono se trabaja usando thunks. 
    En esta app no los voy a usar porque voy a utilizar otra técnica que consiste en que todo el código
    al momento de hacer el dispatch de una action sea síncrono. Para esto va a ser necesario crear unos hooks.
*/
