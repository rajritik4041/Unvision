"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function ImageUpload() {
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.apnawebtech.online";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const onFileSelect = (selectedFile: File | null) => {
    setResult(null);
    setError("");
    setFile(selectedFile);
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select or capture an image first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
        return;
      }

      const res = await axios.post(
        `${api}/predict`,
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
      const data = err.response?.data;
      setError(data?.message || data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="bg-green-200 px-3 py-6 sm:px-5 sm:py-10">
        <div className="bg-gray-100 text-black w-full max-w-3xl mx-auto rounded-2xl p-4 sm:p-6 shadow-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700 text-center mb-3">
            🌿 Upload Image
          </h1>
          <hr className="w-full border-gray-500 border" />
          {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

          <div className="text-center rounded-2xl mt-5 p-4 sm:p-6 bg-white w-full shadow-xl">
            <div className="border-2 w-full min-h-44 rounded-2xl border-dashed flex flex-col justify-center items-center p-4">
              <FontAwesomeIcon icon={faCloudArrowDown} className="text-2xl mb-2" />
              <p className="text-sm sm:text-base text-gray-700">
                Choose image from gallery or capture from camera
              </p>
              {file && (
                <p className="mt-2 text-xs sm:text-sm text-green-700 font-medium break-all">
                  {file.name}
                </p>
              )}
            </div>

            {previewUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="w-full max-w-sm max-h-72 object-contain rounded-xl border"
                />
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
              className="hidden"
            />

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-800 text-white py-2 rounded-xl"
              >
                Choose File
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="bg-emerald-700 text-white py-2 rounded-xl"
              >
                Open Camera
              </button>
            </div>

            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white w-full sm:w-auto sm:px-10 text-base sm:text-xl py-2 mt-4 rounded-2xl disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {result && (
            <div className="w-full text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-700 mt-5 mb-3 text-center">
                🌿 Result
              </div>
              <hr className="w-full border-gray-500 border" />
              <div className="w-full rounded-2xl mt-5 p-4 bg-white shadow-xl">
                <div className="p-2 font-bold flex flex-col md:flex-row gap-4">
                  <div className="border w-full border-dashed rounded-2xl p-3">
                    <div className="text-xl sm:text-2xl text-center">Animal:</div>
                    {result.label}
                  </div>
                  <div className="border w-full border-dashed rounded-2xl">
                    <div className="text-xl sm:text-2xl py-1">Confidence:</div>
                    {result.confidence}
                  </div>
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