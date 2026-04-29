// "use client";
// import React, { useState } from "react";
// import axios from "axios";

// export default function ImageUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<any>(null);

//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await axios.post(
//       "http://localhost:8000/predict",
//       formData
//     );

//     setResult(res.data);
//   };

//   return (
//     <div className="p-5">
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//       />

//       <button
//         onClick={handleUpload}
//         className="bg-blue-500 text-white px-4 py-2 mt-2"
//       >
//         Upload
//       </button>

//       {result && (
//         <div className="mt-4">
//           <h2>Animal: {result.label}</h2>
//           <p>Confidence: {result.confidence}</p>
//         </div>
//       )}
//     </div>
//   );
// }
"use client"
import React from "react"
import Footer from "@/app/components/footer/page"
export  default function Main() {
  return(

    <div>
    footer
    </div>
  )
}