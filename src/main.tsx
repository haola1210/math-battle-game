import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import EventBusContextProvider from '@modules/2Ds/contexts/EventBusContext';
import SocketContextProvider from '@contexts/SocketContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SocketContextProvider>
    <EventBusContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EventBusContextProvider>
  </SocketContextProvider>,
);
