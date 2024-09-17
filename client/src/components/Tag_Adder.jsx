import React, { useEffect, useState } from 'react'
import Tag from './Tag'

function Tag_Adder(props) {
  const [tags,setTags]=useState([])
  const handleAdd=(e)=>{
    if(content==''){
        setStatus('Enter a tag')
    }else{
        if(!tags.includes(content.toLowerCase())){
            setTags([...tags,content]);
            setContent('')
        }
    }
  }
  const handleDel=(id)=>{
    const newArray=tags.filter((tag,index)=>index!=id);
    setTags(newArray);
  }
  useEffect(()=>{
    props.parent(tags)
  },[tags])
  const [content,setContent]=useState('')
  const [status,setStatus]=useState('')
  return (
    <div>
        <div className='flex flex-col w-full max-w-[30rem] gap-y-2'>
            {tags.length!=0?<div className='w-full max-w-[30rem] rounded-md shadow-md shadow-neutral-300 p-2 flex gap-x-2 gap-y-2 flex-wrap bg-neutral-200'>
                {tags.map((tag,id)=>(
                    <Tag tag={tag} key={id} id={id} del={handleDel}/>
                ))}
            </div>:<></>}
            <div className='h-[3rem] flex rounded-md gap-x-2 p-2 w-min items-center bg-neutral-200 shadow-md shadow-neutral-300'>
                <input type="text" placeholder='Add interest' className='h-[2rem] w-[14rem] outline-none text-neutral-600' value={content} onChange={(e)=>setContent(e.target.value)}/>
                <button className='blue-gradient text-white font-bold p-1 rounded-md' onClick={handleAdd}>Add</button>
            </div>
            {status}
        </div>
    </div>
  )
}

export default Tag_Adder