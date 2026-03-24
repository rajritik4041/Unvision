"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
function page() {
  return (
    <div>
      <div className='p-1' onClick={() => signIn("google")} >
      Sign in with Google
       </div>
       </div>
  )
}

export default page