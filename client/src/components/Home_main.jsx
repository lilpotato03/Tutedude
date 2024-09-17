import React, { useContext } from 'react'
import Hero from './Hero'
import { MainContext } from '../contexts/AppContext'
import {Outlet} from "react-router-dom"

function Home_main() {
  const {user}=useContext(MainContext);
  return (
    <div className='w-full h-full flex justify-center items-center rounded-md p-4 shadow-md shadow-neutral-300 bg-neutral-100'>
        {user&&user.Email&&user.Username?<Outlet />:<Hero />}
    </div>
  )
}

export default Home_main