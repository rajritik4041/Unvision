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
    }
    const SetClick2 = async () => {
        setpage1(false)
        setpage2(true)
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

            const res = await fetch("http://127.0.0.1:8000/reset-password", {
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
    return (
        <div >
            {page1 ? <div className=" bg-amber-500 ">
                <form onSubmit={handleSubmit(SubmitData1)} >
                    <label htmlFor="email">Email : OTP rajritik.4041@gmail.com </label>
                    <input type="email" name="email" className="bg-gray-500" onChange={setdata} />
                    {errors.general && (<p style={{ color: "red", textAlign: "center" }}> {errors.general} </p>)}
                    <input type="submit" value="Submit" />
                </form>
            </div> : page3 ? <div className="bg-red-500">
                <div>
                    <form onSubmit={handleSubmit(setsubmitedpassword)}>
                        <p>{user.email}</p>
                        {/* yaha tum apna piyus otp wala 
                        bana dena  alag se me add kar dunga  */}
                        {/* return ke uper vale chejo ko pada karo  */}
                        <input type="number" name="otp" onChange={setdata2} />
                        {errors.otp && (<p style={{ color: "red", fontSize: 12, }}>{errors.otp}</p>)}
                        <input type="password" name="password" onChange={setdata2} />
                        {errors.password && (<p style={{ color: "red", fontSize: 12, }}>{errors.password}</p>)}
                        <input type="password" name="confirmPassword" onChange={setdata2} />
                        {errors.confirmPassword && (<p style={{ color: "red", fontSize: 12, }}>{errors.confirmPassword}</p>)}
                        <input type="submit" value="Submited" />
                    </form>
                </div>
            </div> : <div className="bg-green-400">
                <div >
                    <button onClick={SetClick1}>Reset Password Using OTP </button> <br />
                </div>
            </div>

            }





            {page2 ?
                <div>
                    <div className="bg-pink-400">
                        <form onSubmit={handleSubmit(SubmitData2)} >
                            <label htmlFor="email">Email : Link rajritik.4041@gmail.com</label>
                            <input type="email" name="email" className="bg-gray-500" onChange={setdata} />
                            {errors.general && (<p style={{ color: "red", textAlign: "center" }}> {errors.general} </p>)}
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div> :
                <div className="bg-yellow-400-400">
                    <div >

                        <button onClick={SetClick2}>Reset Password Using Link</button> <br />
                    </div>
                </div>}
        </div>
    );
}