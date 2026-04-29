"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar/page";
import axios from "axios";
import Footer from "@/app/components/footer/page"
export default function History() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:8000/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      withCredentials: true

    });

    setData(res.data);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-300 py-6 px-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 ">
        {data.map((item, index) => (
          <div key={index} className=" w-full h-full ">
            <div className="bg-green-200 rounded-3xl py-6 gap-0 px-4 grid grid-cols-2">
              <div>
                <img className="w-40 h-40 rounded-2xl bg-green-200" src={`http://localhost:8000/${item.image_url}`} />
              </div>
              <div className="flex justify-center flex-1 pl-4 flex-col text-md ">
                <div className="grid grid-rows-2">
                  <div className="grid grid-rows-2 gap-0 ">
                    <span className="font-bold  text-md mb-0">Animal:</span>
                    <span className=" text-sm leading-4 ">  {item.label} </span>
                  </div>
                  <div className="grid grid-rows-2 mt-4">
                    <span className="font-bold text-md mb-0">Confidence:</span>
                    <span className=" text-sm leading-4 ">   {item.confidence} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}