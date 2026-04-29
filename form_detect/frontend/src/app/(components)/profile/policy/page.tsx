"use client";

import React from "react";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";

type PolicySection = {
  title: string;
  description?: string;
  points?: string[];
};

export default function Policy() {
  const privacySections: PolicySection[] = [
    {
      title: "1. Analytics Services",
      description:
        "We use analytics services such as Google Analytics to understand how users interact with our website.",
      points: [
        "Pages visited",
        "Time spent on website",
        "Device and browser information",
        "Helps improve platform performance",
      ],
    },
    {
      title: "2. Advertising & Tracking",
      description:
        "We may use advertising partners and tracking tools to enhance user experience.",
      points: [
        "Show relevant ads",
        "Use cookies & tracking tech",
        "Collect non-personal data",
        "Improve ad targeting",
      ],
    },
    {
      title: "3. Third-Party Cookies",
      description:
        "Third-party cookies help us understand user behavior and improve marketing.",
      points: [
        "Track user activity",
        "Measure ad performance",
        "Optimize campaigns",
        "Placed by external services",
      ],
    },
    {
      title: "4. Facebook Pixel (Optional)",
      description:
        "Used for advanced ad tracking and audience insights.",
      points: [
        "Conversion tracking",
        "Audience targeting",
        "Ad optimization",
        "Better ad delivery",
      ],
    },
    {
      title: "How This Data is Used",
      description:
        "Collected data is used for improving overall experience.",
      points: [
        "Analyze traffic",
        "Improve UI/UX",
        "Deliver personalized content",
        "Maintain security",
      ],
    },
    {
      title: "User Control",
      description:
        "Users have full control over their data and tracking preferences.",
      points: [
        "Disable cookies",
        "Opt-out of tracking",
        "Manage ad preferences",
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-500 text-white">

        {/* HERO SECTION */}
        <div className="h-[350px] flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy & Data Policy
          </h1>
          <p className="max-w-2xl text-green-100">
            We use secure and transparent third-party technologies to enhance your experience,
            analyze performance, and deliver meaningful content.
          </p>
        </div>

        {/* CARDS SECTION */}
        <div className="max-w-7xl mx-auto px-6 pb-16 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {privacySections.map((section, index) => (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <h2 className="text-lg font-semibold mb-2 text-white">
                {section.title}
              </h2>

              {section.description && (
                <p className="text-green-100 text-sm mb-3">
                  {section.description}
                </p>
              )}

              {section.points && (
                <ul className="list-disc pl-5 text-sm text-green-200 space-y-1">
                  {section.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* NOTE SECTION */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Note</h2>
            <p className="text-green-100 text-sm">
              Third-party cookies are managed by external services. Unvision does not directly control how these services use your data.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}