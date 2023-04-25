import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./src/router";
import { store } from './src/store';


export const CalendarApp = () => {
  return (
    <div>
      <Provider store ={ store }>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
 
    </div>
  )
}

