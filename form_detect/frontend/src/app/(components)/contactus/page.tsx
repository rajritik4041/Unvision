"use client";

import React, { useState } from "react";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Link from "next/link";

type UserType = {
  name: string;
  subject: string;
  message: string;
  email: string;
};
export default function Contact() {
  const { handleSubmit } = useForm()
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
    console.log(user.email, user.name, user.message, user.subject)
    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
  }
  const getInputClass = `"peer w-full  pl-4  pt-6 pb-2  rounded-xl border border-gray-300 
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-transparent"`;
  const getLabelClass = (value: string) =>
    `absolute left-4 transition-all duration-200  w-full min-w-30  max-w-96 text-sm ${value ? "top-1 text-xs text-blue-500" : "top-3 text-gray-500"
    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`;
  const setinputclass = "peer  w-full  px-4 pt-6 pb-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm";
  const setlabelclass =
    "absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:top-1 peer-valid:text-xs";


  return (
    <div className="bg-green-200 grid sm:grid-cols-2  grid-cols-1 w-screen  h-screen"  >
      <div className="flex  justify-center items-center" >
        <form onSubmit={handleSubmit(SubmitedData)}  className="sm:w-full sm:max-h-full  "  >
          <div className="bg-white  sm:ml-8 w-full p-4   rounded-2xl border-2">
            <div className="text-center mb-6 text-green-700 text-2xl sm:mb-10 sm:mt-4 font-extrabold">🌿 Contact Us</div>
            <div className="w-full relative mt-4 " >
              <input type="text" name="name" className={setinputclass} required onChange={handleChange} />
              <label className={setlabelclass}>Name </label>
            </div>
            <div className="w-full relative mt-2">
              <input type="text" name="subject" required className={setinputclass} onChange={handleChange} />
              <label className={setlabelclass}>Subject  </label>
            </div>
            <div className="w-full relative mt-2">
              <input type="email" name="email " required className={setinputclass} onChange={handleChange} />
              <label htmlFor="email " className={setlabelclass}>Email </label>
            </div>
            <div className="w-full relative mt-2">
              <textarea name="message" required className="peer  w-full  px-4 pt-6 pb-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm" onChange={handleChange} />
              <label htmlFor="message" className={setlabelclass}>Message </label>
            </div>
            <div className="flex justify-around" >
              <Link href="/" className="bg-red-600 p-1.5 mt-2 rounded-lg px-4  w-fit " > Back </Link>
              <input type="submit" className="bg-green-500 p-1.5 mt-2 rounded-lg px-4 " value="Submit" />
            </div>
          </div>
        </form>
      </div>
      <div className=" flex flex-col flex-1  justify-center w-full h-full  text-center items-center ">
        <div className="text-left bg-white p-4 rounded-lg  ">
          <h2 > Contact Developer</h2>
          <p >  Raj Ritik Varma</p>
          <p >Full Stack Developer</p>
          <p >  <b>Phone:</b>{" "}   <a href="tel:+919236134041"  >   +91 9236134041  </a></p>
          <p >  <b>Email:</b>{" "}  <a href="mailto:rajritik.4041@gmail.com"    >   rajritik.4041@gmail.com      </a> </p>
        </div>
        <div className="text-left my-4  bg-white p-4 rounded-lg  ">
          <h2 > Contact Developer</h2>
          <p >  Raj Ritik Varma</p>
          <p >Full Stack Developer</p>
          <p >  <b>Phone:</b>{" "}   <a href="tel:+919236134041"  >   +91 9236134041  </a></p>
          <p >  <b>Email:</b>{" "}  <a href="mailto:rajritik.4041@gmail.com"    >   rajritik.4041@gmail.com      </a> </p>
        </div>
        {/* <div >
          <a href="https://www.linkedin.com/" target="_blank"   >    <FaLinkedin />  </a>
          <a href="https://www.instagram.com/raj_ritik_455/" target="_blank" >  <FaInstagram /> </a>
          <a href="https://github.com/rajritik4041" target="_blank" >  <FaGithub /> </a>
          <a href="mailto:rajritik.4041@gmail.com" >  <FaEnvelope />  </a>
        </div> */}
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7143.71847098584!2d82.49182!3d26.460266!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399093cbf6ffffff%3A0xe886e928b8f0a1e7!2sMahamaya%20College%20of%20Agricultural%20Engineering%20And%20Technology!5e0!3m2!1sen!2sin!4v1777314401769!5m2!1sen!2sin" width="100%" height="100%" loading="lazy" ></iframe>
        </div>
      </div>
    </div>

  );
}