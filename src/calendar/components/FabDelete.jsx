import { useSelector } from 'react-redux';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const { isDateModalOpen }  = useSelector( state => state.ui );

    const handleDelete = () => {
      startDeletingEvent();
    }

  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
          display: (hasEventSelected && !isDateModalOpen) ? '' : 'none'
        }}

    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}

// fab es una clase propia definida en styles
//    <button className="btn btn-danger fab-Danger"
//             onClick={ handleClick }
//     >
//         <i className="fas fa-trah-alt"></i>
//     </button>

//    <i className="fas fa-trah-alt"></i>

