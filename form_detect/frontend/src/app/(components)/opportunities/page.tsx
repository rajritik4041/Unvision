"use client";

import React from "react";
import Navbar from "@/app/components/navbar/page";

export default function OpportunitiesPage() {
  return (<div>

    <Navbar />
    <div className="min-h-screen bg-green-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-10">
          OPPORTUNITIES
        </h1>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Internship */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition ">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              INTERNSHIPS
            </h2>
            <p className="text-gray-600">
              Explore internship opportunities in Artificial Intelligence, Machine Learning, and Web Development to gain practical industry experience.
            </p>
          </div>

          {/* Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition ">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              JOB OPPORTUNITIES
            </h2>
            <p className="text-gray-600">
              Discover job openings in leading tech companies and startups working in agriculture, AI, and smart technology solutions.
            </p>
          </div>

          {/* Research */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition ">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              RESEARSH PROJECTS
            </h2>
            <p className="text-gray-600">
              Participate in innovative research projects focused on plant disease detection, smart farming, and advanced agricultural technologies.
            </p>
          </div>
        </div>

          {/* Awareness Section */}
          <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md ">
            <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
              AWARENESS & EDUCATION
            </h2>

            <ul className="text-black list-disc p-1 ">
              <div className="bg-white p-6 w-full rounded-lg shadow-md hover:shadow-lg transition my-2">

                <li>AgroVision AI focuses on spreading awareness about plant health and modern agricultural technologies</li>
              </div>
              <div className="bg-white p-6 w-full rounded-lg shadow-md hover:shadow-lg transition my-2">

                <li>Uses artificial intelligence to support smarter farming practices</li>
              </div>
              <div className="bg-white p-6 w-full rounded-lg shadow-md hover:shadow-lg transition my-2">

                <li>Educates farmers, students, and agricultural enthusiasts</li>
              </div>
              <div className="bg-white p-6 w-full rounded-lg shadow-md hover:shadow-lg transition my-2">

                <li>Highlights the importance of early disease detection</li>
              </div>
              <div className="bg-white p-6 w-full rounded-lg shadow-md hover:shadow-lg transition my-2">

                <li>Promotes proper crop management techniques</li>
              </div>
              <div className="bg-white p-6 w-full rounded-lg shadow-md hover:shadow-lg transition my-2">

                <li>Encourages adoption of smart and modern farming methods</li>
              </div>
              <div className="bg-white p-6 w-full rounded-lg shadow-md hover:shadow-lg transition my-2">

                <li>Provides accurate and timely insights for better decision-making</li>
              </div>
              <div className="bg-white p-6 w-full rounded-lg shadow-md hover:shadow-lg transition my-2">

                <li>Helps identify plant diseases at an early stage</li>
              </div>
              <div className="bg-white p-6 w-full rounded-lg shadow-md hover:shadow-lg transition my-2">

                <li>Reduces potential crop losses</li>
              </div>
              <div className="bg-white p-6 w-full rounded-lg shadow-md hover:shadow-lg transition my-2">

                <li>Improves overall agricultural productivity</li>
              </div>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
          {/* How It Works */}
          <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow ">
            <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
              HOW IT WORKS
            </h2>

            <div className="grid md:grid-rows-3 gap-6 text-center">

              <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition">
                <div className="text-3xl mb-2 ">📤</div>
                <p className="font-semibold text-green-600 ">&nbsp;Upload  &nbsp;Image</p>
                <p className="text-gray-600 text-sm">
                  Upload a clear image of the plant.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition">
                <div className="text-3xl mb-2 ">⚙️</div>
                <p className="font-semibold  text-green-600">AI Analysis</p>
                <p className="text-gray-600 text-sm">
                  Our model analyzes the image.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition">
                <div className="text-3xl mb-2 ">📊</div>
                <p className="font-semibold  text-green-600 ">Get Result</p>
                <p className="text-gray-600 text-sm">
                  View disease prediction instantly.
                </p>
              </div>

            </div>
          </div>
          {/* Features Section */}
          <div className="mt-12 px-4 bg-gray-100 p-6 rounded-lg shadow-md ">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
              KEY FEATURES
            </h2>

            {/* Column layout */}
            <div className="flex flex-col gap-6 max-w-xl mx-auto ">

              {/* Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition ">
                <div className="m-4">
                <h3 className="font-semibold text-green-600 mb-2 text-lg">
                  AI-Based Detection
                </h3>
                <p className="text-gray-600 text-sm ">
                  Detect plant diseases accurately using advanced AI models.
                </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition  ">
                 <div className="m-4">
                <h3 className="font-semibold text-green-600 mb-2 text-lg">
                  Fast Results
                </h3>
                <p className="text-gray-600 text-sm">
                  Get instant results by uploading plant images.
                </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white  p-6 rounded-lg shadow text-center hover:shadow-lg transition">
                 <div className="m-4">
                <h3 className="font-semibold text-green-600 mb-2 text-lg">
                  User Friendly
                </h3>
                <p className="text-gray-600 text-sm">
                  Simple and easy-to-use interface for everyone.
                </p>
                </div>
              </div>

          </div>
            </div>
          </div>

      </div>
    </div>
  </div>
  );
}