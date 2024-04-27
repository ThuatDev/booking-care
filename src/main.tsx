import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import dotenv from 'dotenv'
dotenv.config()
// import './App.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
