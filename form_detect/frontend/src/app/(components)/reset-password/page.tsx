"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
type userType = { email: string; };
type ErrorType = { email?: string; general?: string; };
type VerifyType = { password: string; otp: string; confirmPassword: string; };
export default function ResetPassword() {
    const { handleSubmit } = useForm();
    const router = useRouter();
    const [page1, setpage1] = useState<boolean>(false)
    const [page2, setpage2] = useState<boolean>(false)
    const [page3, setpage3] = useState<boolean>(false)
    const [errors, setErrors] = useState<ErrorType>({});
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


        } catch (error) {
            console.log("Fetch Error:", error);
        }
        setpage1(false)
        setpage3(true)
    };



    const SetClick1 = async () => {
        setpage1(true)
    }
    const SetClick2 = async () => {
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


        } catch (error) {
            console.log("Fetch Error:", error);
        }
        setpage2(false)
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
            console.log(data);
        }
        catch (err) {
            console.log("ERROR:", err);
        }
    }
    return (
        <div>

            {page1 ? <div>
                <form onSubmit={handleSubmit(SubmitData1)} >
                    <label htmlFor="email">Email : OTP rajritik.4041@gmail.com </label>
                    <input type="email" name="email" className="bg-gray-500" onChange={setdata} />
                    {errors.general && (<p style={{ color: "red", textAlign: "center" }}> {errors.general} </p>)}
                    <input type="submit" value="Submit" />
                </form>
            </div> : page3 ? <div>
                <div>
                    <form onSubmit={handleSubmit(setsubmitedpassword)}>
                        <p>{user.email}</p>
                        <input type="number" name="otp" onChange={setdata2} />
                        <input type="password" name="password" onChange={setdata2} />
                        <input type="password" name="confirmPassword" onChange={setdata2} />
                        <input type="submit" value="Submited" />
                    </form>
                </div>
            </div> : <div>
                <div>
                    <button onClick={SetClick1}>Reset Password Using OTP </button> <br />
                </div>
            </div>

            }















            {page2 ?
                <div>
                    <div>
                        <form onSubmit={handleSubmit(SubmitData2)} >
                            <label htmlFor="email">Email : Link rajritik.4041@gmail.com</label>
                            <input type="email" name="email" className="bg-gray-500" onChange={setdata} />
                            {errors.general && (<p style={{ color: "red", textAlign: "center" }}> {errors.general} </p>)}
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div> :
                <div>
                    <div>

                        <button onClick={SetClick2}>Reset Password Using Link</button> <br />
                    </div>
                </div>}
        </div>
    );
}