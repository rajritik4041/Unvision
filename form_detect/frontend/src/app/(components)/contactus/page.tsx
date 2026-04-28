"use client";

import React, { useState } from "react";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Navbar from "@/app/components/navbar/page";

type UserType = {
  name: string;
  subject: string;
  message: string;
  email: string;
};
export default function Contact() {
  const { handleSubmit } = useForm()
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>({
    name: "",
    subject: "",
    message: "",
    email: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const SubmitedData = async () => {
    setLoading(true);
    console.log(user.email, user.name, user.message, user.subject)
    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    setTimeout(() => {
      console.log("Form submitted");

      // agar same page pe rehna hai to fir enable kar do
      setLoading(false);
    }, 2000);
  }
  const getInputClass = `"peer w-full  pl-4  pt-6 pb-2  rounded-xl border border-gray-300 
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-green-500 text-md bg-transparent"`;
  const getLabelClass = (value: string) =>
    `absolute left-4 transition-all duration-200  w-full min-w-30  max-w-96 text-md ${value ? "top-1 text-xs text-green-500" : "top-3 text-gray-500"
    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`;
  const setinputclass = "peer bg-white  w-full  px-4 pt-6 pb-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-md";
  const setlabelclass =
    "absolute left-4 top-3 text-gray-500 text-md transition-all duration-200 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500 peer-valid:top-1 peer-valid:text-xs";


  return (
    <div>
      <Navbar />
    <div className="bg-green-200 grid md:grid-cols-2 gap-2  grid-cols-1 w-screen min-h-screen p-4"  >
      <div className="flex  justify-center items-center" >
        <form onSubmit={handleSubmit(SubmitedData)} className="w-full max-h-full  md:p-4 "  >
          <div className="bg-gray-100   w-full p-4 border-green-600  rounded-2xl border-2">
            <div className="text-center mb-6 text-green-700 text-2xl md:mb-12 md:mt-6 font-extrabold">🌿 Contact Us</div>
            <div className="w-full relative mt-4  " >
              <input type="text" name="name" className={setinputclass} required onChange={handleChange} />
              <label className={setlabelclass}>Name </label>
            </div>
            <div className="w-full relative mt-4">
              <input type="text" name="subject" required className={setinputclass} onChange={handleChange} />
              <label className={setlabelclass}>Subject  </label>
            </div>
            <div className="w-full relative mt-4">
              <input type="email" name="email" required className={setinputclass} onChange={handleChange} />
              <label htmlFor="email" className={setlabelclass}>Email </label>
            </div>
            <div className="w-full relative mt-4">
              <textarea name="message" required className="peer  w-full min-h-28 bg-white   px-4 pt-6 pb-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-md" onChange={handleChange} />
              <label htmlFor="message" className={setlabelclass}>Message </label>
            </div>
            <div className="flex justify-around mt-4" >
              <Link href="/" className="bg-green-400 p-1.5 mt-2 rounded-lg px-4  w-fit " > Back </Link>
              <input type="submit" className="bg-green-500 p-1.5 mt-2 rounded-lg px-4 " value={loading ? "Submitting..." : "Submit"}
                disabled={loading} />
            </div>
          </div>
        </form>
      </div>
      <div className=" md:w-full md:h-full items-center  flex  md:p-7 ">
        <div className=" flex flex-col flex-1  justify-center md:w-full  w-full   md:p-4 p-4 rounded-2xl bg-gray-100 text-center items-center border-green-600 border-2 ">
          <div className="text-left bg-white md:w-full shadow p-4 rounded-lg  ">
            <h2 className="text-center font-bold text-green-500  text-xl" > Our Address</h2>
            <p >  Mahamaya College of Agricultural Engineering & Technology, Akbarpur, Ambedkar Nagar, U.P. (224122) Near Shiv Baba, Faizabad Marg</p>
            <p >Full Stack Developer </p>
            <p >  <b>Phone:</b>{" "}   <a href="tel:+919076611211"  >   +91 9076611211  </a></p>
            <p >  <b>Email:</b>{" "}  <a href="mailto:deanmcaet@gmail.com"    >   deanmcaet@gmail.com      </a> </p>
          </div>
          <div className="grid my-2 grid-cols-1 md:gap-2 w-full md:grid-cols-2">
            <div className="text-left shadow bg-white md:w-full md:h-full p-4 rounded-lg  ">
              <h2 className="text-center font-bold text-green-500  text-xl" > Contact Developer</h2>
              <p >  Raj Ritik Varma</p>
              <p >Full Stack Developer </p>
              <p >  <b>Phone:</b>{" "}   <a href="tel:+919236134041"  >   +91 9236134041  </a></p>
              <p >  <b>Email:</b>{" "}  <a href="mailto:rajritik.4041@gmail.com"    >   rajritik.4041@gmail.com      </a> </p>
            </div>
            <div className="text-left shadow my-4 md:my-0 md:w-full md:h-full bg-white p-4 rounded-lg  ">
              <h2 className="text-center font-bold text-green-500  text-xl" > Contact Developer</h2>
              <p >  Piyush Ashthana</p>
              <p >Fronted Developer</p>
              <p >  <b>Phone:</b>{" "}   <a href="tel:+918808273389"  >   +91 8808273389   </a></p>
              <p >  <b>Email:</b>{" "}  <a href="mailto:piyushasthana444@gmail.com"    >   piyushasthana444@gmail.com      </a> </p>
            </div>
          </div>

          <div className="w-full rounded-2xl shadow ">
            <iframe className="w-full md:h-full rounded-2xl  " src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7143.71847098584!2d82.49182!3d26.460266!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399093cbf6ffffff%3A0xe886e928b8f0a1e7!2sMahamaya%20College%20of%20Agricultural%20Engineering%20And%20Technology!5e0!3m2!1sen!2sin!4v1777314401769!5m2!1sen!2sin" loading="lazy" ></iframe>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}

// {/* <div >
//           <a href="https://www.linkedin.com/" target="_blank"   >    <FaLinkedin />  </a>
//           <a href="https://www.instagram.com/raj_ritik_455/" target="_blank" >  <FaInstagram /> </a>
//           <a href="https://github.com/rajritik4041" target="_blank" >  <FaGithub /> </a>
//           <a href="mailto:rajritik.4041@gmail.com" >  <FaEnvelope />  </a>
//         </div> */}