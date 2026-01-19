import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './components/Login'
import './index.css'
import PlayerContextProvider from './context/PlayerContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerContextProvider>
        <Routes>
          {/* ⬅️ Login route */}
          <Route path="/login" element={<Login />} />
          
          {/* ⬅️ Spotify app routes */}
          <Route path="/*" element={<App />} />
        </Routes>
      </PlayerContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)