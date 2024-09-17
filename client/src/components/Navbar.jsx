import React from 'react'
import { useState } from 'react';
function Navbar() {
  const [user,setUser]=useState(true);
  return (
    <div className='w-full h-[4rem] bg-neutral-100 rounded-md flex items-center justify-between px-4 shadow-neutral-300  shadow-md'>
        <div className="logo flex items-center gap-x-2">
            <img src="assets/Logo.png" alt="Logo" className='size-10' />
            <h1 className='text-[20px] font-bold text-neutral-800'>Findr</h1>
        </div>
        {user?
        <div className="shortcuts flex items-center gap-x-4 fill-current text-white">
            <div className='flex gap-x-2 shadow-neutral-300 blue-gradient shadow-md rounded-full p-2 '> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
            </svg>
            </div>
            <div className='flex gap-x-2 shadow-neutral-300 blue-gradient shadow-md rounded-full p-2 '> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>

            </div>  
        </div>
        :
        <button className='blue-gradient text-white px-2 py-1 rounded-lg shadow-md shadow-neutral-300 font-semibold'>SignUp\Login</button>
        }
    </div>
  )
}

export default Navbar