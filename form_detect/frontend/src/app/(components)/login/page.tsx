"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuthTokenCookie } from "@/lib/auth-cookie";

type VerifyType = { email: string; password: string; };
type ErrorType = { email?: string; password?: string; general?: string; };

function Page() {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const [errors, setErrors] = useState<ErrorType>({});
  const [show, setShow] = useState<boolean>(false);
  const [verify, setVerify] = useState<VerifyType>({
    email: "", password: "",
  });

  const setdata = (e: ChangeEvent<HTMLInputElement>) => {
    setVerify({ ...verify, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "", }));
  };

 const api = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const onSubmit = async () => {
    try {
      setErrors({});
      if (!verify.email || !verify.password) {
        setErrors({ general: "All fields required" });
        return;
      }
      const res = await fetch(`${api}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verify),
         credentials: "include",
      });
      const result = await res.json();
      if (!result.success) {
        const errorObj: ErrorType = {};
        if (result.errors && Array.isArray(result.errors)) {
          result.errors.forEach((err: any) => {
            if (err.path) {
              errorObj[err.path as keyof ErrorType] = err.msg;
            }
          });
        }
        if (!result.errors && result.message) {
          errorObj.general = result.message;
        }
        setErrors(errorObj);
        return;
      }
      localStorage.setItem("token", result.token);
      setAuthTokenCookie(result.token);
      router.push("/profile/home");
    } catch (error) {
      setErrors({ general: "Server error, try again!" });
    }
  };


  return (
    <div className="flex w-screen justify-center  items-center overflow-y-scroll h-screen bg-linear-to-r from-blue-500 to-teal-400">
      <div className=" flex justify-center rounded-2xl w-full max-w-md  p-4  font-serif text-white bg-radial from-blue-800 via-blue-900 to-blue-950">
        <div className="w-full ">
          <div className=" w-full flex justify-center  text-center">
            <div className=' text-center w-full border-0 rounded-lg bg-blue-500 p-1   font-serif'> PLEASE SIGN IN </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="relative w-full mt-8">
              <input type="email" name="email" value={verify.email} onChange={setdata} required
                className="peer w-full px-4 pt-6 pb-2 pr-10 rounded-xl border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm" />
              <label htmlFor="email"
                className="absolute left-4 top-3 text-gray-500 text-sm 
        transition-all duration-200 
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 
        peer-valid:top-1 peer-valid:text-xs"
              >
                Email
              </label>
            </div>
            <div className="relative w-full mt-4 ">
              <input type="password" name="password" value={verify.password} onChange={setdata} required
                className="peer w-full px-4 pt-6 pb-2 pr-10 rounded-xl border border-gray-300         focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm" />
              <label htmlFor="password"
                className="absolute left-4 top-3 text-gray-500 text-sm 
                transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500  peer-valid:top-1 peer-valid:text-xs"  >
                Password
              </label>
            </div>
            {errors.general && (<p style={{ color: "red", textAlign: "center" }}> {errors.general} </p>)}


            <div className="mt-8">
              <div>
                <div>
                  <input className="w-full flex justify-center  items-center  bg-blue-500  rounded-sm p-2" type="submit" value="Login" />
                </div>
              </div>
              <div className="mt-4">
                <Link href="/" className=" w-full flex justify-center items-center  bg-red-500 text-black rounded-sm p-2 mb-2 ">
                  <p>Back</p>
                </Link>
              </div>
            </div>
          </form>
          <div className="text-center w-full">
            <Link href="/forgot-password" className="ml-2 text-red-400 hover:underline">
              Forget Password?
            </Link>
          </div>
          <div className="text-center w-full">
            <Link href="/reset-password" className="ml-2 text-red-400 hover:underline">
              Reset Password?
            </Link>
          </div>
          <div className="flex flex-col items-center text-center w-full gap-2 ">
            <p>
              Don't have an account?
              <Link href="/signup" className="ml-2 text-blue-400 hover:underline">
                Signup  </Link>
            </p>
            <div className="flex items-center w-full max-w-xs">
              <hr className="grow border-t border-gray-400" />
              <span className="mx-3 text-sm">OR</span>
              <hr className="grow border-t border-gray-400" />
            </div>

            <button
              onClick={() => window.location.href = "https://unvision-first.onrender.com/auth/google"}
              className="w-full  bg-white text-black py-2 rounded-md shadow hover:bg-gray-100 transition"
            >
              Continue with Google
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;