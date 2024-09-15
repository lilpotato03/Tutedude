import React, { useState } from "react";
import {Link} from "react-router-dom"
function Login() {
  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData(e.target);
    const payload=Object.fromEntries(formData);
    console.log(payload);
  }
  const [status,setStatus]=useState('');
  return (
    <div className="Base">
      <div className="Login">
        <div className="h-full flex flex-col gap-y-5 rounded-md items-center p-5 text-white ">
            <h1 className="text-[40px] font-bold">Login</h1>
            <form className="flex flex-col gap-y-5 relative" onSubmit={handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input type="text" name="Email" placeholder="Enter text"/>
                <label htmlFor="Password">Password</label>
                <input type="password" name="Password" placeholder="Enter text"/>
                <Link to='/signup'>Dont have an account?.SignUp</Link>
                <button type="submit" className="p-4 text-[20px] bg-green-500 rounded-md font-bold">Login</button>
            </form>
            <h2 className="text-[18px] w-full">{status}</h2>
        </div>
    </div>
    </div>
  )
}

export default Login