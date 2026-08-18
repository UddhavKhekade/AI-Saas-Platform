import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import{useClerk }from '@clerk/react'

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    const { isSignedIn } = useClerk()
    
  return (
    <div className='fixed z-10 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
        <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={()=>{navigate('/')}}/>

        <div className='flex items-center gap-4'>
          {isSignedIn ? (//cheking is user already signed in or not
            <>
              <button className='flex items-center rounded-full gap-2 text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
                onClick={()=>{navigate('/ai')}}
              >
                Get Started <ArrowRight className='w-4 h-4'/>
              </button>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className='text-sm cursor-pointer text-gray-300 hover:text-white'>Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className='flex items-center rounded-full gap-2 text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
                  Sign Up <ArrowRight className='w-4 h-4'/>
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      
    </div>
  )
}

export default Navbar
