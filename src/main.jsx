import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Importamos los CSS originales de Micampus organizados
import './assets/css/global/tokens.css'
import './assets/css/global/base.css'
import './assets/css/home/Home.css'
import './assets/css/components/components.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
