
"use client";
import React, { useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar/page";
import { useEffect } from "react";

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

      <div className="p-5">
        <h1 className="text-xl font-bold">Upload Image</h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-3"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 mt-3"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {result && (
          <div className="mt-5 border p-3">
            <h2>Animal: {result.label}</h2>
            <p>Confidence: {result.confidence}</p>
          </div>
        )}
      </div>
    </div>
  );
}