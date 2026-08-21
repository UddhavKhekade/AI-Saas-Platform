import { Image, Sparkle } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '@clerk/react'

const GenerateImages = () => {

  const ImageStyle = [
      'Realistic' , 'Ghibli style' , 'Anime style' , 'Cartoon style',
      'Fantasy style' , 'Realistic style' , '3D style' , 'Potrait style'
      ]
    
    const [selectedStyle , setSelectedStyle] = useState('Realistic')
    const  [Input , setInput]=useState('')
    const [publish,setPublish] = useState(false)

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
          <Sparkle className='w-6 text-[#00AD25]'/>
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>

        <textarea onChange={(e)=>setInput(e.target.value)} value={Input} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm 
        rounded-md border border-gray-300' placeholder='Describe what you want to see in the image..... ' required/>

        <p className='mt-4 text-sm font-medium'>Style</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {ImageStyle.map((item,index)=>(
            <span onClick={()=> setSelectedStyle(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-blue-50 text-purple-700' : 'border-gray-300 text-gray-500'}`} key={index}>{item}</span>
          ))}
        </div>

        <div className='my-6 flex items-center gap-2'>
          <label className='relative cursor-pointer'>
            <input type='checkbox' onChange={(e)=>setPublish(e.target.checked)}
          checked={publish} className='sr-only peer'/>
          <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'>
            
          </div>
          <span className='absolute left-1 top-1 w-3 h-3 bg-white 
          rounded-full transition peer-checked:translate-x-4'></span>
          </label>
          <p className='text-sm'>Make this image Public</p>
         

        </div>
        
        <button className='w-full flex justify-center items-center gap-2 
        bg-gradient-to-r from-[#00AD25] to-[#8E37EB] text-white px-4 py-2 mt-6 
        text-sm rounded-lg cursor-pointer'>
          <Image className='w-5 '/>
          {loading ? 'Generating...' : 'Generate Image'}

        </button>



      </form>

      {/* right col */}
      <div className='flex-1 max-w-lg p-4 bg-white rounded-lg flex flex-col border
      border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <Image className='w-5 h-5 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Generated Image</h1>

        </div>
        <div className='flex-1 flex justify-center items-center'>
          {image ? (
            <img src={image} alt={Input} className='max-h-[500px] max-w-full rounded-md object-contain' />
          ) : (
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Image className='w-9 h-9 text-[#4A7AFF]'/>
              <p>{error || 'Enter a topic and click "Generate image" to get started'}</p>
            </div>
          )}

        </div>

      </div>

      
    </div>
  )
}

export default GenerateImages
