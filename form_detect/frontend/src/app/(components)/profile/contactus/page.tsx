"use client"

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/page"
import { clearAuthTokenCookie, setAuthTokenCookie } from "@/lib/auth-cookie";
type UserType = {
    name: string;
    subject: string;
    message: string;
    email: string;
};
export default function Contact() {
    const { handleSubmit } = useForm()
    const [verify, setverify] = useState<{email: string}>({
        email: "",
    });
       const [user, setUser] = useState<UserType>({
        name: "",
        subject: "",
        message: "",
        email: "",
    });
    const router = useRouter()
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
      if (!token) { router.push("/login"); return;   }
      try { const res = await fetch(`http://localhost:8000/profile/home/contactus`, {  headers: { Authorization: `Bearer ${token}`,   }, credentials: "include",  });
        if (res.status === 401) {
          localStorage.removeItem("token");
          clearAuthTokenCookie();
          router.push("/profile/home/contactus");
          return;
        }
        const data = await res.json();
        if (data.success) { setverify({ email: data.user.email });  } } 
        catch (err) { console.error(err); } 
        
    };
    fetchProfile();
  }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const SubmitedData = async () =>{
        console.log(user.email , user.name , user.message , user.subject)
        user.email = verify.email ;
        const res = await fetch("/api/send-mail" , {
              method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
        })
    }
    // useEffect

     const setinputclass = "peer  w-full  px-4 pt-6 pb-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-grey-500 focus:border-grey-500 text-sm";
    const setlabelclass =
        "absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-black-500 peer-valid:top-1 peer-valid:text-xs";

    return (
        <div>
          <Navbar />
            <div className="h-screen bg-green-200 text-black flex justify-center items-center">
                <div className="border-2 max-h-fit  rounded-2xl shadow-xl p-8 max-w-fit bg-white">
   <h2 className="text-center mb-6 text-green-700 text-2xl  font-extrabold">🌿 Contact us</h2>
                <form onSubmit={handleSubmit(SubmitedData)} className="w-full text-black">
                    {/* <p>{verify.email}</p> */}
                    <div className="relative w-full mt-4 ">

                    <input type="text" name="name" onChange={handleChange} required className={setinputclass} />
                    <label htmlFor="name" className={setlabelclass}>Name </label>
                    </div>
                    <div className="relative w-full mt-4 ">

                    <input type="text" name="subject" onChange={handleChange} required className={setinputclass}/>
                    <label htmlFor="subject" className={setlabelclass}>Subject </label>
                    </div>

                    <div className=" w-full mt-4 ">
                     {/* <label htmlFor="message"className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-black-500 peer-valid:top-1 peer-valid:text-xs">Message </label> */}
                    <textarea name="message" id="message"  className="border-2 rounded-2xl left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-black-500 peer-valid:top-1 peer-valid:text-xs" placeholder="message"></textarea>
                    </div>

                    <div className="text-center w-full mt-4">
                    <input type="submit" value="Submit" className="bg-green-400 w-full rounded-lg px-3 py-2"/>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}