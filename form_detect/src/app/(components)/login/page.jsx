"use client"
import React, { use } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

function page() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()
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
    const data = await res.json()
    console.log(data)
    if (data.success) {
      router.push('/')
    }
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={verify.email} onChange={setdata} /> <br />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={verify.password} onChange={setdata} /> <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  )
}

export default page