"use client";

import React from "react";

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-green-700 mb-10">
          Opportunities
        </h1>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Internship */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-4">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Internships
            </h2>
            <p className="text-gray-600">
              Explore internship opportunities in Artificial Intelligence, Machine Learning, and Web Development to gain practical industry experience.
            </p>
          </div>

          {/* Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-4">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Job Opportunities
            </h2>
            <p className="text-gray-600">
              Discover job openings in leading tech companies and startups working in agriculture, AI, and smart technology solutions.
            </p>
          </div>

          {/* Research */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-4">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Research Projects
            </h2>
            <p className="text-gray-600">
              Participate in innovative research projects focused on plant disease detection, smart farming, and advanced agricultural technologies.
            </p>
          </div>

          {/* Awareness Section */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md border-4">
            <h2 className="text-2xl font-bold text-red-700 mb-4">
              Awareness & Education
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              AgroVision AI is committed to spreading awareness about plant health and modern agricultural technologies by leveraging the power of artificial intelligence. Our platform focuses on educating farmers, students, and agricultural enthusiasts about the importance of early disease detection, proper crop management, and the adoption of smart farming practices. By providing accurate and timely insights, we help users identify plant diseases at an early stage, reducing potential crop losses and improving overall productivity.
            </p>
          </div>
          {/* How It Works */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow border-4">
            <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-6 text-center">

              <div>
                <div className="text-3xl mb-2 border-4">📤</div>
                <p className="font-semibold text-green-600 ">Upload Image</p>
                <p className="text-gray-600 text-sm">
                  Upload a clear image of the plant.
                </p>
              </div>

              <div>
                <div className="text-3xl mb-2 border-4">⚙️</div>
                <p className="font-semibold  text-green-600">AI Analysis</p>
                <p className="text-gray-600 text-sm">
                  Our model analyzes the image.
                </p>
              </div>

              <div>
                <div className="text-3xl mb-2 border-4">📊</div>
                <p className="font-semibold  text-green-600 ">Get Result</p>
                <p className="text-gray-600 text-sm">
                  View disease prediction instantly.
                </p>
              </div>

            </div>
          </div>
          {/* Features Section */}
          <div className="mt-12 px-4 bg-white p-6 rounded-lg shadow-md border-4">
            <h2 className="text-2xl font-bold text-center text-red-700 mb-8">
              Key Features
            </h2>

            {/* Column layout */}
            <div className="flex flex-col gap-6 max-w-xl mx-auto border-4">

              {/* Card 1 */}
              <div className="bg-blue-300 p-6 rounded-lg shadow text-center">
                <h3 className="font-semibold text-green-600 mb-2 text-lg">
                  AI-Based Detection
                </h3>
                <p className="text-gray-600 text-sm ">
                  Detect plant diseases accurately using advanced AI models.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-blue-300 p-6 rounded-lg shadow text-center border-4">
                <h3 className="font-semibold text-green-600 mb-2 text-lg">
                  Fast Results
                </h3>
                <p className="text-gray-600 text-sm">
                  Get instant results by uploading plant images.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-blue-300  p-6 rounded-lg shadow text-center ">
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
  );
}