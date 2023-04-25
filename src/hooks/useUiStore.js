// Hook para hacer dispatch de acciones y manejar todo lo que este relacionado con el ui en el store

import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isDateModalOpen }  = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    return {
        // Propeties
        isDateModalOpen,

        // Methods
        openDateModal,
        closeDateModal
    }

}