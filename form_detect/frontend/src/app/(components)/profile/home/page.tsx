"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { setAuthTokenCookie } from "@/lib/auth-cookie";
import { clearAuthTokenCookie } from "@/lib/auth-cookie";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import Link from "next/link";
import ChatBot from "../ChatBot/page";
type Learn = {
  icon: string;
  title: string;
  description: string;
};
type Features = {
  title: string;
  description: string;
};
type testimonials = {
  message: string;
  name: string;
  role: string;
}
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

  const details: Learn[] = [
    {
      icon: "📷",
      title: "1. Capture",
      description: "Farmer snaps a photo of the animal",
    },
    {
      icon: "🔎",
      title: "2. Classify",
      description: "Lightweight AI analyzes on cloud device",
    },
    {
      icon: "📋",
      title: "3. Report",
      description: "Receive breed info and expert tips",
    },
  ];
  const Featuresdata: Features[] = [
    {
      title: "Accurate Breed Recognition",
      description: "Identifies animal breeds using color, body shape, horns, and facial features.",
    },
    {
      title: "Breed-Specific Guidance",
      description: "Provides insights like milk production estimates, feeding recommendations, and disease risks.",
    },
    {
      title: "Lightweight & Offline-Friendly",
      description: "Optimized for low-end devices and supports offline usage with cached results.",
    },
    {
      title: "Data Storage & Reports ",
      description: " Securely stores data in the cloud for insurance and government scheme support.",
    }, {
      title: "DSelf-Improving AI ",
      description: " Continuously improves accuracy by learning from farmer-uploaded images.",
    }, {
      title: "Designed for Farmers",
      description: "Simple design with large icons and support for local languages.",
    },
  ];
const testimonials: testimonials[] = [
  {
    message: "This technology has significantly improved our dairy business operations.",
    name: "Ramesh Yadav",
    role: "Dairy Farmer"
  },
  {
    message: "The breed recognition is very accurate, and the disease detection feature is extremely helpful.",
    name: "Suresh Kumar",
    role: "Livestock Manager"
  },
  {
    message: "We no longer need to rely on experts for identifying animal breeds.",
    name: "Pooja Singh",
    role: "Farm Owner"
  },
  {
    message: "The milk yield estimation feature is very useful for planning and management.",
    name: "Amit Verma",
    role: "Dairy Entrepreneur"
  },
  {
    message: "Simple interface and fast results make it perfect for rural farmers.",
    name: "Sunita Devi",
    role: "Small-Scale Farmer"
  },
  {
    message: "The offline mode works well, which is very important for rural areas.",
    name: "Rajesh Patel",
    role: "Cattle Breeder"
  }
];  return (
    <div className="bg-green-100 w-screen h-full">
      <Navbar />
      <ChatBot />
      <div>
        <div className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-700 min-h-96 text-center px-3 flex justify-center flex-1 flex-col ">
          <h1 className="text-white font-bold sm:text-5xl md:text-6xl lg:text-7xl text-4xl ">Welcome to Unvision</h1>
          <p className="font-normal mt-4 text-white text-xl md:text-2xl ">AI-Powered Image-Based Animal Recognition System</p>
          <Link href="/profile/analyze" className="w-full flex justify-center mt-6">
            <div className="bg-green-400 font-bold text-black w-fit rounded-md text-xl py-1 px-2">
              Upload Image
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-4 p-4 h-full  w-full">
        <div className="font-bold lg:text-6xl sm:text-4xl text-2xl text-center mt-2 mb-6">Learn How It Works</div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 max-w-6xl mx-auto">
          {details.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:[&>h3]:text-green-400"             >
              <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 text-3xl mb-4 group-hover:scale-110 transition"> {item.icon}      </div>
              <h3 className="text-xl font-semibold text-center mb-2">  {item.title} </h3>
              <p className="text-gray-600 text-center text-lg leading-relaxed">     {item.description}  </p>
            </div>
          ))}

        </div>

      </div>
      {/* <div className="w-full  rounded-2xl p-4 mt-6">
          <div className="flex justify-center font-bold text-2xl mb-4">
          🟠 IMAGES / VISUALS
        </div>
        <div className="bg-white rounded-2xl p-4">
        
        <div className="grid  md:grid-cols-2 grid-cols-1">
          <div>
            <div className="md:hidden flex justify-center ">
              <img className="w-20 h-20" src="/uploads/1774162406698-235665008.png" alt="" />
            </div>
            <div className=" flex flex-1 flex-col justify-center md:items-baseline items-center mt-4">
              <div className="text-xl ">
                <ul className="list-disc text-left   pl-5 space-y-1" >
                <li>
                  Animals breed samples
                </li>
                <li>
                  Detection results UI
                </li>
                <li>
                  Dashboard preview
                </li>
              </ul>
              <div>
                👉 Purpose: grab attention + build trust
              </div>
              </div>
            </div>

          </div>
          <div className="md:block hidden">
            <img className="w-20 h-20" src="/uploads/1774162406698-235665008.png" alt="" />
          </div>
        </div>
        </div>
      </div> */}
      <div>
        <div className="mt-4 p-4 h-full  w-full">
          <div className="font-bold lg:text-6xl sm:text-4xl text-2xl text-center mt-2 mb-6">Features & Benefits</div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 max-w-6xl h-full mx-auto">
            {Featuresdata.map((item, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2  hover:[&>h3]:text-green-400">
                <h3 className="lg:text-2xl  text-xl font-bold text-center my-2"> {item.title} </h3>
                <p className="text-gray-600 text-center text-lg  leading-relaxed"> {item.description} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="mt-4 p-4 h-full  w-full">
          <div className="font-bold lg:text-6xl sm:text-4xl text-2xl text-center mt-2 mb-6">Features & Benefits</div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 max-w-6xl h-full mx-auto">
            {testimonials.map((item, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2  hover:[&>h3]:text-green-400">
                <p className="text-gray-600 text-justify text-lg  leading-relaxed"> "{item.message}" </p>
                <h3 className=" text-xl font-semibold text-left my-2  "> {item.name} </h3>
                <p className="text-gray-600 text-left text-lg  leading-0"> {item.role} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
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