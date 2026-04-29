"use client"

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import { clearAuthTokenCookie, setAuthTokenCookie } from "@/lib/auth-cookie";
// import iframe
type UserType = {
    name: string;
    subject: string;
    message: string;
    email: string;
};
export default function Contact() {
    const { handleSubmit } = useForm()
    const [verify, setverify] = useState<{ email: string }>({
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
            if (!token) { router.push("/login"); return; }
            try {
                const res = await fetch(`http://localhost:8000/profile/home/contactus`, { headers: { Authorization: `Bearer ${token}`, }, credentials: "include", });
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    clearAuthTokenCookie();
                    router.push("/profile/home/contactus");
                    return;
                }
                const data = await res.json();
                if (data.success) { setverify({ email: data.user.email }); }
            }
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
    const SubmitedData = async () => {
        console.log(user.email, user.name, user.message, user.subject)
        user.email = verify.email;
        const res = await fetch("/api/send-mail", {
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
            <div className=" bg-green-200 md:h-screen h-full text-black  items-center  grid md:grid-cols-2 pt-4 grid-cols-1">
                <div className="flex justify-center items-center">
                    <div className=" h-full  rounded-2xl shadow-xl p-8  w-full bg-gray-100 mx-4">
                        <h2 className="text-center mb-6 text-green-700 text-2xl  font-extrabold">🌿 Contact us</h2>
                        <form onSubmit={handleSubmit(SubmitedData)} className="w-full text-black">
                            {/* <p>{verify.email}</p> */}
                            <div className="relative w-full mt-4 bg-white shadow rounded-2xl">

                                <input type="text" name="name" onChange={handleChange} required className={setinputclass} />
                                <label htmlFor="name" className={setlabelclass}>Name </label>
                            </div>
                            <div className="relative w-full mt-4 bg-white shadow rounded-2xl">

                                <input type="text" name="subject" onChange={handleChange} required className={setinputclass} />
                                <label htmlFor="subject" className={setlabelclass}>Subject </label>
                            </div>

                            <div className="  mt-4">
                                <textarea name="message" id="message" className="rounded-2xl  h-50 w-full bg-white p-4 shadow" placeholder="message"></textarea>
                            </div>

                            <div className="text-center w-full mt-4">
                                <input type="submit" value="Submit" className="bg-green-400 w-full rounded-lg px-3 py-2" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="md:w-full md:h-fit h-full  p-4 grid grid-cols-1 items-center   ">
                    
                    <div className="  bg-gray-100 w-full h-full p-4 flex flex-1 justify-center items-center flex-col rounded-2xl">

                        <div className="bg-white rounded-2xl p-4 m-2 w-full shadow" >
                            <h1 className="font-bold"> Contact Developer</h1>
                            <p >  Raj Ritik Varma</p>
                            <p >Full Stack Developer</p>
                            <p >  <b>Phone:</b>{" "}   <a href="tel:+919236134041" className="text-blue-500" >   +91 9236134041  </a></p>
                            <p >  <b>Email:</b>{" "}  <a href="mailto:rajritik.4041@gmail.com" className="text-blue-500"  >   rajritik.4041@gmail.com      </a> </p>

                        </div >
                        <div className="bg-white rounded-2xl p-4 m-2 w-full shadow" >
                            <h1 className="font-bold"> Contact Developer</h1>
                            <p >  Piyush Asthana</p>
                            <p >Frontend Developer</p>
                            <p >  <b>Phone:</b>{" "}   <a href="tel:+918808273389 " className="text-blue-500" >   +91 8808273389  </a></p>
                            <p >  <b>Email:</b>{" "}  <a href="mailto:piyushasthana444@gmail.com" className="text-blue-500"  >   piyushasthana444@gmail.com      </a> </p>

                        </div >

                    <div className="bg-white rounded-2xl w-full shadow  ">

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28575.147711201524!2d82.45505332946779!3d26.4591628317306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399093cbf6ffffff%3A0xe886e928b8f0a1e7!2sMahamaya%20College%20of%20Agricultural%20Engineering%20And%20Technology!5e0!3m2!1sen!2sin!4v1777310546262!5m2!1sen!2sin"  loading="lazy" className="w-full h-full rounded-2xl" ></iframe>
                    </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}