import React, { useState } from 'react'
import Markdown from 'react-markdown'
const CreationItem = ({items}) => {
    const [expanded , setExpanded]  = useState(false);
  return (
    <div onClick={()=>setExpanded(!expanded)}  className='p-4 max-w-5xl text-sm bg-white border 
    border-gray-200 rounded-lg cursor-pointer'>
        <div className='flex justify-between items-center gap-4'>
            <div>
                <h2>{items.prompt}</h2>
                <p className='text-gray-500'>{items.type} - {new Date(items.created_at).toLocaleDateString()}</p>
            </div>
            <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF]
            px-4 py-1 rounded-full'>
                {items.type}
            </button>

        </div>
      {
        expanded && (
            <div>
                {items.type === 'image' ? (
                    <div>
                        <img src={items.content} alt='image' className='mt-3 w-full max-w-md'/>
                    </div>
                ):(
                    <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-700'>
                        <div>
                            <Markdown className='reset-tw'>{items.content}</Markdown>
                        </div>
                       
                    </div>
                )}
            </div>

        )
      }
    </div>
  )
}

export default CreationItem
