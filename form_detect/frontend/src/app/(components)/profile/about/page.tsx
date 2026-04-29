"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FaLeaf, FaChartLine } from "react-icons/fa";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <Navbar />
            <Head>
                <title>About Us | AgroVision</title>
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 px-4 py-8 border-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 backdrop-blur-md bg-white/60 p-6 rounded-2xl shadow-xl border border-white/30"
                    >
                        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaLeaf className="text-green-600" />
                            About Unvision
                        </h1>

                        <div className="text-gray-800 space-y-4 leading-relaxed text-justify">
                            <p>
                                Unvision is an innovative, AI-powered platform designed to transform animal recognition and cattle breed identification using advanced machine learning technology.
                            </p>
                            <p>
                                It helps farmers, livestock managers, researchers, and animal enthusiasts easily identify different animal breeds with high accuracy. By simply uploading an image, users can get fast, reliable, and precise results through intelligent image-based analysis.
                            </p>
                            <p>
                                Unvision is built with a simple and user-friendly interface, making it accessible even for users with minimal technical knowledge. Our goal is to bridge the gap between advanced AI technology and real-world agricultural needs.
                            </p>
                            <p>
                                Looking ahead, Unvision aims to expand beyond basic recognition by introducing powerful features such as:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Animal health monitoring</li>
                                <li>Disease detection</li>
                                <li>Productivity analysis</li>
                                <li>Smart livestock management solutions</li>
                            </ul>
                            <p>
                                By enabling data-driven decisions, Unvision supports farmers in improving efficiency, managing livestock better, and increasing productivity in the agriculture and dairy sectors.
                            </p>

                            <p>
                                With a strong focus on innovation, accuracy, and usability, Unvision is built to become a complete digital solution for modern farming and livestock management.
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
                            <Link href="/profile/contactus" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md transition">
                                Contact Us
                            </Link>
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
            <Footer />
        </>
    );
}