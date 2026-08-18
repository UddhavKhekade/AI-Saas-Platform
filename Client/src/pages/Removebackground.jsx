import { Eraser, Sparkle } from 'lucide-react'
import React, { useState } from 'react'

const Removebackground = () => {
   const  [Input , setInput]=useState('')
    const onSubmitHandler = async (e)=>{
      e.preventDefault()
    }
  return (
    <div className='h-full overflow-scroll p-6 flex items-start gap-4 
    text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='flex-1 max-w-lg p-4 bg-white rounded-lg border 
      border-gray-200'>
        <div className=' flex items-center gap-3'>
          <Sparkle className='w-6 text-[#8E37EB]'/>
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload image</p>

        <input onChange={(e)=>setInput(e.target.files[0])} value={Input} type='file' accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm 
        rounded-md border border-gray-300 text-gray-600'  required/>

        
        <p className='text-xs text-gray-500 font-light mt-1'>Supports JPG ,PNG , and other formats</p>
        
       
        <button className='w-full flex justify-center items-center gap-2 
        bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 
        text-sm rounded-lg cursor-pointer'>
          <Eraser className='w-5 '/>
          Remove Background
        </button>



      </form>

      {/* right col */}
      <div className='flex-1 max-w-lg p-4 bg-white rounded-lg flex flex-col border
      border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <Eraser className='w-5 h-5 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Processed Image</h1>

        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 
          text-gray-400'>
            <Eraser className='w-9 h-9 text-[#4A7AFF]'/>
            <p>Upload an Image and Click "Remove Background" to get started</p>


          </div>

        </div>

      </div>

      
    </div>
  )
}

export default Removebackground
