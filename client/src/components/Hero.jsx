import React, { useContext } from 'react'
import { MainContext } from '../contexts/AppContext'
import { Link } from 'react-router-dom'

function Hero() {
  const {user}=useContext(MainContext)
  return (
    <div className='flex w-full h-full justify-center flex-col items-center gap-y-4 relative'>
        <div className='flex flex-col gap-x-2 justify-center  text-[60px] font-bold  md:scale-100 sm:scale-75 scale-50 relative'>
            <img src="assets/hero_vector.png" alt="" className='w-[30rem] '/>
            <div className='flex gap-x-2 w-full justify-center'>
            <p className='blue-gradient text-transparent bg-clip-text'>Find</p>
            <p className='text-neutral-700 flex-shrink-0'>people who </p>
            <p className='blue-gradient text-transparent bg-clip-text'>R</p>
            </div>
            <div className='flex gap-x-2 w-full justify-center'>
            <p className='text-neutral-700'> just like</p>
            <p className='blue-gradient text-transparent bg-clip-text'>You</p>
            </div>
        </div>
        <Link to={user?'/setup_profile':'signup'} ><button className='blue-gradient flex-shrink-0 text-[30px] md:scale-100 sm:scale-75 scale-50   font-semibold text-white  px-4 py-2 rounded-lg shaGet Starteddow-md shadow-neutral-400'>{user?'Setup Profile':'Get Started'}</button>
        </Link>
    </div>
  )
}

export default Hero