"use client";

import React, { useState, ChangeEvent, FormEvent, JSX } from "react";
import axios from "axios";
import Head from "next/head";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.email.includes("@")) {
      setErrorMsg("Invalid email address");
      return false;
    }
    if (formData.message.length < 5) {
      setErrorMsg("Message too short");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess("");
    setErrorMsg("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post("/api/contactUs", formData);

      if (res.data.success) {
        setSuccess("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setErrorMsg("Failed to send message.");
      }
    } catch (error: any) {
      setErrorMsg(
        error?.response?.data?.message || "Server error. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Contact Raj Ritik Varma - Full Stack Developer"
        />
      </Head>

      <div className="min-h-screen bg-gray-100 px-4 py-8 border-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10 text-green-700">
            Contact Us
          </h1>

          <div className="grid md:grid-cols-2 gap-10">
            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="bg-blue-100 p-6 rounded-lg shadow-md border-4"
            >
              {/* Name */}
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-400 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-400 bg-white text-black px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-900">
                  Subject
                </label>

                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-400 bg-white text-black px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Subject</option>
                  <option value="Any Query">Any Query</option>
                  <option value="Model Related Work">Model Related Work</option>
                  <option value="Important Work">Important Work</option>
                  <option value="Issue">Issue</option>
                  <option value="Contact">Contact</option>
                </select>
              </div>

              {/* Message */}
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-900">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-400 bg-white text-black px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              {/* Messages */}
              {success && (
                <p className="text-green-600 mb-2 font-semibold">{success}</p>
              )}
              {errorMsg && (
                <p className="text-red-600 mb-2 font-semibold">{errorMsg}</p>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* CONTACT INFO */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                Contact Developer
              </h2>

              <p className="text-gray-900 font-semibold">
                Raj Ritik Varma
              </p>
              <p className="text-gray-700">Full Stack Developer</p>

              <p className="mt-2 text-gray-900">
                <b>Phone:</b>{" "}
                <a
                  href="tel:+919236134041"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  +91 9236134041
                </a>
              </p>

              <p className="text-gray-900">
                <b>Email:</b>{" "}
                <a
                  href="mailto:rajritik.4041@gmail.com"
                  className="text-red-500 font-semibold hover:underline"
                >
                  rajritik.4041@gmail.com
                </a>
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex gap-4 mt-4 text-2xl">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  className="text-blue-600 hover:scale-110 transition"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://www.instagram.com/raj_ritik_455/"
                  target="_blank"
                  className="text-pink-500 hover:scale-110 transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://github.com/rajritik4041"
                  target="_blank"
                  className="text-black hover:scale-110 transition"
                >
                  <FaGithub />
                </a>

                <a
                  href="mailto:rajritik.4041@gmail.com"
                  className="text-red-500 hover:scale-110 transition"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}