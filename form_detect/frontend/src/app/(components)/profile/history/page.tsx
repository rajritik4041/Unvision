"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <h1>History</h1>

      {data.map((item, index) => (
        <div key={index} className="border p-2 my-2">
          <img
            src={`http://localhost:8000/${item.image_url}`}
            className="w-32"
          />
          <p>Animal: {item.label}</p>
          <p>Confidence: {item.confidence}</p>
        </div>
      ))}
    </div>
  );
}