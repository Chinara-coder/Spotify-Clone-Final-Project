import React from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'

const App = () => {
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex gap-3 pl-8 cursor pointer'>
      <Sidebar />
      <Display/>
      </div>
      <Player/>
    </div>
  )
}

export default App
 