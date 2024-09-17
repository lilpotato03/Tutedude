import React, { useEffect,useState } from 'react'
import User_card from './User_card'
import axios from 'axios';

function Search() {
  const [recom,setRecom]=useState([]);
  const [search,setSearch]=useState('');
  const [searchList,setSearchList]=useState('')
  const fetchRecom=async ()=>{
    try{const res=await axios.get('/recommend')
    setRecom(res.data)}
    catch(e){
      console.log(e.message)
    }
  }
  const fetchUser=async()=>{
    try{
       const res=await axios.post('/search',{Phrase:search},{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
       setSearchList(res.data)
    }catch(e){
      console.log(e.message)
    }
  }
  useEffect(()=>{
    fetchRecom();
  },[])
  useEffect(()=>{
    if(search.length!==0){
      fetchUser();
    }
  },[search])

  return (
    <div className='w-full max-w-[30rem] h-full  flex flex-col gap-y-4 p-2 items-center' >
      <div type="text" className='w-full max-w-[20rem] h-[3rem] rounded-full blue-gradient p-1 shadow-md shadow-neutral-300'>
        <input type="text" placeholder='Search user..' className='w-full h-full rounded-full outline-none px-5 text-neutral-700' value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>
      <div className='w-full max-h-full gap-y-2 rounded-md overflow-y-scroll no-scrollbar flex flex-col items-center p-2 shadow-md shadow-neutral-300'>
        {
          recom.length>0 && search.length===0?<h1 className='blue-gradient text-transparent bg-clip-text font-bold  text-[20px] md:text-[30px]'>Recommendations</h1>:<></>
        }
        {recom.length>0 && search.length===0?recom.map((item,id)=>(
          <User_card data={item} key={id} id={id}/>
        )):searchList.length>0?searchList.map((item,id)=>(
          <User_card data={item} key={id} id={id} />
        )):''}
      </div>
    </div>
  )
}

export default Search