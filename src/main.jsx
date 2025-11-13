import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/App.css'
import './firebase/firebaseConfig'

// Ejecuta el seed solo en desarrollo y solo una vez usando localStorage.
if (import.meta.env.DEV && typeof window !== 'undefined') {
  import('./firebase/seedProducts').then(({ seedProductsOnce }) => {
    seedProductsOnce();
  });
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
