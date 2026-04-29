"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FaLeaf, FaChartLine } from "react-icons/fa";

export default function Page() {
  return (
    <>
      <Head>
        <title>About Us | AgroVision</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 px-4 py-8 border-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">


          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 backdrop-blur-md bg-white/60 p-6 rounded-2xl shadow-xl border border-white/30"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaLeaf className="text-green-600" />
              About AgroVision AI
            </h1>

            <div className="text-gray-800 space-y-4 leading-relaxed text-justify">
              <p>
                AgroVision AI is an innovative and technology-driven platform dedicated to transforming cattle breed identification through the use of advanced artificial intelligence and machine learning techniques. The platform has been developed with the objective of assisting farmers, livestock managers, researchers, and animal enthusiasts in accurately identifying and understanding a wide range of cattle breeds. By leveraging modern AI models and image-based analysis, AgroVision AI enables users to obtain precise and reliable results in a quick and efficient manner. The system is designed with a user-friendly interface, ensuring accessibility for users with varying levels of technical knowledge, thereby bridging the gap between advanced technology and practical agricultural applications. Over time, AgroVision AI aims to expand its functionalities beyond breed identification by integrating features such as cattle health monitoring, disease detection, productivity analysis, and intelligent livestock management solutions. The platform envisions contributing significantly to the agriculture and dairy sectors by promoting data-driven decision-making, improving breed management practices, and enhancing overall efficiency. With a strong focus on innovation, accuracy, and usability, AgroVision AI strives to become a comprehensive and reliable digital solution for modern livestock management and smart farming practices.
              </p>

              <p>
                Users upload an image of the plant, and the system analyzes it using trained AI models to provide accurate and fast results.
              </p>
            </div>

            {/* MAP */}
            <div className="mt-6 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=26.459274,82.493032&z=15&output=embed"
                className="w-full h-64"
                loading="lazy"
              ></iframe>
            </div>

            {/* BUTTON */}
            <div className="mt-6 flex justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md transition">
                Contact Us
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-md bg-white/60 rounded-2xl shadow-xl p-6 border border-white/30 flex flex-col gap-6"
          >

            {/* Achievements */}
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
                <FaChartLine />
                Achievements
              </h2>

              <ul className="space-y-2 text-gray-800">
                <li>✔ 95% accuracy in plant disease detection</li>
                <li>✔ Fast AI-based predictions</li>
                <li>✔ User-friendly interface</li>
                <li>✔ Real-time image analysis</li>
              </ul>
            </div>
            {/* Future Scope Section */}
            <div> 
              <h2 className="text-2xl font-bold text-blue-700 mb-3">What's Next?</h2>
              <p className="text-gray-600"> 
                We aim to enhance our platform by improving model accuracy and expanding its capabilities to include real-time plant disease detection, crop health monitoring, and advanced analytics. Future updates will also focus on providing detailed treatment suggestions and building a smarter, more efficient solution for modern agriculture. 
                </p> 
                </div>



          </motion.div>

        </div>
      </div>
    </>
  );
}