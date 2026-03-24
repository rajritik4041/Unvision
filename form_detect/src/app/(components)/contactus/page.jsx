"use client"
import React from 'react'
import Link  from "next/link"

function page() {
  return (
    <div>
        <div>
            This is a contact Us page
        </div>

        <div>
          <Link href="/contact_us">Contact us</Link>
        </div>
    </div>
  )
}

export default page