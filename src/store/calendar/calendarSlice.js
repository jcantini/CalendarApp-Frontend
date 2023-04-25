
import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
       isLoadingEvents: true,  // para indicar si estoy cargando los eventos
       events: [],
       activeEvent: null
    },
    reducers: {
        onSetActiveEvent: ( state, { payload }) => { // cargo en el store la info del evento activo
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload }) => { // el paylod es el evento nuevo
            state.events.push( payload ); // esto es posible por el redux-toolkit
            state.activeEvent = null; // limpio el evento activo
        },
        onUpdateEvent: ( state, { payload }) => {
            state.events = state.events.map( event => {
                if (event.id === payload.id) {
                    return payload;
                }
                return event;
            })
            state.activeEvent = null; // limpio el evento activo
        },
        onDeleteEvent: ( state ) => { // no necesito payload xq el que elimino es el evento activo
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            // state.events = payload; // (1)
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id); // (2)
                if ( !exists ) {
                    state.events.push( event )
                }
            });
        },
        onLogoutCalendar: ( state ) => {
            state.isLoadingEvents = true,
            state.events          = [],
            state.activeEvent     = null
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar  } = calendarSlice.actions;

/* 
(1)
    con esta instrucción sola ya funciona la carga de los eventos en el store pero si quiero utilizar
    esta action en otros lugares es mejor hacerla de la forma en que quedó. Lo que hago es barrer el payload 
    que tiene todos los eventos de la db y chequeo contra el store comparando por el id para ver si hay alguno 
    que no este cargado.
    Si lo tengo no hago nada pero si no lo tengo, lo agrego.
(2)
    Uso some() xq me devuelve true o false mientras que find me devuelve un objeto, por eso no me sirve
*/