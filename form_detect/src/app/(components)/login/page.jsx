"use client"
import React, { use } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

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
  const onSubmit = async (data) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verify),
      credentials: "include",
    });

    const result = await res.json();

    if (!result.success) {
      const errorObj = {};
      if (result.errors) {
        result.errors.forEach((err) => {
          errorObj[err.path] = err.msg;
        });
      } else {
        errorObj.general = result.message;
      }
      setErrors(errorObj);
      return;
    }

    router.push("/");
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={verify.email} onChange={setdata} />

          <br />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={verify.password} onChange={setdata} />

          <br />
          {errors.general && (<p style={{ color: "red" }}>{errors.general}</p>)}
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  )
}

export default page