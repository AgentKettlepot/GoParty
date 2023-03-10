import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PartiesContextProvider } from './context/PartiesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PartiesContextProvider>
      <App />
    </PartiesContextProvider>
  </React.StrictMode>
);
//testing 