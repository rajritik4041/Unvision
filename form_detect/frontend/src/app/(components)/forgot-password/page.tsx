"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
type VerifyType = { email: string; };
type ErrorType = { email?: string; general?: string; };

export default function ForgotPassword(){

    const { handleSubmit } = useForm();
    const router = useRouter();
    const [errors, setErrors] = useState<ErrorType>({});
    const [verify, setVerify] = useState<VerifyType>({
        email: "",
    });

    
    return (
        <div className="bg-green-100 flex items-center justify-center min-h-screen">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                {/* <!-- Title --> */}
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                    🌿 Forgot Password
                </h2>

                {/* <!-- Email Section --> */}
                <div className="mb-6">
                    <label className="block text-gray-600 mb-2">Enter your Email</label>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <div className="flex gap-3 mt-4">
                        <button className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                            Send OTP
                        </button>
                        <button className="w-1/2 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition">
                            Verify Email
                        </button>
                    </div>
                </div>

                {/* <!-- OTP Section --> */}
                <div className="mb-6">
                    <label className="block text-gray-600 mb-2">Enter OTP</label>
                    <div className="flex justify-between gap-2">
                        <input type="text" className="w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                        <input type="text" className="w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                        <input type="text" className="w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                        <input type="text" className="w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                        <input type="text" className="w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                        <input type="text" className="w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                </div>

                {/* <!-- Divider --> */}
                <hr className="my-6"/>

                    {/* <!-- Password Section --> */}
                    <div className="mb-6">
                        <label className="block text-gray-600 mb-2">New Password</label>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
                        />

                        <label className="block text-gray-600 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* <!-- Reset Button --> */}
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                        Reset Password
                    </button>

                    {/* <!-- Footer --> */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Plant Disease Detection System
                    </p>

            </div>
        </div>


)};
