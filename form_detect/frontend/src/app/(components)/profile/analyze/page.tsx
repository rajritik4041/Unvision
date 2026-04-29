"use client";
import React, { useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (err: any) {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-5 flex justify-center items-center h-screen w-screen bg-green-200 ">
        <div className="bg-gray-100 text-black h-fit   w-full min-w-0 max-w-3xl mx-auto px-4  rounded-2xl p-4 flex flex-col justify-center items-center shadow-2xl ">

          <h1 className="text-3xl font-bold text-green-700 m-3">🌿 Upload &nbsp;Image </h1>
          <hr className="w-full border-gray-500 border" />
          <div className="text-center  rounded-2xl m-5 p-4 bg-white w-full shadow-xl">
            <label className=" p-4 pl-2r  mr-5 mt-4    h-full w-full ">
              <div className="border-2 w-full min-h-40 rounded-2xl  border-dashed flex flex-col justify-center items-center m-1.5">
                <FontAwesomeIcon icon={faCloudArrowDown} className=" text-2xl" /><br />
                Choose Your File for Upload
              </div>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>

            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-15 text-2xl py-2 m-4 rounded-2xl"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {result && (
            <div className="pr-6 w-full text-center h-full">
              <div className="text-3xl font-bold text-green-700 m-3 text-center ">🌿 Result </div>
              <hr className="w-full border-gray-500 border  " />
              <div className=" w-full h-full rounded-2xl m-5 p-4 bg-white shadow-xl">
                <div className="mt-5   p-2   font-bold  flex  flex-col md:flex-row gap-4">

                  <div className="border w-full border-dashed rounded-2xl" >
                    <div className="text-2xl text-center">Animal:</div>
                    {result.label}</div>
                  <div className="border w-full border-dashed rounded-2xl">
                    <div className="text-2xl py-1">Confidence: </div>
                    {result.confidence}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}