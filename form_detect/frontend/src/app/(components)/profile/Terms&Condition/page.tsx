"use client";
import Link from "next/link";
import React from "react";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
export default function TermsPage() {
  return (
    <div className="bg-green-50 min-h-screen">

      {/* HERO */}
      <div className="w-full bg-gradient-to-r from-green-900 to-green-700 text-white text-center py-14 px-4">
        <h2 className="text-lg tracking-wide">SOLUTIONS</h2>
        <h1 className="text-4xl font-bold mt-2">Terms & Conditions</h1>
        <p className="text-green-200 mt-3">
          Please read all terms carefully before using our platform
        </p>
        <p className="text-sm text-green-300 mt-2">
          Last Updated: April 20, 2026
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">

        {[
          "Acceptance of Terms",
          "Purpose of the Service",
          "User Responsibilities",
          "Medical Disclaimer",
          "Data Privacy",
          "Limitation of Liability",
          "System Availability",
          "Intellectual Property",
          "Changes to Terms",
          "Contact Information"
        ].map((title, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition border border-green-100"
          >
            <h3 className="font-semibold text-green-700 mb-2">
              {index + 1}. {title}
            </h3>

            <p className="text-gray-700 text-sm leading-relaxed">
              {index === 0 &&
                "By using this platform, you agree to follow all terms and conditions. If you do not agree, please do not use the service."}

              {index === 1 &&
                "This system uses AI to analyze data and provide predictions. It is designed for educational and informational purposes only."}

              {index === 2 &&
                "Users must provide correct data, use the system responsibly, and not misuse or harm the platform."}

              {index === 3 &&
                "Results are AI-based predictions and should not be considered medical advice. Always consult professionals."}

              {index === 4 &&
                "User data is handled securely and used only for improving system performance and services."}

              {index === 5 &&
                "We are not responsible for any decisions taken based on system predictions or results."}

              {index === 6 &&
                "We do not guarantee uninterrupted service. The system may be updated or changed anytime."}

              {index === 7 &&
                "All content, design, and technology belong to the platform and cannot be reused without permission."}

              {index === 8 &&
                "Terms may be updated anytime. Continued use means acceptance of new terms."}

              {index === 9 &&
                "For any questions, contact us via email or visit our support page."}
            </p>
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="text-center pb-12">
        <Link
          href="/profile/contactus"
          className="bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-800 hover:scale-105 transition"
        >
          Contact Support
        </Link>
      </div>
      <Footer />
    </div>
  );
}