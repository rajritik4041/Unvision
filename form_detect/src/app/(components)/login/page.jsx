"use client"
import React, { use } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, signOut } from "next-auth/react";

function page() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [verify, setVerify] = useState({
    email: "",
    password: ""
  })
  const setdata = async (e) => {
    setVerify({ ...verify, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verify)
    })

    const data = await res.json();

    if (!data.success) {
      const errorObj = {};
      if (data.errors) {
        data.errors.forEach((err) => {
          errorObj[err.path] = err.msg;
        });
      } else {
        errorObj.general = data.message;
      }
      setErrors(errorObj);
      return;
    }
    router.push('/');
  }
  return (
    <div className='flex justify-center items-center overflow-y-scroll h-screen bg-linear-to-r from-blue-500 to-teal-400'>
      <div className=' rounded-lg h-150 w-3xl flex justify-center font-serif text-white bg-radial from-blue-800  via-blue-900 to-blue-950 '>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=' font-bold  p-1 mt-10 ml-15'>
            <label htmlFor="email" className=' mr-4' >Email :</label>
            <input type="email" name="email" id="email" placeholder='Enter your email' value={verify.email} onChange={setdata} className='my-3 p-1 border-2 rounded-lg w-75' />
          </div>
          <div className=' font-bold  p-1 my-3 ml-15'>
            <label htmlFor="password" className=' mr-4'>Password :</label>
            <input type="password" name="password" id="password" placeholder='Enter password' value={verify.password} onChange={setdata} className='my-3 p-1 border-2 rounded-lg' />
          </div>
            {errors.general && (<p style={{ color: "red",textAlign:'center' }}>{errors.general}</p>)}
          <div className='flex justify-center items-center  w-30 bg-blue-500 ml-45  rounded-sm p-1 my-10'>
            <input type="submit" value="Login" className='' />
          </div>
          <div className='ml-25 my-5'>
            <p>
              Don't have an account?
              <Link href="/signup" className='m-3.5 text-blue-400'>
                Sign up
              </Link>
            </p>
          </div>
          <div>------------------------------------- or -----------------------------------------------</div>
          <div className='ml-25 my-5'>
            <div  
              
               onClick={() => signIn('google')} className='m-2 text-blue-400'>login with google </div>
            
            
              <div onClick={() => signIn('github')} className='m-2 text-blue-400'>  login with github </div>
            
              <div onClick={() => signIn('microsoft')}  className='m-2 text-blue-400'> login with microsoft </div>
            
             
              <div onClick={() => signIn('apple')}  className='m-2 text-blue-400'> login with apple </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default page