import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app-temp';
import './app.css';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
