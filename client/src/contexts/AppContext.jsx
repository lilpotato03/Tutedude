import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export   const MainContext=createContext();
function AppContext({children}) {
  const[user,setUser]=useState();
  const fetchData=async ()=>{
    try{
        const res=await axios.get('/verify')
        if(res.status==200){
            setUser(res.data);
    }
    }catch(e){

    }
  }
  useEffect(()=>{
    fetchData()
  },[]);
  return (
    <MainContext.Provider value={{user,setUser}}>
        {children}
    </MainContext.Provider>
  )
}

export default AppContext