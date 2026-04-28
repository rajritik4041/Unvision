"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { setAuthTokenCookie } from "@/lib/auth-cookie";
import { clearAuthTokenCookie } from "@/lib/auth-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons"
type Detail = {
  icon: string;
  title: string;
  description: string;
};
export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const api = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const pathname = usePathname();

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    } else {
      sessionStorage.removeItem("hasRefreshed");
    }
  }, [pathname]);
  useEffect(() => {
    const fetchProfile = async () => {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");

      if (urlToken) {
        localStorage.setItem("token", urlToken);
        setAuthTokenCookie(urlToken);
        window.history.replaceState({}, document.title, "/profile/home");
      }
      const token = localStorage.getItem("token");
      try {
        const headers: HeadersInit = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const res = await fetch(`${api}/profile/home`, { headers, credentials: "include" });
        if (res.status === 401) {
          localStorage.removeItem("token");
          clearAuthTokenCookie();
          router.push("/login");
          return;
        }
        const data = await res.json();
        if (data.success) { setUser(data.user); }
      }
      catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchProfile();
  }, [api, router]);


  const handleLogout = async () => {
    try {
      await fetch(`${api}/logout`, {
        method: "POST",
        credentials: "include",
      });
      await fetch("/api/logout", { method: "POST" });
      localStorage.removeItem("token");
      clearAuthTokenCookie();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("token");
      clearAuthTokenCookie();
      window.location.href = "/login";
    }
  };

  const details: Detail[] = [
    {
      icon: "📷",
      title: "1. Capture",
      description: "Farmer snaps a photo of the animal",
    },
    {
      icon: "📷",
      title: "1. Capture",
      description: "Farmer snaps a photo of the animal",
    },
    {
      icon: "📷",
      title: "1. Capture",
      description: "Farmer snaps a photo of the animal",
    },
  ];

  return (
    <div className="bg-green-100 w-screen h-screen">
      <div>
        <div className="w-full bg-green-500 min-h-96 text-center px-3 flex justify-center flex-1 flex-col ">
          <h1 className="text-white font-bold sm:text-4xl text-xl ">Welcome to Unvision</h1>
          <p className="font-normal mt-4 text-white ">AI-Powered Image-Based Animal Recognition System</p>
        </div>
      </div>
      <div>
        <div>
          {details.map((item, index) => (
            <div key={index}>
              <div>{item.icon}</div>
              <div>{item.title}</div>
              <div>{item.description}</div>
            </div>
          ))}
        </div>

      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}







// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import Navbar from "@/app/components/navbar/page";
// import { useEffect } from "react";

// export default function ImageUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const hasReloaded = sessionStorage.getItem("reloaded");

//     if (!hasReloaded) {
//       sessionStorage.setItem("reloaded", "true");
//       window.location.reload();
//     }
//   }, []);

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select file");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("file", file);

//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         "http://127.0.0.1:8000/predict",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setResult(res.data);
//     } catch (err: any) {
//       console.log("ERROR:", err.response?.data || err.message);
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="p-5">
//         <h1 className="text-xl font-bold">Upload Image</h1>

//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="mt-3"
//         />

//         <button
//           onClick={handleUpload}
//           className="bg-blue-500 text-white px-4 py-2 mt-3"
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </button>

//         {result && (
//           <div className="mt-5 border p-3">
//             <h2>Animal: {result.label}</h2>
//             <p>Confidence: {result.confidence}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // import { clearAuthTokenCookie, setAuthTokenCookie } from "@/lib/auth-cookie";
// // const handleLogout = async () => {
// //   try {
// //     await fetch(`${api}/logout`, {
// //       method: "POST",
// //       credentials: "include",
// //     });
// //     // Also clear frontend-domain auth cookies used by middleware/next-auth.
// //     await fetch("/api/logout", { method: "POST" });
// //     localStorage.removeItem("token");
// //     clearAuthTokenCookie();
// //     window.location.href = "/login";
// //   } catch (err) {
// //     console.error("Logout error:", err);
// //     localStorage.removeItem("token");
// //     clearAuthTokenCookie();
// //     window.location.href = "/login";
// //   }
// // };