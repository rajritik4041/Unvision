"use client"

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
        window.history.replaceState({}, document.title, "/profile/home");
      }
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return;   }
      try { const res = await fetch(`http://localhost:8000/profile/home/contactus`, {  headers: { Authorization: `Bearer ${token}`,   }, credentials: "include",  });
        if (res.status === 401) {
          localStorage.removeItem("token");
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

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(SubmitedData)} >
                    <p>{verify.email}</p>
                    <label htmlFor="name">Name </label>
                    <input type="text" name="name" onChange={handleChange} />
                    <label htmlFor="subject">Subject </label>
                    <input type="text" name="subject" onChange={handleChange} />
                     <label htmlFor="message">Message </label>
                    <input type="text" name="message" onChange={handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}