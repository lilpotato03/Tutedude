import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Tag from '../components/Tag';
import Tag_Adder from '../components/Tag_Adder';
function SetupProfile() {
const [status,setStatus]=useState('');
const [inter,setInter]=useState([]);
const Navigate=useNavigate();
const handleSubmit=async(e)=>{
        await e.preventDefault();
        if(check()){
            const formData=new FormData(e.target);
            const payload=Object.fromEntries(formData);
            payload['Interests']=inter;
            const res=await axios.post('/setup_profile',payload,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
            setStatus(res.data)
            setTimeout(()=>{
                Navigate('/')
            },1800)
        }
        else{

        }
}
const check=()=>{
    if(inter.length<5){
        setStatus('Need to add Atleast 5 interest');
        return false;
    }
    return true;
}
  return (
    <div className='Base'>
        <div className='Setup_Profile bg-neutral-100 rounded-md shadow-neutral-300 shadow-md'>
            <div className="max-w-[50rem] h-full flex flex-col p-2 w-full overflow-y-scroll">
                <h1 className='text-[50px] blue-gradient text-transparent bg-clip-text font-bold'>Profile</h1>
                <form className="flex flex-col gap-y-5 relative" onSubmit={handleSubmit}>
                    <label htmlFor="Username">Username</label>
                    <input type="text" name="Username" placeholder="Enter text" required/>
                    <label htmlFor="Bio">Bio</label>
                    <textarea type="text" name="Bio" placeholder="Enter text"/>
                    <label htmlFor="Interest">Interests</label>
                    <Tag_Adder parent={setInter}/>
                    {status}
                    <button type="submit" className="py-2 px-3 shadow-md shadow-neutral-300 text-[20px] w-min blue-gradient text-white rounded-md font-bold">Finish</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SetupProfile