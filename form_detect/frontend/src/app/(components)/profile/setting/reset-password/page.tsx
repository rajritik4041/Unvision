"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clearAuthTokenCookie, setAuthTokenCookie } from "@/lib/auth-cookie";
type userType = { email: string; };
type Error2Type = {
    confirmpassword?: string; general?: string;
    oldpassword?: string; newpassword?: string;
    email?: string;
};
type ErrorType = {
    email?: string; password?: string;
    confirmPassword?: string;
    otp?: string;
    general?: string;
    oldpassword?: string;
    newpassword?: string;
    [key: string]: string | undefined;  // ⭐ important
};
type VerifyType = { password: string; otp: string; confirmPassword: string; };
export default function ResetPassword() {
    const { handleSubmit } = useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false);
    const [page1, setpage1] = useState<boolean>(false)
    const [page2, setpage2] = useState<boolean>(false)
    const [page3, setpage3] = useState<boolean>(false)
    const [page4, setpage4] = useState<boolean>(false)
    const [page5, setpage5] = useState<boolean>(false)
    const [page6, setpage6] = useState<boolean>(false)
    const [errors, setErrors] = useState<ErrorType>({});
    const [back, setback] = useState<boolean>(false);
    const [errors2, setErrors2] = useState<ErrorType>({});
    const [errors3, setErrors3] = useState<ErrorType>({});
    const [user, setUser] = useState<userType>({
        email: "",
    });
    const Backspace = async () => {
        setpage1(false)
        setpage2(false)
        setpage3(false)
        setpage4(false)
        setpage5(false)
        setpage6(false)
    }
    useEffect(() => {
        const fetchProfile = async () => {
            const params = new URLSearchParams(window.location.search);
            const urlToken = params.get("token");

            if (urlToken) {
                localStorage.setItem("token", urlToken);
                setAuthTokenCookie(urlToken);
                window.history.replaceState({}, document.title, "/profile/home");
            }
            const token = localStorage.getItem("token");
            if (!token) { router.push("/login"); return; }
            try {
                const res = await fetch(`http://localhost:8000/profile/settings/Update`, { headers: { Authorization: `Bearer ${token}`, }, credentials: "include", });
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    clearAuthTokenCookie();
                    router.push("/login");
                    return;
                }
                const data = await res.json();
                if (data.success) { setUser(data.user); }
            }
            catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchProfile();
    }, [router]);

    const [verify, setVerify] = useState<VerifyType>({
        password: "", confirmPassword: "", otp: ""
    });
    const [password, checkpassword] = useState<Error2Type>({
        newpassword: "", confirmpassword: "", oldpassword: "", email: ""
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
    const setdata3 = (e: ChangeEvent<HTMLInputElement>) => {
        checkpassword({ ...password, [e.target.name]: e.target.value });
        setErrors2((prev) => ({ ...prev, [e.target.name]: "", }));
    };
    const SubmitData1 = async () => {
        try {
            setErrors({});

            const email = user.email; console.log(user.email);
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
                setpage4(true)
                setpage6(true)
                setpage1(true)
            }
        } catch (error) {
            console.log("Fetch Error:", error);
        }

    };

    const SubmitData2 = async () => {
        try {
            setErrors({});
            const email = user.email;
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
                if (result.errors3 && Array.isArray(result.errors3)) {
                    result.errors3.forEach((err: any) => {
                        if (err.path) {
                            errorObj[err.path as keyof ErrorType] = err.msg;
                        }
                    });
                }
                if (!result.errors3 && result.message) {
                    errorObj.general = result.message;
                }
                setErrors3(errorObj);
                return;
            }
            if (result.success) {
                setpage4(true)
                setpage5(true)
                setpage2(true)
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

    const SubmitedPassword = async () => {
        console.log(password.confirmpassword, password.newpassword,
            password.oldpassword
        )
        setLoading(true);
        setSuccess(false);
        const email = user.email;
        console.log(user.email);
        password.email = email;
        setErrors2({});
        try {
            const res = await fetch(`http://localhost:8000/profile/reset-pasword/oldpassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(password),
                credentials: "include",
            })
            const result = await res.json();

            if (res.status === 422 && result.detail) {
                const errorObj: Error2Type = {};

                result.detail.forEach((err: any) => {
                    const field = err.loc[1];

                    if (field) {
                        errorObj[field as keyof Error2Type] = err.msg;
                    }
                });

                setErrors2(errorObj);
                return;
            }
            if (!result.success) {
                const errorObj: Error2Type = {};
                if (result.errors2 && Array.isArray(result.errors2)) {
                    result.errors2.forEach((err: any) => {
                        if (err.path) {
                            errorObj[err.path as keyof Error2Type] = err.msg;
                        }
                    });
                }
                if (!result.errors2 && result.message) {
                    errorObj.general = result.message;
                }
                setErrors2(errorObj);
                return;
            }
            if (result.success) {
                console.log("Successfully sent data");
                setSuccess(true);
                setTimeout(() => {
                    Backspace()
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }
    // const 
    const SetClick2 = async () => {
        setpage3(true)
        setpage5(true)
        setpage6(true)
    }

    useEffect(() => {
        if (!page1 && !page2 && !page3 && !page4 && !page5 && !page6) {
            setback(true);
        }
        else
            setback(false)
        setSuccess(false)
    }, [page1, page2, page3, page4, page5, page6]);

    const setinputclass = "peer  w-full  px-4 pt-6 pb-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-grey-500 focus:border-grey-500 text-sm";
    const setlabelclass =
        "absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-black-500 peer-valid:top-1 peer-valid:text-xs";

    return (
        <div className="h-screen bg-green-300  text-black flex justify-center items-center" >
            <div className="border-2 max-h-fit  rounded-2xl shadow-xl p-8 max-w-fit bg-white">

                {
                    page4 ? <div>
                    </div> :
                        page3 ? <div>
                            <div>
                                <h2 className="text-center mb-6 text-green-700 text-2xl  font-extrabold">🌿 Reset Password Using Old Password</h2>
                                <form onSubmit={handleSubmit(SubmitedPassword)} className="w-full text-black">

                                    <div className="relative w-full mt-4 ">
                                        <input type="password" onChange={setdata3} name="oldpassword" required className={setinputclass} />
                                        <label htmlFor="oldpassword" className={setlabelclass} > Old Password</label>
                                    </div>
                                    {errors2.oldpassword && (<p style={{ color: "red", fontSize: 12, }}>{errors2.oldpassword}</p>)}
                                    <div className="relative w-full mt-4 ">

                                        <input type="password" name="newpassword" onChange={setdata3} required className={setinputclass} />
                                        <label htmlFor="newpassword" className={setlabelclass}> New Password</label>
                                    </div>
                                    {errors2.newpassword && (<p style={{ color: "red", fontSize: 12, }}>{errors2.newpassword}</p>)}
                                    <div className="relative w-full mt-4 ">

                                        <input type="password" name="confirmpassword" onChange={setdata3} required className={setinputclass} />
                                        <label htmlFor="confirmpassword" className={setlabelclass} > Confirm New Password</label>
                                    </div>
                                    {errors2.confirmpassword && (<p style={{ color: "red", fontSize: 12, }}>{errors2.confirmpassword}</p>)}
                                    {errors2.general && (<p style={{ color: "red", fontSize: 12, }}>{errors2.general}</p>)}
                                    {errors2.general && (
                                        <p style={{ color: "red" }}>{errors2.general}</p>
                                    )}
                                    {/* <input type="submit" value="Submit" /> */}
                                    <div className=" flex justify-center gap-4 ">
                                        <div className="text-center w-fit my-4">

                                            <button type="submit" disabled={loading} className="bg-green-500 rounded-lg px-6 py-2">
                                                {loading ? "Loading..." : "Submit"}
                                            </button>
                                        </div>
                                        {success && <p style={{ color: "green" }}>Password updated successfully ✅</p>}
                                        <div onClick={Backspace} className=" w-fit my-4">
                                            <p className="bg-red-500 rounded-lg px-5 py-2 ">
                                                Back
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div> : <div className="text-center w-full mt-4">
                            <button onClick={SetClick2} className="bg-green-400 rounded-lg px-3 py-2 w-full">
                                Reset Password Using Old Password
                            </button>
                        </div>
                }

                {
                    page5 ? <div></div> :
                        page1 ? <div>
                            <h2 className="text-center mb-6 text-green-700 text-2xl  font-extrabold">🌿 Reset Password Using OTP</h2>
                            <form onSubmit={handleSubmit(setsubmitedpassword)} className="w-full text-black">
                                <div className="relative w-full mt-4 ">

                                    <input type="number" name="otp" onChange={setdata2} required className={setinputclass} />
                                    <label htmlFor="otp" className={setlabelclass} > Enter OTP </label>
                                </div>
                                {errors.otp && (<p style={{ color: "red", fontSize: 12, }}>{errors.otp}</p>)}
                                <div className="relative w-full mt-4 ">

                                    <input type="password" name="password" onChange={setdata2} required className={setinputclass} />
                                    <label htmlFor="confirmpassword" className={setlabelclass} > Enter New Password</label>
                                </div>
                                {errors.password && (<p style={{ color: "red", fontSize: 12, }}>{errors.password}</p>)}
                                <div className="relative w-full mt-4 ">

                                    <input type="password" name="confirmPassword" onChange={setdata2} required className={setinputclass} />
                                    <label htmlFor="confirmpassword" className={setlabelclass} > Confirm New Password</label>
                                </div>
                                {errors.confirmPassword && (<p style={{ color: "red", fontSize: 12, }}>{errors.confirmPassword}</p>)}
                                <div className=" flex justify-center gap-4 ">
                                    <div className="text-center w-fit my-4">
                                        <input type="submit" value="Submited" className="bg-green-500 rounded-lg px-6 py-2" /></div>
                                    <div onClick={Backspace} className=" w-fit my-4">
                                        <p className="bg-red-500 rounded-lg px-5 py-2 ">

                                            Back
                                        </p>
                                    </div>
                                </div>
                            </form>
                            <div>

                            </div>
                        </div> :
                            <div>
                                <div >

                                    {errors.general && (<p style={{ color: "red", fontSize: 12, }}>{errors.general}</p>)}
                                    <div className="text-center w-full mt-4">
                                        <button onClick={SubmitData1} className="bg-green-400 rounded-lg px-3 py-2 w-full">Reset Password Using OTP </button> <br />
                                    </div>
                                </div>
                            </div>
                }


                {page6 ? <div></div> :
                    page2 ?
                        <div >
                            <p className="text-center mb-2 text-green-700 text-2xl  font-extrabold">

                                Please Check Your Mail
                            </p>
                            <div className="flex justify-center items-center">
                                <div onClick={Backspace} className=" w-fit mt-4">
                                    <p className="bg-red-500 rounded-lg px-5 py-2 ">
                                        Back
                                    </p>
                                </div>
                            </div>

                        </div> :
                        <div className="bg-yellow-400-400">
                            <div >
                                {errors3.general && (<p style={{ color: "red", fontSize: 12, }}>{errors3.general}</p>)}
                                <div className="text-center w-full mt-4">

                                    <button onClick={SubmitData2} className="bg-green-400 w-full rounded-lg px-3 py-2">Reset Password Using Link</button> <br />
                                </div>
                            </div>
                        </div>
                }

                {
                    back ? <div>
                        <div className="text-center w-full mt-6">
                            <Link href="/profile/setting" className="bg-red-500 rounded-lg px-3 py-2">Back</Link>
                        </div>
                    </div> : <div>

                    </div>
                }
            </div>
        </div>
    );
}