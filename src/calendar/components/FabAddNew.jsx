import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClick = () => {
        // Antes de que se abra el modal llamo seteo con valores el nuevo evento activo que estoy creando
        // Como no le pongo _id significa que estoy creandi uno nuevo
        setActiveEvent({
            title: '', 
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 3 ), // funcion de date-fns para sumar horas
            bgColor: '#fafafa',
            user: {
                _id: '1234',
                name: 'Jorge'
            }
        })
        openDateModal() // para mostrar el form modal
    }

  return (
    <button className="btn btn-primary fab"
            onClick={ handleClick }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}

// fab es una clase propia definida en styles