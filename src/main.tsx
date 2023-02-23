/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import EventBusContextProvider from '@modules/2Ds/contexts/EventBusContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <EventBusContextProvider>
    <App />
  </EventBusContextProvider>,
);
