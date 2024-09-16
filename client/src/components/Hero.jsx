import React from 'react'

function Hero() {
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
        <button className='blue-gradient flex-shrink-0 text-[30px] md:scale-100 sm:scale-75 scale-50   font-semibold text-white  px-4 py-2 rounded-lg shadow-md shadow-neutral-400'>Get Started</button>
    </div>
  )
}

export default Hero