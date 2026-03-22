"use client"
import React from 'react'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";

function page() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const setdata = async (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  const submitdata = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
  }


  return (
    <div>
      <div className='flex justify-center items-center h-screen bg-blue-400'>
        
        <div className='border-2 rounded-lg h-96 w-200 flex  justify-center gap-4 p-2 bg-white font-mono font-bold'>
          <form onSubmit={handleSubmit(submitdata)}>

           <div className='m-1'>
            <label htmlFor="text" className='p-1 m-1 font-mono'>Text</label>
             <input type="text" name="text" placeholder='text' className='border-2 w-96 m-2 rounded-sm'/>
             </div>

            <div className='p-1.5'> 
              <label htmlFor="username" className='p-1 m-1 font-mono '>Username </label>
            <input type="text" placeholder='Username' name='username' value={user.username} onChange={setdata} className='border-2 p-0.5 w-96 rounded-sm' /> 
            </div>

           <div> 
            <label htmlFor="state" className='p-1 m-1 font-mono'>State</label>
            <select className='border-2 p-0.5 m-2 rounded-sm'>
              <option value="state">select</option>
              <option value="state">Andhra Pradesh (AP)</option>
              <option value="state">Arunachal Pradesh (AR) </option>
              <option value="state">Assam (AS)</option>
              <option value="state">Bihar (BR)</option>
              <option value="state">Chhattisgarh (CG/CT)</option>
              <option value="state">Goa (GA)</option>
              <option value="state">Gujarat (GJ)</option>
              <option value="state">Haryana (HR)</option>
              <option value="state">Himachal Pradesh (HP)</option>
              <option value="state">Jharkhand (JH)</option>
              <option value="state">Karnataka (KA)</option>
              <option value="state">Kerala (KL)</option>
              <option value="state">Madhya Pradesh (MP)</option>
              <option value="state">Maharashtra (MH)</option>
              <option value="state">Manipur (MN)</option>
              <option value="state">Meghalaya (ML)</option>
              <option value="state"> Mizoram (MZ)</option>
              <option value="state"> Nagaland (NL)</option>
              <option value="state">Odisha (OR/OD)</option>
              <option value="state">Punjab (PB)</option>
              <option value="state">Rajasthan (RJ)</option>
              <option value="state">Sikkim (SK)</option>
              <option value="state">Tamil Nadu (TN)</option>
              <option value="state">Telangana (TG/TS)</option>
              <option value="state">Tripura (TR)</option>
              <option value="state">Uttarakhand (UK/UT)</option>
              <option value="state">Uttar Pradesh (UP)</option>
              <option value="state">  West Bengal (WB)</option>
            </select>
            <label htmlFor="state" className='p-1 m-1 font-mono'> Country</label>
            <select className='border-2 p-0.5 rounded-sm'>
              <option value="country">select</option>
              <option value="country">india</option>
              <option value="country">usa</option>
              <option value="country">germany</option>
              <option value="country">russia</option>
            </select> <label htmlFor="district" className='p-1 m-1'> District</label>
            <select  className='border-2 p-0.5 rounded-sm'>
              <option value="country">select</option>
              <option value="country">india</option>
              <option value="country">usa</option>
              <option value="country">germany</option>
              <option value="country">russia</option>
            </select>
            </div>

            <div>
              <label htmlFor="email" className='p-1 m-1 font-mono'> Email</label>
               <input type="email" placeholder='Email' value={user.email} name='email' onChange={setdata} className='border-2 rounded-sm'/>
               <button className='p-1 m-1 rounded-sm border-2 text-white bg-blue-500'>
              Generate OTP
             </button>
             <input type="number"  className='p-1 m-1 rounded-sm border-2 '/>
               </div>
          <div> 
            <label htmlFor="password" className='p-1 m-1 font-poppins'>Password</label>
             <input type="password" placeholder='Password' value={user.password} name='password' onChange={setdata}  className='border-2 rounded-sm m-0.5'/>
             <input type="c" placeholder='comform password' value={user.password} name='password' onChange={setdata} className='border-2 rounded-sm m-0.5'/>
             
             </div>
           <div>
             <input type="submit" value="Submit" className='p-1 m-1 border-2 rounded-sm w-30 bg-blue-500 text-white font-mono'/>
             
             </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page