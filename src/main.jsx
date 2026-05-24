import './index.css';
import App from './App';
import PortfolioContextProvider from './context/PortfolioContext';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
    <PortfolioContextProvider>
      <BrowserRouter>
      <ToastContainer/>
        <StrictMode>
          <App />
        </StrictMode> 
      </BrowserRouter>
    </PortfolioContextProvider>
);
