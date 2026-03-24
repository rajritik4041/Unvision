"use client"
import React from 'react'
<<<<<<< HEAD
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
function page() {
  return (
    <div>
      <div className='p-1' onClick={() => signIn("google")} >
      Sign in with Google
       </div>
       </div>
=======
import Link  from "next/link"

function page() {
  return (
    <div><div>
        This is a abhdhjhjehjehjfjfjffkdfkkdfout Us page</div>
        
        <div>
          <Link href="/about">about us</Link>
        </div>
        </div>
>>>>>>> 626b936 (about us & contact us Updated)
  )
}

export default page