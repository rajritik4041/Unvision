"use client";
import React from "react";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
export default function HelpPage() {
  return (
    <div className="bg-green-100 min-h-screen">
      <Navbar />
      {/* HERO SECTION */}
      <div className="w-full bg-gradient-to-r from-green-800 to-green-600 py-20 text-center px-4">
        <h1 className="text-white font-bold text-4xl md:text-5xl mb-6">
          How can we help you today?
        </h1>

        {/* CONTACT BUTTON */}
        <div className="flex justify-center">
          <a
            href="/profile/contactus"
            className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-200 hover:scale-105 transition"
          >
            Contact Support
          </a>
        </div>
      </div>

      {/* HELP CARDS */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/15453/15453140.png"
            className="w-16 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-3 text-green-700">
            Read Documentation
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Learn how to use the Multi-Disease Detection system including setup,
            image upload, prediction results, and AI workflow.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/18992/18992261.png"
            className="w-16 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-3 text-green-700">
            Ask the Community
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Connect with farmers and developers. Ask questions, solve issues,
            and share experiences.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/316/316376.png"
            className="w-16 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-3 text-green-700">
            Share a Tip
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Share your knowledge like dataset improvements, model accuracy tips,
            and best practices.
          </p>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="text-center space-y-3">
        <a href="/profile/g" className="text-green-700 text-lg font-medium hover:underline block">
          About More
        </a>
        <a href="/profile/policy" className="text-green-700 text-lg font-medium hover:underline block">
          Terms & Conditions
        </a>
      </div>

      {/* ACCOUNT SECTION */}
      <div className="mt-16 py-16 bg-gradient-to-r from-green-700 to-green-500">
        <h2 className="text-center text-3xl font-bold text-white mb-10">
          Account & Tools
        </h2>

        <div className="grid md:grid-cols-4 grid-cols-2 gap-6 max-w-6xl mx-auto px-4">

          {[
            {
              img: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
              title: "My Account",
              desc: "Manage your account settings",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/128/4144/4144845.png",
              title: "Email Campaigns",
              desc: "Control your communications",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/128/7945/7945013.png",
              title: "Contacts",
              desc: "Manage contact list",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/128/3745/3745205.png",
              title: "Automation",
              desc: "Automate workflows",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition"
            >
              <img src={item.img} className="w-14 mx-auto mb-3" />
              <h3 className="font-semibold text-green-700">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2 text-green-800">
          Need more help?
        </h3>
        <p className="text-gray-700">
          Visit our contact page for direct support.
        </p>
      </div>
      <Footer />
    </div>
  );
}