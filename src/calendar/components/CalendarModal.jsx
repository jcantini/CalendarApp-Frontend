// Componente para el armado del Modal para mostrar un evento. Ver la página en npm react-modal
// donde está el código que es necesario para implementarlo. Hacer un copy paste de lo necesario
import { useMemo, useState, useEffect } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'  // son los estilos para sweetalert2

import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Estilos para datepicker

import es from 'date-fns/locale/es'; // para poder usar español en datepicker
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale('es', es); // seteo español para datepicker

const customStyles = { // Posicionamiento del Modal copiado de la página react-modal
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

 // Indico adonde se debe ubicar el modal utilizando el pto de inicio a la app que figura en index.html
 Modal.setAppElement('#root'); 

export const CalendarModal = () => {

    // Traigo de mi custom hook el modal esta en true o false y la función  para cerrar la ventana
    const { isDateModalOpen, closeDateModal }  = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore(); // Recupero del store el evento activo

    // Cuando se haga el submit del form tengo que ver que tenga ingresado el titulo
    const [ formSubmitted, setFormSubmitted ] = useState( false );    

    const [ formValues, setFormValues ] = useState({ // Manejo del form
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2 )
    });

    const titleClass = useMemo(() => {  // memorizo si se ingreso el texto para crear una clase para 
        if( !formSubmitted ) return ''; // indicar un error si esta en blanco
        return ( formValues.title.length > 0)
                ? ''
                : 'is-invalid'
    }, [ formValues.title, formSubmitted]); // se va a memorizar si alguno de estos valores cambia

    useEffect(() => {
        if ( activeEvent !== null ) {    // la 1er vez esta en null
            setFormValues({ ... activeEvent }); // esparzo las propiedades y creo un objeto nuevo
        }
    }, [ activeEvent ]); // cada vez que se cambia el evento activo

    const oncloseModal = () => {
        closeDateModal();
    };

    const onInputChanged = ( { target } ) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    // Em el onDateChanged de datepicker no tengo target solo es el event y 
    // changing lo uso para saber si es la fecha start o end
    const onDateChanged = ( event, changing ) => { 
        setFormValues({
            ...formValues,
            [changing]: event
        })
    };

    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted( true ); // se posteo el form

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if( isNaN( difference ) || difference <= 0) {
            Swal.fire('Incorrect dates', 'Please check if both dates are correct', 'error')
            return;
        }

        if ( formValues.title.length  <= 0 ) return;

        await startSavingEvent( formValues ); // llamo a guardar el evento en el store y en el bakend
        closeDateModal(); // cierro el form modal
        setFormSubmitted(false); // para volver el form al estado de no submitido
    }

  return (
    <Modal
        isOpen = { isDateModalOpen }
        onRequestClose={ oncloseModal }
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo" // es la clase que le pongo al fondo
        closeTimeoutMS={ 200 } // para que no se cierre instantáneo y se pueda ver la animación
    >
        <h1> New event </h1>
        <hr />
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Start Date/Time</label>
                <DatePicker
                    selected={ formValues.start }
                    className="form-control" // clase de bootstrap
                    onChange={ (event) => onDateChanged( event, 'start') }
                    dateFormat="Pp" // para que muestre también la hora
                    showTimeSelect // para que me permita seleccionar la hora
                    locale="es" // para que me muestre formato fecha y hora en español. Para us no lo pongo
                    timeCaption="Hour" // para que me salga como título al seleccionar fecha y hora
                />
            </div>

            <div className="form-group mb-2">
                <label>End Date/Time</label>
                <DatePicker
                    minDate={ formValues.start} // no permito seleccionar una fecha < a la de inicio
                    selected={ formValues.end }
                    className="form-control" // clase de bootstrap
                    onChange={ (event) => onDateChanged( event, 'end') }
                    dateFormat="Pp" // para que muestre también la hora
                    showTimeSelect // para que me permita seleccionar la hora   
                    locale="es"
                    timeCaption="Hour" // para que me salga como título al seleccionar fecha y hora
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Title and Notes</label>
                <input 
                    type="text" 
                    className={`form-control ${ titleClass }`} // para mostrar si falta ingresar el titulo
                    placeholder="Title"
                    name="title"
                    value={ formValues.title }
                    autoComplete="off"
                    onChange={ onInputChanged }
                />
                <small id="emailHelp" className="form-text text-muted">Short description</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notes"
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onInputChanged }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Aditional info</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Save</span>
            </button>

        </form>
    </Modal>
  )
}

// En este form en lugar de usar mi custom hook useForm lo trabajo en la forma tradicional con useState



