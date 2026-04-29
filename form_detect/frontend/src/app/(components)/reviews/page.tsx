"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
type Featurex = {
  img: string;
  title: string;
  desc: string;
}; 

export default function UnvisionUI() {
  const images = [
    "https://images.unsplash.com/photo-1688890239467-c43da335fe7e?w=1200",
    "https://plus.unsplash.com/premium_photo-1776119538068-b497f8ef8c60?w=1200",
    "https://images.unsplash.com/photo-1658549677516-b28676117c46?w=1200",
  ];

  const [index, setIndex] = useState(0);
const features: Featurex[] = [
  {
    img: "/uploads/login.png",
    title: "Login Page",
    desc: "Clean mobile-friendly login UI with authentication system.",
  },
  {
    img: "/uploads/home.png",
    title: "Home",
    desc: "Landing dashboard with overview and navigation.",
  },
  {
    img: "/uploads/analys.png",
    title: "Analysis",
    desc: "Upload and analyze images with smart processing.",
  },
  {
    img: "/uploads/history.png",
    title: "History",
    desc: "Track all previous activities and data logs.",
  },
  {
    img: "/uploads/reset.png",
    title: "Reset",
    desc: "Secure password reset functionality.",
  },
  {
    img: "/uploads/help.png",
    title: "Help",
    desc: "Documentation and support system for users.",
  },
];
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-500 text-white">

      <div className="relative w-full h-[60vh] overflow-hidden">

        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="w-full h-full flex-shrink-0 relative">
              <img
                src={img}
                className="w-full h-full object-cover brightness-75"
                alt="slider"
              />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold">
                  Welcome to Unvision
                </h1>
                <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-xl">
                  Smart platform for analysis, tracking & intelligent insights
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16 px-5 md:px-20">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
          Features & Pages
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">

  
          {features.map((item, i) => (
            <div
              key={i}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5 text-center shadow-xl hover:scale-105 transition duration-300"
            >
              <img
                src={item.img}
                className="w-full h-48 object-contain mb-4"
                alt={item.title}
              />

              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-200 text-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}