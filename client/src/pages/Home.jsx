import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Home_main from '../components/Home_main'
import { MainContext } from '../contexts/AppContext'

function Home() {
  const {user}=useContext(MainContext);
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