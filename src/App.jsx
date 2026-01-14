import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import {PlayerContext} from './context/PlayerContext'

const App = () => {

const {track} = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex cursor-pointer'>
        <Sidebar />
        <Display />
      </div>
      <Player />
    </div>
  )
}

export default App