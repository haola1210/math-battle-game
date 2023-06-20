import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import EventBusContextProvider from '@modules/2Ds/contexts/EventBusContext';
import SocketContextProvider from '@contexts/SocketContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SocketContextProvider>
    <EventBusContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EventBusContextProvider>
  </SocketContextProvider>,
);
