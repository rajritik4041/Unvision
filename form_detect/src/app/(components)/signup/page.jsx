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
      <div className='border-2 rounded-[4px] h-56 w-96 flex flex-col items-center justify-center gap-4'>
        <form onSubmit={handleSubmit(submitdata)}>
          <input type="text" placeholder='Username' name='username' value={user.username} onChange={setdata} />
          <input type="email" placeholder='Email' value={user.email} name='email' onChange={setdata} />
          <input type="password" placeholder='Password' value={user.password} name='password' onChange={setdata} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default page