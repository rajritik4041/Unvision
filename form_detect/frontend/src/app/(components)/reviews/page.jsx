"use client";

import React, { useEffect, useState } from "react";

export default function Raj() {
  const images = [
    "https://images.unsplash.com/photo-1688890239467-c43da335fe7e?w=600",
    "https://plus.unsplash.com/premium_photo-1776119538068-b497f8ef8c60?w=600",
    "https://images.unsplash.com/photo-1658549677516-b28676117c46?w=600",
    "https://images.unsplash.com/photo-1774238339371-501823148e43?w=600",
    "https://images.unsplash.com/photo-1710538492966-92af868c06fb?w=600",
    "https://plus.unsplash.com/premium_photo-1720380988394-364c8544349c?w=600",
    "https://images.unsplash.com/photo-1775263314358-28cd554d314a?w=600",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-green-600">
      <div className="p-4">

        <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg">

          {/* Slider */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <img
                  src={img}
                  className="w-full h-56 object-cover rounded"
                />
                <p className="text-2xl pt-2 text-gray-800 text-center">
                  Welcome to Unvision
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div >
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 pt-10 gap-20 max-screen place-items-center content-center">
          <div className="place-items-center content-center max-w-2xl pt-6 pb-2 pr-2 pl-2 mx-auto rounded-2xl shadow-lg bg-white hover:scale-105 transition hover:bg-green-500 hover:text-white h-full w-80">
            <img className="h-60 w-60" src="/uploads/login.png" alt="" />
            <h2 className="pt-5 text-xl font-mono">Login Page</h2>
            <p className=" text-justify items-center justify-center pt-2">shows a mobile-style login UI with fields and buttons.</p>
          </div>

          <div className="place-items-center max-w-2xl pt-6 pb-2 pr-2 pl-2 mx-auto rounded-2xl shadow-lg bg-white hover:scale-105 transition hover:bg-green-500 hover:text-white h-full w-80">
            <img className="h-60 w-60" src="/uploads/home.png" alt="" />
            <h2 className="pt-5 text-xl font-mono"> Home</h2>
            <p className="text-justify items-center justify-center pt-2">displays the main landing page of the application with a welcome message and “Learn How It Works” section.</p>
          </div>

          <div className="place-items-center max-w-2xl pt-6 pb-2 pr-2 pl-2 mx-auto rounded-2xl shadow-lg bg-white hover:scale-105 transition hover:bg-green-500 hover:text-white  h-full w-80">
            <img className="h-60 w-60" src="/uploads/analys.png" alt="" />
            <h2 className="pt-5 text-xl font-mono">Analysis</h2>
            <p className=" text-justify items-center justify-center pt-2">shows an image upload interface, likely used for processing or analyzing images.</p>
          </div>

          <div className="place-items-center max-w-2xl pt-6 pb-2 pr-2 pl-2 mx-auto rounded-2xl shadow-lg bg-white hover:scale-105 transition hover:bg-green-500 hover:text-white  h-full w-80">
            <img className="h-60 w-60" src="/uploads/history.png" alt="" />
            <h2 className="pt-5 text-xl font-mono ">History</h2>
            <p className=" text-justify items-center justify-center pt-2">appears to show previously processed or stored data in a dark-themed layout.</p>
          </div>


          <div className="place-items-center max-w-2xl pt-6 pb-2 pr-2 pl-2 mx-auto rounded-2xl shadow-lg bg-white hover:scale-105 transition hover:bg-green-500 hover:text-white  h-full w-80">
            <img className="h-60 w-60" src="/uploads/reset.png" alt="" />
            <h2 className="pt-5 text-xl font-mono">Reset</h2>
            <p className="-justify items-center justify-center pt-2">includes a password reset form with input fields and a submit button.</p>
          </div>


          <div className="place-items-center max-w-2xl pt-6 pb-2 pr-2 pl-2 mx-auto rounded-2xl shadow-lg bg-white hover:scale-105 transition hover:bg-green-500 hover:text-white  h-full w-80">
            <img className="h-60 w-60" src="/uploads/help.png" alt="" />
            <h2 className="pt-5 text-xl font-mono">Help</h2>
            <p className="text-justify items-center justify-center pt-2">contains a support/help page with options like reading docs or joining a community.</p>
          </div>
        </div>
      </div>
    </div>



  )
}