"use client"

import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

function main() {
  const { handleSubmit } = useForm();
  const [image, setimage] = useState({
    text: ""
  })

  const setdata = (e) => {
    setimage({ ...image, [e.target.name]: e.target.value })
  }
  const onsubmit = async () => {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(image)
    })
    const data = await res.json()
    console.log(data)
  }
  return (
    <div>
      <div className='flex justify-center items-center m-1.5'>
        <div>
          <li className='m-1.5'>
            <Link href="/reviews">Reviews</Link>
          </li>
        </div>
        {/* <input type="file"
            accept="image/*" id="file"  className='border-2 w-52 ' />  */}
        <form onSubmit={handleSubmit(onsubmit)} >
          <label htmlFor="text">
            ENTER TEXT :-
          </label>
          <input type="text"
            id="text" name='text' className='border-2 w-52 p-1 m-1.5' value={image.text} onChange={setdata} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default main