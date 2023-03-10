import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PartiesContextProvider } from './context/PartiesContext';
import { RegisterContextProvider } from './context/RegisterContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PartiesContextProvider>
      <RegisterContextProvider>
      <App />
      </RegisterContextProvider>
    </PartiesContextProvider>
  </React.StrictMode>
);