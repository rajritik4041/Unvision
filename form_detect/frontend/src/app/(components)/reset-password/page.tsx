"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
type userType = { email: string; };
type ErrorType = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    otp?: string;
    general?: string;
    [key: string]: string | undefined;  // ⭐ important
};
type VerifyType = { password: string; otp: string; confirmPassword: string; };
export default function ResetPassword() {
    const { handleSubmit } = useForm();
    const router = useRouter();
    const [page1, setpage1] = useState<boolean>(false)
    const [page2, setpage2] = useState<boolean>(false)
    const [page3, setpage3] = useState<boolean>(false)
    const [page4, setpage4] = useState<boolean>(false)
    const [page5, setpage5] = useState<boolean>(false)
    const [errors, setErrors] = useState<ErrorType>({});
    const [errors2, setErrors2] = useState<ErrorType>({});
    const [user, setUser] = useState<userType>({
        email: "",
    });
    const [verify, setVerify] = useState<VerifyType>({
        password: "", confirmPassword: "", otp: ""
    });
    const [otp, setOtp] = useState<string>("");

    const setdata = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: "", }));
    };

    const setdata2 = (e: ChangeEvent<HTMLInputElement>) => {
        setVerify({ ...verify, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: "", }));
    };
    const SubmitData1 = async () => {
        try {
            setErrors({});
            const email = user.email; if (!email || email.trim() === "") { alert("Please enter email first"); return; }
            console.log(user.email);
            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
            setOtp(newOtp);
            const res = await fetch("http://localhost:3000/api/reset-mail-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: newOtp }),
                credentials: "include",
            });
            const result = await res.json();
            if (res.status === 429) {
                setErrors({ general: result.message });
                return;
            }
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
            if (result.success) {
                setpage1(false)
                setpage3(true)
            }
        } catch (error) {
            console.log("Fetch Error:", error);
        }

    };

    const SetClick1 = async () => {
        setpage2(false)
        setpage1(true)
        setpage5(true)
    }
    const SetClick2 = async () => {
        setpage1(false)
        setpage2(true)
        setpage4(true)
    }

    const SubmitData2 = async () => {
        try {
            setErrors({});
            const email = user.email; if (!email || email.trim() === "") { alert("Please enter email first"); return; }
            console.log(user.email);
            const res = await fetch("http://localhost:3000/api/reset-mail-link", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
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
            if (result.success) {
                setpage2(false)
            }
        } catch (error) {
            console.log("Fetch Error:", error);
        }

    };

    const setsubmitedpassword = async () => {
        try {
            const email = user.email;

            const res = await fetch("http://localhost:8000/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    otp: verify.otp,
                    password: verify.password,
                    confirmPassword: verify.confirmPassword
                })
            });
            const data = await res.json();
            if (!res.ok) {
                const errorObj: ErrorType = {};
                if (data?.detail) {
                    if (Array.isArray(data.detail)) {
                        data.detail.forEach((err: any) => {
                            const field = err.loc?.[1];
                            if (field) {
                                errorObj[field] = err.msg.replace("Value error, ", "");
                            }
                        });
                    } else if (typeof data.detail === "object") {
                        Object.keys(data.detail).forEach((key) => {
                            errorObj[key] = data.detail[key];
                        });
                    } else if (typeof data.detail === "string") {
                        errorObj["general"] = data.detail.replace("Value error, ", "");
                    } else {
                        errorObj["general"] = "Something went wrong";
                    }
                }

                setErrors(errorObj);
            }
            else {
                alert("Reset Password Succeefully"); router.push("/login");
            }
            console.log(data);
        }
        catch (err) {
            console.log("ERROR:", err);
        }
    }
    const setinputclass = "peer  w-full  px-4 pt-6 pb-2 pr-10  rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-grey-500 focus:border-grey-500 text-sm";
    const setlabelclass =
        "absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-black-700 peer-valid:top-1 peer-valid:text-xs";
    return (

        <div className="bg-green-100 text-black min-h-screen flex justify-center items-center ">
            <div className="border-2 max-h-fit  rounded-2xl shadow-xl p-8 max-w-fit bg-white ">
                <div className="text-center mb-6 text-green-700 text-2xl  font-extrabold">🌿 Reset Password</div>
                <div className=" mt-9 " >

                    {page1 ? <div className=" text-black ">
                        <form onSubmit={handleSubmit(SubmitData1)} className="w-full" >
                            <div className="relative w-full mt-4 ">
                                <input type="email" name="email" onChange={setdata} required className={setinputclass} />
                                <label htmlFor="email" className={setlabelclass} >  Email : </label>
                            </div>
                            {errors.general && (<p style={{ color: "red", textAlign: "center" }}> {errors.general} </p>)}
                            <div className="text-center w-full ">
                                <input type="submit" value="Submit" className=" text-black-700 w-fit text-center bg-green-500 mt-4 rounded-lg py-1 px-3" />
                            </div>
                        </form>
                    </div> : page3 ? <div className="bg-red-500">
                        <div>
                            <form onSubmit={handleSubmit(setsubmitedpassword)} >
                                <p>{user.email}</p>

                                <input type="number" name="otp" onChange={setdata2} />
                                {errors.otp && (<p style={{ color: "red", fontSize: 12, }}>{errors.otp}</p>)}
                                <input type="password" name="password" onChange={setdata2} />
                                {errors.password && (<p style={{ color: "red", fontSize: 12, }}>{errors.password}</p>)}
                                <input type="password" name="confirmPassword" onChange={setdata2} />
                                {errors.confirmPassword && (<p style={{ color: "red", fontSize: 12, }}>{errors.confirmPassword}</p>)}
                                <input type="submit" value="Submited" />
                            </form>
                        </div>
                    </div> :
                        page4 ?
                            <div>

                            </div> : <div>
                                <div className=" bg-green-400 text-center h-10 w-60  rounded-md pt-2">
                                    <div className=" ">
                                        <button onClick={SetClick1}>Reset Password Using OTP </button> <br />
                                    </div>
                                </div> </div>

                    }





                    {page2 ?
                        <div>
                            <div className="w-full text-black ">
                                <form onSubmit={handleSubmit(SubmitData2)} className="w-full">
                                    <div className="relative w-full mt-4 ">
                                        <input type="email" name="email" onChange={setdata} required className={setinputclass} />
                                        <label htmlFor="email" className={setlabelclass} >Email : </label>
                                    </div>
                                    {errors.general && (<p style={{ color: "red", textAlign: "center" }}> {errors.general} </p>)}
                                    <div className="text-center w-full ">
                                        <input type="submit" value="Submit" className=" text-black-700 w-fit text-center bg-green-500 mt-4 rounded-lg py-1 px-3" /></div>
                                </form>
                                <div className="mt-2 w-full text-center  ">

                                    <p className=" text-black-700 w-full text-center mt-4 rounded-lg " >
                                        <Link className="w-96  bg-red-600  rounded-lg py-1 px-3 text-center " href="/">
                                            Back</Link>
                                    </p>

                                </div>
                            </div>
                        </div> :
                        page5 ?

                            <div></div>
                            :
                            <div>
                                <div className="bg-yellow-400-400 text-center text-white pt-1  mt-6 bg-green-700 h-11 w-60 rounded-md border-2 ">
                                    <div  >
                                        <button onClick={SetClick2}>Reset Password Using Link</button> <br />
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}