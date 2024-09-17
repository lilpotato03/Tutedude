import React, { useEffect, useState } from 'react'
import User_card from './User_card'
import axios from 'axios'
function Inbox() {
  const [inbox,setInbox]=useState([])
  const fetchInbox=async()=>{
    try{const data=await axios.get('/inbox');
    setInbox(data.data)}
    catch(e){
      console.log(e.message)
    }
  }
  useEffect(()=>{
    fetchInbox();
  },[])
  return (
    <div className='w-full max-w-[30rem] h-full  flex flex-col gap-y-4 p-2 items-center' >
      <div className='w-full max-h-full gap-y-2 rounded-md overflow-y-scroll flex flex-col items-center p-2 shadow-md shadow-neutral-300'>
      <h1 className='blue-gradient text-transparent bg-clip-text font-bold  text-[20px] md:text-[30px]'>Inbox</h1>
        {inbox.length>0?inbox.map((item,id)=>(
          <User_card data={item} key={id} id={id} type='inbox' />
        )):'Currently Inbox is Empty'}
      </div>
    </div>
  )
}

export default Inbox