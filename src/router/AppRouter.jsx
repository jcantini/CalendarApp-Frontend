import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {

  // Valido el token antes de dejar pasar a las rutas
  const { status, checkAuthToken } = useAuthStore(); 

  useEffect(() => {
    checkAuthToken();
  }, []); // lo llamo solo cuando se renderiza la pantalla o sea para cada petición que venga

  if ( status === 'checking' ) {
    return (
      <h3>Loading...</h3>
    )
  }

  return (  
      <Routes>
      
      {
        ( status === 'not-authenticated')
        ? ( // User Not Authenticated
            <>
              <Route path="/auth/*" element={ <LoginPage /> } />
              <Route path="/*" element={ <Navigate to="/auth/login" /> } />
            </>
        )
        : ( // User Authenticated
          
            <>          
              <Route path="/" element={ <CalendarPage /> } />
              <Route path="/*" element={ <Navigate to="/" /> } />
            </>
        )

      }  

    </Routes>
  )
}

