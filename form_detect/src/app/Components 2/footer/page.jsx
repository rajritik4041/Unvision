"use client"
import React from 'react'
import path from 'path'

function footer() {
  console.log("footer")
  console.log(path.dirname(__dirname))
  return (
    <>
    <div>
      <div className='bg-green bg-white text-1x1 ' >plants</div>
    </div>
    </>
  )
}

export default footer