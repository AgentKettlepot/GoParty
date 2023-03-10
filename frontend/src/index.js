import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PartiesContextProvider } from './context/PartiesContext';
import { AuthContextProvider } from './context/AuthContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PartiesContextProvider>
      <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </PartiesContextProvider>
  </React.StrictMode>
);