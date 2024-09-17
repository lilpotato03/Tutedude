import React, { useEffect, useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
function Login() {
    const Navigate=useNavigate()
    const [status,setStatus]=useState('');
    const handleSubmit=async(e)=>{
    await e.preventDefault();
    const formData=new FormData(e.target);
    const payload=Object.fromEntries(formData);
    const res=await axios.post('/login',payload,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
    setStatus(res.data)
    setTimeout(()=>{
      Navigate('/')
  },1800)
  }

 
  return (
    <div className="Base">
      <div className="Login">
        <div className="h-full flex flex-col gap-y-5 rounded-md items-center p-5 text-neutral-700">
            <h1 className="text-[40px] font-bold">Login</h1>
            <form className="flex flex-col gap-y-5 relative" onSubmit={handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input type="text" name="Email" placeholder="Enter text" required/>
                <label htmlFor="Password">Password</label>
                <input type="password" name="Password" placeholder="Enter text" required/>
                <Link to='/signup'>Dont have an account?.SignUp</Link>
                <button type="submit" className="p-4 text-[20px] blue-gradient text-white rounded-md shadow-md shadow-neutral-300 font-bold">Login</button>
            </form>
            <h2 className="text-[18px] w-full">{status}</h2>
        </div>
    </div>
    </div>
  )
}

export default Login