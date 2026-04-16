"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

type VerifyType = { email: string; password: string; };
type ErrorType = { email?: string; password?: string; general?: string; };

function Page() {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const [errors, setErrors] = useState<ErrorType>({});
  const [verify, setVerify] = useState<VerifyType>({
    email: "", password: "",
  });

  const setdata = (e: ChangeEvent<HTMLInputElement>) => {
    setVerify({ ...verify, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "", }));
  };

  const api = process.env.NEXT_PUBLIC_API_URL || "https://unvision-first.onrender.com";
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
      router.push("/profile/home");
    } catch (error) {
      setErrors({ general: "Server error, try again!" });
    }
  };


  return (
    <div className="flex justify-center  items-center overflow-y-scroll h-screen bg-linear-to-r from-blue-500 to-teal-400">
      <div className=" flex justify-center rounded-2xl max-w-fit p-4 max-h-fit  font-serif text-white bg-radial from-blue-800 via-blue-900 to-blue-950">
        <div>
          <div className=" flex justify-center text-center">
            <div className=' text-center w-60  border-0 rounded-lg bg-blue-500 p-1   font-serif'> PLEASE SIGN IN </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="font-bold mt-6 ">
              <label htmlFor="email" className="mr-13">  Email : </label>
              <input type="email" name="email" placeholder="Enter your email" value={verify.email} onChange={setdata} className="my-3 p-1 border-2 rounded-lg w-60" />
              {/* {errors.email && (<p style={{ color: "red", fontSize: 12 }}> {errors.email}</p>)} */}
            </div>
            <div className="font-bold mt-2  ">
              <label htmlFor="password" className="mr-6"> Password :</label>
              <input type="password" name="password" placeholder="Enter password" value={verify.password} onChange={setdata} className=" w-60 p-1 border-2 rounded-lg" />
              {/* {errors.password && (<p style={{ color: "red", fontSize: 12 }}>    {errors.password}  </p>)} */}
            </div>
            {errors.general && (<p style={{ color: "red", textAlign: "center" }}> {errors.general} </p>)}

            <div className="flex  justify-around w-full my-4">
              <Link href="/" className="flex justify-center items-center w-30 bg-white text-black rounded-sm p-1 ">
                <p>Back</p>
              </Link>
              <div className="flex justify-center  items-center w-30 bg-blue-500  rounded-sm p-1">
                <input type="submit" value="Login" />
              </div>

            </div>
          </form>
          <div className="flex flex-col items-center text-center w-full gap-2 ">
            <p>
              Don't have an account?
              <Link href="/signup" className="ml-2 text-blue-400 hover:underline">
                Signup
              </Link>
            </p>
            <div className="flex items-center w-full max-w-xs">
              <hr className="grow border-t border-gray-400" />
              <span className="mx-3 text-sm">OR</span>
              <hr className="grow border-t border-gray-400" />
            </div>

            <button
              onClick={() => window.location.href = "https://unvision-first.onrender.com/auth/google"}
              className="w-full max-w-xs bg-white text-black py-2 rounded-md shadow hover:bg-gray-100 transition"
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