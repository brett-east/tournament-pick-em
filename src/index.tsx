import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UIContextProvider } from './components/ui-context';
import { Modal } from './components/modal';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UIContextProvider>
      <Modal />
      <App />
    </UIContextProvider>
  </React.StrictMode>
);

