// Mantiene información sobre el modal y del user

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
       isDateModalOpen: false
    },
    reducers: {
        onOpenDateModal: (state, /* action */) => { // para abrir el modal
            state.isDateModalOpen = true; // puedo hacerlo así por usar redux toolkit (1)
    
        },
        onCloseDateModal: (state, /* action */) => { // para abrir el modal
            state.isDateModalOpen = false;
    
        },
    }
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;

// (1) Así sería si no uso redux toolkit
// return { 
//     ...state,
//     isDateModalOpen: true
// }