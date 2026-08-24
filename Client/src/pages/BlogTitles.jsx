import { Hash, HashIcon, Sparkle } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import { useAuth } from '@clerk/react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const BlogTitles = () => {
  const blogCategories = [
      'General' , 'Teechnology' , 'Business' , 'Health' , 'Lifestyle' , 'Education' , 'Travel' , 'Food'
    ]
  
  const [selectedCategory , setSelectedCategory] = useState('General')
  const  [Input , setInput]=useState('')
  const [loading,setLoading] = useState(false)
  const [content , setContent] = useState('')

  const {getToken} = useAuth()

  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${Input}
      in the category ${selectedCategory}`

      const {data} = await axios.post('/api/ai/generate-blog-title',{prompt},
        {headers : {Authorization : `Bearer ${await getToken()}`}}
      )

      if(data.success){
        setContent(data.content)

      }else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)
    }

    setLoading(false)
  }
  return (
    <div className='h-full overflow-scroll p-6 flex items-start gap-4 
    text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='flex-1 max-w-lg p-4 bg-white rounded-lg border 
      border-gray-200'>
        <div className=' flex items-center gap-3'>
          <Sparkle className='w-6 text-[#8E37EB]'/>
          <h1 className='text-xl font-semibold'>AI Title Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Keyword</p>

        <input onChange={(e)=>setInput(e.target.value)} value={Input} type='text' className='w-full p-2 px-3 mt-2 outline-none text-sm 
        rounded-md border border-gray-300' placeholder='The future of artificial intelligence is ......' required/>

        <p className='mt-4 text-sm font-medium'>Category</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {blogCategories.map((item,index)=>(
            <span onClick={()=> setSelectedCategory(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? 'bg-blue-50 text-purple-700' : 'border-gray-300 text-gray-500'}`} key={index}>{item}</span>
          ))}
        </div>
        <br/>
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 
        bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 
        text-sm rounded-lg cursor-pointer'>

          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2
            border-t-transparent animate-spin'></span>
            : <Hash className='w-5 '/>

          }
          
          Generate Title

        </button>



      </form>

      {/* right col */}
      <div className='flex-1 max-w-lg p-4 bg-white rounded-lg flex flex-col border
      border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'>
          <Hash className='w-5 h-5 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Generated Titles</h1>

        </div>
        {
          !content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 
            text-gray-400'>
              <HashIcon className='w-9 h-9 text-[#4A7AFF]'/>
              <p>Enter topic and click "Generate title" to get started</p>


            </div>

          </div>
          ):(
            
              <div className='mt-3 h-full overscroll-y-scroll text-slate-600'>
                <div className='reset-tw'>
                  <Markdown>
                    {content}
                  </Markdown>
                </div>
              
              </div>
            
          )
        }
        

      </div>

      
    </div>
  )
}

export default BlogTitles
