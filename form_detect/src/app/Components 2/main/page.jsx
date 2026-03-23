"use client"

import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

function main() {
  const { handleSubmit } = useForm();
  const [image, setimage] = useState({ file: null })
  const setdata = (e) => {
    setimage({ file: e.target.files[0] })
  }

  const onsubmit = async () => {
    const formData = new FormData();
    formData.append("file", image.file);
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  }
  return (
    <div>
      <div className='flex justify-center items-center m-1.5'>
        <div>
          <li className='m-1.5'>
            <Link href="/reviews">Reviews</Link>
          </li>
        </div>
        <form onSubmit={handleSubmit(onsubmit)} >
          <label>ENTER FILE :-</label>
          <input type="file"
            accept="image/*"
            id="file" name='file' className='border-2 w-52 p-1 m-1.5' onChange={setdata} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default main