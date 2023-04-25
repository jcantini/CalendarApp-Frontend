import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { convertEventsToDate } from '../helpers'
import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent }  = useSelector( state => state.calendar );
    const { user }   = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent) => {
        dispatch( onSetActiveEvent( calendarEvent) )
    }

    // Voy a usar una técnica diferente al thunk. Voy a disparar acciones siempre síncronas en lugar de 
    // thunks asíncronos
    const startSavingEvent = async( calendarEvent ) => {
      
        try {
            // Update event
            if ( calendarEvent.id ) {
                // Estoy Actualizando   
                await calendarApi.put( `/events/${ calendarEvent.id }`, calendarEvent );
                dispatch(onUpdateEvent( { ...calendarEvent, user } )); // (1)
                return;
            }
            // New event
            const { data } = await calendarApi.post('/events', calendarEvent );
        dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) ) // (2)   

        } catch (error) {
            console.log(error);
            Swal.fire('Error saving event', error.response.data.msg, 'error')
        }
    }

    const startLoadingEvents = async () => { // (1)
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDate ( data.events );
            dispatch( onLoadEvents( events ) );
 
        } catch (error) {
            console.log('Error while loading events');
            console.log(error);
        }
    }

    const startDeletingEvent = async () => {
        try { 
            await calendarApi.delete( `/events/${ activeEvent.id }` );
            dispatch( onDeleteEvent() );
            return;
             
        } catch (error) {
            console.log(error);
            Swal.fire('Error deleting event', error.response.data.msg, 'error')
        }
    }

    return {        
        // Propeties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent, // defino una propiedad para indicar si tendo seleccionado un evento
                                          // !! es para convertir el null en false  
        // Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }

}

/*
    Tengo que considerar de que como grabé las fechas como string, ahora las recibo como strings por lo 
    que necesito convertirlas a tipo date para que el calendario pueda renderizarlas porque así las espera.
    Para esto uso la función  que cree en helpers/convertEventsToDate.js

    (1)
    Mando un nuevo objeto abierto en sus propiedades y el usuario que esta loqgueado para que quede 
    registrado quien realizo el cambio.

    (2)
    Una vez agregado el evento al back, lo agrego en el store completándole el id que me devolvió el back
    le coloco el usuario logueado que lo tomo del store.

*/