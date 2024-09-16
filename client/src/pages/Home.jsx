import React from 'react'
import Navbar from '../components/Navbar'
import Home_main from '../components/Home_main'

function Home() {
  return (
    <div className='Base'>
        <div className='Home'>
            <Navbar />
            <Home_main />
        </div>
    </div>
  )
}

export default Home