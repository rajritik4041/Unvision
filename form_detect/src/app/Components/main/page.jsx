"use client"
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

function main() {
  return (
    <div>
      <li><Link href="/reviews">Reviews</Link></li>
    </div>
  )
}

export default main