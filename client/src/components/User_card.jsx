import axios from 'axios';
import React, { useState } from 'react'

function User_card(props) {
  const handleRequest=async()=>{
    if(props.type==="inbox"){
        try{
            setToggle(!toggle);
            await axios.post('/add_friend',{Receiver:Username},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
        }
        catch(e){
            console.log(e);
        }
    }
    else{
        try{
            setToggle(!toggle);
            await axios.post('/send_request',{Receiver:Username},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
        }catch(e){
            console.log(e);
        }
    }
    
  }
  const {Username,Mutuals,M_Interests,N_Interests}=props.data
  const [toggle,setToggle]=useState(true);
  return (
    <div className='flex w-full flex-col p-2 text-[10px] md:text-[15px]  rounded-md shadow-md shadow-neutral-400 gap-y-1'>
        <div className='flex justify-between '>
            <h1 className='blue-gradient text-transparent bg-clip-text font-bold'>{Username}</h1>
            {
            toggle?
            <svg onClick={()=>{
                handleRequest()
            }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>:
            'Sent'
            }
        </div>
        {Mutuals!=null?<h1>Mutuals:{Mutuals}</h1>:<></>}
        {N_Interests?<div className='flex gap-x-2'>
            <h1 className='shrink-0'>Matching Interests:</h1>
            <div className='flex gap-x-1 overflow-x-scroll no-scrollbar'>
                {M_Interests.map((inter)=>(
                    <div className='bg-indigo-500 px-1 rounded-md flex items-center justify-center text-white'>{inter}</div>
                ))}
            </div>
        </div>:<></>}
        
        {M_Interests?<div className='flex gap-x-2 '>
            <h1 className='shrink-0'>Other Interests:</h1>
            <div className='flex gap-x-1 overflow-x-scroll no-scrollbar'>
                {N_Interests.map((inter)=>(
                    <div className='bg-blue-400 px-1 rounded-md flex items-center justify-center text-white'>{inter}</div>
                ))}
            </div>
        </div>:<></>}
        
    </div>
  )
}

export default User_card