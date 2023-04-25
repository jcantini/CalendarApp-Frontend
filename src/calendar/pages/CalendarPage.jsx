import { useEffect, useState } from 'react';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';

import { localizer, getMessages } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

export const CalendarPage = () => {

    const { user } = useAuthStore(); // Tomo el usuario que esta logueado
    const { openDateModal } = useUiStore() ;
    const { events, setActiveEvent, startLoadingEvents }  = useCalendarStore();

    const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'month');  

    const eventStyleGetter = ( event, start, end, isSelected )  => {
    // console.log({ event, start, end, isSelected}) // me muestra esta info de los events que le pase
    // El evento se va a disparar cuando suceda algo en el calendario ej hago click

        const isMyEvent = ( user.uid === event.user._id) || ( user.uid === event.user.uid) // (1)

        const style = { // Es para darle un estilo al evento es opcional
            backgroundColor: isMyEvent ? '#347CF7' : '#465660', // defino el color segun pertenece o no el evento
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    };

    const language = 'en-US'; // 'en-US' 'es'

    const onDoubleClick = ( event ) => {
        openDateModal();
    }

    const onClick = ( event ) => {
        setActiveEvent( event ); // Paso el evento seleccionado como el evento activo
    }

    const onViewChanged = ( event ) => {  // cuando se cambia la vista a semana, dia, etc
        localStorage.setItem('lastView', event); // guardo la vista actual en el local Storage para que al 
        setLastView( event );                    // recargar  sigamos en la misma vista 
    }   
    
    useEffect( () => {
        startLoadingEvents()
     }, []); // lo disparo una sola vez para cargar los eventos que tengo en el backend


  return (
    <>
        <Navbar />

        <Calendar
            culture={ language } 
            localizer={localizer}
            events={ events }
            startAccessor="start"
            defaultView={ lastView }
            endAccessor="end"
            style={{ height: 'calc(100vh - 80px' }} 
            messages={ getMessages( language ) }
            eventPropGetter={ eventStyleGetter }
            components={{
                event: CalendarEvent
            }}
            onDoubleClickEvent={ onDoubleClick }
            onSelectEvent={ onClick }
            onView={ onViewChanged }
        />

        <CalendarModal/>

        <FabDelete/>
        
        <FabAddNew/>
       

    </>
  )
}

/* Calendar propiedades:

 culture es para indicarle el idioma con que quiero que use para los dias. Esto lo toma de un objeto locales 
 definido en helpers/calendarLocalizer.js  Para que salgan en español pongo culture='es'.
 Para el resto de los textos que no se traducen automáticamente uso helpers/getMessagesES().

 En style le indico que tome de tamaño el 100% de view higth - la altura del navbar 80px

 messages: llamo a una función que me pasa los textos en el idioma seleccionado.

 components: especifico un objeto en el cual tengo todos los eventos posibles que necesito sobreescribir.
 Al evento event le paso solo la referencia a CalendarEvent, mi componente no lo estoy creando aca.
 se produce al darle click

 (1)
 defino una const para indicar si el event pertenece al user que esta logueado  o pertenece a otro usuario.
 Hago una doble comparacion xq en el back el usuario logueado me devuelve su id como uid mientras que en el 
 documento del evento me devuelve el id del usuario que lo creo como _id. Lo ideal es que lo normalice para que
 tenerlos con el mismo nombre. Si lo normalizo con uid la respuesta del evento no nacesito hacer las dos
 comparaciones.


*/
