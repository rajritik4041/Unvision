"use client";
import React from "react";
import Head from "next/head";


function page() {
  return (
    <>
      <Head>
        <title>About Us | AgroVision: AI-Powered Plant Disease Identification Platform </title>

        <meta
          name="description"
          content="Learn more about AgroVision AI and how it uses advanced artificial intelligence to accurately identify cattle breeds. Discover how our platform helps you understand and classify cattle with precision using smart technology, making breed identification faster, easier, and more reliable. "

       />
           <link rel="canonical" href="http://localhost:3000/aboutus"/>
    </Head>
    <div className="min-h-screen bg-blue-100 px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About The AgroVision</h1>
        <div className="text-blue-700 space-y-4 leading-relaxed text-justify">
          <p>
            AgroVision AI is an innovative and technology-driven platform dedicated to transforming cattle breed identification through the use of advanced artificial intelligence and machine learning techniques. The platform has been developed with the objective of assisting farmers, livestock managers, researchers, and animal enthusiasts in accurately identifying and understanding a wide range of cattle breeds. By leveraging modern AI models and image-based analysis, AgroVision AI enables users to obtain precise and reliable results in a quick and efficient manner. The system is designed with a user-friendly interface, ensuring accessibility for users with varying levels of technical knowledge, thereby bridging the gap between advanced technology and practical agricultural applications.
            Over time, AgroVision AI aims to expand its functionalities beyond breed identification by integrating features such as cattle health monitoring, disease detection, productivity analysis, and intelligent livestock management solutions. The platform envisions contributing significantly to the agriculture and dairy sectors by promoting data-driven decision-making, improving breed management practices, and enhancing overall efficiency. With a strong focus on innovation, accuracy, and usability, AgroVision AI strives to become a comprehensive and reliable digital solution for modern livestock management and smart farming practices.
          </p>
          <p>
            The working process of AgroVision AI is designed to be simple and user-friendly. Users begin by uploading an image of the plant directly through the platform. Once the image is submitted, the system processes it using advanced machine learning models trained on a wide range of plant data. The model then analyzes the visual features of the plant and predicts the presence of any disease with high accuracy. The results are presented in a clear and human-readable format, making it easy for users to understand the condition of the plant and take appropriate action. This seamless process ensures quick, reliable, and efficient plant disease identification for users at all levels
            </p>
        </div>
        <div className="mt-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d973.7932121768564!2d82.49303210412259!3d26.459274824971523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399093cbf6ffffff%3A0xe886e928b8f0a1e7!2sMahamaya%20College%20of%20Agricultural%20Engineering%20And%20Technology!5e0!3m2!1sen!2sin!4v1744024465195!5m2!1sen!2sin"
            className="w-full h-64 rounded"
            style= {{ border: 0}}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
        <div className="mt-6 flex justify-center">
          <a href="/contact us"
                className="bg-green-600 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition">
                Contact Us
          </a>
        </div>
      </div>
        { /* RIGHT COLUMN: ACHIEVEMENTS(Accuracy) + FUTURE SECTIONS*/}
        <div  className="lg:w-1/3 w-full bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6">
        {/* Achievements Section */}
        <div>
       <h2 className="text-2xl font-bold text-green-700 mb-3">Our Achievements</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
       <li>Our AI model has achieved an accuracy of approximately 95% in plant disease detection.</li>
      <li>The system provides fast and reliable predictions using advanced machine learning techniques.</li>
      <li>Designed with a user-friendly interface to ensure easy access for farmers and researchers.</li>
     <li>Successfully integrates image-based analysis for real-time plant disease identification.</li>
    </ul>
</div>
      {/* Future Scope Section */}
  <div>
  <h2 className="text-2xl font-bold text-blue-700 mb-3">What's Next?</h2>
  <p className="text-gray-600">
    We aim to enhance our platform by improving model accuracy and expanding its capabilities to include real-time plant disease detection, crop health monitoring, and advanced analytics. Future updates will also focus on providing detailed treatment suggestions and building a smarter, more efficient solution for modern agriculture.
   </p>
      </div>
       </div> 
    </div>
    </>
  );
}



export default page;