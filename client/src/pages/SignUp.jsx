import React from 'react'
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
function SignUp() {
    const Navigate=useNavigate()
    const handleSubmit=async(e)=>{
        await e.preventDefault();
        const formData=new FormData(e.target);
        const payload=Object.fromEntries(formData);
        const res=await axios.post('/signup',payload,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
        setStatus(res.data)
        setTimeout(()=>{
            Navigate('/')
        },1800)
    }
    const [status,setStatus]=useState('');
  return (
    <div className="Base">
        <div className="SignUp">
            <div className="h-full flex flex-col gap-y-5 rounded-md items-center p-5 text-neutral-700">
                <h1 className="text-[40px] font-bold">SignUp</h1>
                <form className="flex flex-col gap-y-5 relative" onSubmit={handleSubmit}>
                    <label htmlFor="Name">Name</label>
                    <input type="text" name="Name" placeholder="Enter text" required/>
                    <label htmlFor="Email">Email</label>
                    <input type="text" name="Email" placeholder="Enter text" required/>
                    <label htmlFor="Password">Password</label>
                    <input type="password" name="Password" placeholder="Enter text" required/>
                    <Link to='/login'>Already have an account?Login.</Link>
                    <button type="submit" className="p-4 text-[20px] blue-gradient text-white rounded-md shadow-md shadow-neutral-300 font-bold">SignUp</button>
                </form>
                <h2 className="text-[18px] w-full">{status}</h2>
            </div>
        </div>
    </div>
        
  )
}

export default SignUp