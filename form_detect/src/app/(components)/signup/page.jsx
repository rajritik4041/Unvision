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
      <div className='flex justify-center items-center h-[100vh]'>
        <div className='border-2 rounded-[4px] h-96 w-2xl flex  justify-center gap-4 p-2'>
          <form onSubmit={handleSubmit(submitdata)}>
           <div>
            <label htmlFor="text">text</label>
             <input type="text" name="text" placeholder='text' className='border-2 m-2' />
             </div>

            <div> 
              <label htmlFor="username">Username </label>
            <input type="text" placeholder='Username' name='username' value={user.username} onChange={setdata} className='border-2 p-0.5' /> 
            </div>

           <div> 
            <label htmlFor="state">state</label>
            <select className='border-2 p-0.5 m-2'>
              <option value="state">down</option>
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
            <label htmlFor="state"> country</label>
            <select className='border-2 p-0.5'>
              <option value="country">select</option>
              <option value="country">india</option>
              <option value="country">usa</option>
              <option value="country">germany</option>
              <option value="country">russia</option>
            </select> <label htmlFor="district"> district</label>
            <select className='border-2 p-0.5'>
              <option value="country">select</option>
              <option value="country">india</option>
              <option value="country">usa</option>
              <option value="country">germany</option>
              <option value="country">russia</option>
            </select>
            </div>

            <div>
              <label htmlFor="email"> Email</label>
               <input type="email" placeholder='Email' value={user.email} name='email' onChange={setdata} />
               <button>
              Generate OTP
             </button>
             <input type="number" />
               </div>
          <div> 
            <label htmlFor="password">Password</label>
             <input type="password" placeholder='Password' value={user.password} name='password' onChange={setdata} />
             <input type="c" placeholder='c' value={user.password} name='password' onChange={setdata} />
             
             </div>
           <div>
             <input type="submit" value="Submit" />
             
             </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page