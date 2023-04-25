import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice, authSlice } from "./";

export const store = configureStore({
    reducer: {
        ui:       uiSlice.reducer,
        calendar: calendarSlice.reducer,
        auth:     authSlice.reducer
    },
    middleware: ( getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
    
});

// el middleware que agrego es para que redux no intente serializar las fechas lo cual produce un warning en la 
// consola. Esta es la configuración que se usa con redux-toolkit