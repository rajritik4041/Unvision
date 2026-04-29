"use client"
import React from "react"

export default function Main() {
  return (
    <div>


      <div className="grid lg:grid-cols-4  sm:grid-cols-1 ms:grid-cols-1 gap-10  bg-black  text-white justify-center items-center text-center">

        <div className="  grid gap-5 pt-5 justify-center items-center text-centre text-white ">
          <h2 className="hover:text-blue-500"> Home</h2>
          <h2 className="hover:text-blue-500">News</h2>
          <h2 className="hover:text-blue-500">About</h2>
          <h2 className="hover:text-blue-500">Contact Us</h2>
          <h2 className="hover:text-blue-500"> Our Team </h2>
        </div>

        <div className="justify-center items-center text-centre">
          <h2> COMMUNITY</h2>
          <p className="pt-4">Blogs Community Ideas Developers</p>
        </div>

        <div className="justify-center items-center text-centre">
          <h2>COMPANY</h2>
          <p className="pt-4">About us Team Where to Buy Resellers Influencers Affiliates Media Contact & Imprint</p>
        </div>

        <div className="justify-center items-center text-centre">
          <h2>USEFULLINKS</h2>
          <p className="pt-4">Warranty Product Declarations Teams of Use Privacy Policy Cookie Policy Cookie Setting</p>
        </div>
      </div>

      <div className="bg-black text-white p-10">
        <div>
          <footer className="flex flex-col sm:flex-row  lg:gap-10  sm:gap-4 justify-center items-center justify-content">
            <img className="h-10 w-10 rounded-4xl border-7 border-white  " src="https://cdn-icons-png.flaticon.com/128/15047/15047435.png" alt="" />

            <img className="h-10 w-10 rounded-4xl border-7 border-white " src="https://cdn-icons-png.flaticon.com/128/15707/15707749.png" alt="" />

            <img className="h-10 w-10 rounded-4xl border-7 border-white " src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" alt="" />

            <img className="h-10 w-10 rounded-4xl border-7 border-white " src="https://cdn-icons-png.flaticon.com/128/15707/15707820.png" alt="" />

            <img className="h-10 w-10 rounded-4xl border-7 border-white " src="https://cdn-icons-png.flaticon.com/128/145/145807.png" alt="" />


          </footer>
          <div className="justify-center items-center justify-content grid pt-15 text-emerald-600">
            <h3>&copyright; 2026 Raj Ritik Varma,Piyush Asthana and Mukesh Kumar. All rights reserved.</h3>
            
          </div>
          <div className="text-red-500">
            <p>Presented By:UNVISION</p>
          </div>
          <div className="text-indigo-600">
            <p>MULTISKIN DESEASE</p>
          </div>

        </div>
      </div>
    </div>
  )
}