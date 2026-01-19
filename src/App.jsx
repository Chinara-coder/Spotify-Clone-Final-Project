import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import Login from './components/Login' // ⬅️ ƏLAVƏ ET
import { PlayerContext } from './context/PlayerContext'
import DisplayInstallApp from "./components/DisplayInstallApp";

const App = () => {
  const { track } = useContext(PlayerContext);

  return (
    <Routes>
      {/* ⬅️ Login route */}
      <Route path="/login" element={<Login />} />
<Route path="/install" element={<DisplayInstallApp />} />
      {/* ⬅️ Main Spotify layout */}
      <Route path="/*" element={
        <div className='h-screen bg-black'>
          <div className='h-[90%] flex cursor-pointer'>
            <Sidebar />
            <Display />
          </div>
          <Player />
        </div>
      } />
    </Routes>
  )
}

export default App