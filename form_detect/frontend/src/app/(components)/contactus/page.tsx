"use client";

import React, { useState } from "react";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";

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


  return (
    <div >
      <div >
        <form onSubmit={handleSubmit(SubmitedData)}className="h-screen bg-green-300  text-black flex justify-center items-center" >
          <label htmlFor="name">Name </label>
          <input type="text" name="name" onChange={handleChange} />
          <label htmlFor="subject">Subject </label>
          <input type="text" name="subject" onChange={handleChange} />
          <label htmlFor="email">Email </label>
          <input type="email" name="email" onChange={handleChange} />
          <label htmlFor="message">Message </label>
          <input type="text" name="message" onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>


      <div >
        <h2 > Contact Developer</h2>
        <p >  Raj Ritik Varma</p>
        <p >Full Stack Developer</p>
        <p >  <b>Phone:</b>{" "}   <a href="tel:+919236134041"  >   +91 9236134041  </a></p>
        <p >  <b>Email:</b>{" "}  <a href="mailto:rajritik.4041@gmail.com"    >   rajritik.4041@gmail.com      </a> </p>

        <div >
          <a href="https://www.linkedin.com/" target="_blank"   >    <FaLinkedin />  </a>
          <a href="https://www.instagram.com/raj_ritik_455/" target="_blank" >  <FaInstagram /> </a>
          <a href="https://github.com/rajritik4041" target="_blank" >  <FaGithub /> </a>
          <a href="mailto:rajritik.4041@gmail.com" >  <FaEnvelope />  </a>
        </div>
      </div>
    </div>

  );
}