import React from 'react'

function Tag(props) {
  return (
    <div className='bg-neutral-400 text-white w-min p-1 rounded-md font-semibold flex gap-x-1'>
        <p>{props.tag?props.tag:''}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" onClick={()=>props.del(props.id)}/>
        </svg>
    </div>
  )
}

export default Tag