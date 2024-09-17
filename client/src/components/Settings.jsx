import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Settings() {
  const Navigate=useNavigate()
  const handleSignout=async ()=>{
    await axios.get('/sign_out')
    setStatus('Signing you out..')
    setTimeout(()=>{
      Navigate('/')
    },1800)
  }
  const [status,setStatus]=useState('')
  return (
    <div className='w-full max-w-[30rem] h-full  flex flex-col gap-y-4 p-2 items-center' >
    <button className='blue-gradient text-white px-2 py-1 rounded-lg shadow-md shadow-neutral-300 font-semibold' onClick={handleSignout}>SignOut</button>
    {status}
    </div>
  )
}

export default Settings