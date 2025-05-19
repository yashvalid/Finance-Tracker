import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { FinanceProvider } from './context/FinanceContext.jsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FinanceProvider>
        <App />
      </FinanceProvider>
    </BrowserRouter>
  </StrictMode>,
)
