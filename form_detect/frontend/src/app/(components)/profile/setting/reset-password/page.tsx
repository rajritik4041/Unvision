"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
                window.history.replaceState({}, document.title, "/profile/home");
            }
            const token = localStorage.getItem("token");
            if (!token) { router.push("/login"); return; }
            try {
                const res = await fetch(`https://unvision-first.onrender.com/profile/settings/Update`, { headers: { Authorization: `Bearer ${token}`, }, credentials: "include", });
                if (res.status === 401) {
                    localStorage.removeItem("token");
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

            const res = await fetch("https://unvision-first.onrender.com/reset-password", {
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
            const res = await fetch(`https://unvision-first.onrender.com/profile/reset-pasword/oldpassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(password),
                credentials: "include",
            })
            const result = await res.json();
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
    return (
        <div >
            {
                page4 ? <div>
                </div> :
                    page3 ? <div>
                        <div>
                            <form onSubmit={handleSubmit(SubmitedPassword)} >
                                <p>{user.email}</p>
                                <label htmlFor="oldpassword"> Old Password</label>
                                <input type="password " onChange={setdata3} name="oldpassword" />
                                <label htmlFor="newpassword"> New Password</label>
                                <input type="password" name="newpassword" onChange={setdata3} />
                                <label htmlFor="confirmpassword"> Confirm New Password</label>
                                <input type="password" name="confirmpassword" onChange={setdata3} />
                                {errors2.general && (<p style={{ color: "red", fontSize: 12, }}>{errors2.general}</p>)}
                                {/* <input type="submit" value="Submit" /> */}
                                <button type="submit" disabled={loading}>
                                    {loading ? "Loading..." : "Submit"}
                                </button>
                                {success && <p style={{ color: "green" }}>Password updated successfully ✅</p>}
                            </form>
                        </div>
                        <div>
                            <div onClick={Backspace}>
                                Back
                            </div>
                        </div>
                    </div> : <div>
                        <button onClick={SetClick2}>
                            Reset Password Using Old Password
                        </button>
                    </div>
            }




            {
                page5 ? <div></div> :
                    page1 ? <div>
                        <form onSubmit={handleSubmit(setsubmitedpassword)}>
                            <p>{user.email}</p>
                            <input type="number" name="otp" onChange={setdata2} />
                            {errors.otp && (<p style={{ color: "red", fontSize: 12, }}>{errors.otp}</p>)}
                            <input type="password" name="password" onChange={setdata2} />
                            {errors.password && (<p style={{ color: "red", fontSize: 12, }}>{errors.password}</p>)}
                            <input type="password" name="confirmPassword" onChange={setdata2} />
                            {errors.confirmPassword && (<p style={{ color: "red", fontSize: 12, }}>{errors.confirmPassword}</p>)}
                            <input type="submit" value="Submited" />
                        </form>
                        <div>
                            <div onClick={Backspace}>
                                Back
                            </div>
                        </div>
                    </div> :
                        <div>
                            <div >
                                <button onClick={SubmitData1}>Reset Password Using OTP </button> <br />
                            </div>
                        </div>
            }


            {page6 ? <div></div> :
                page2 ?
                    <div>
                        Please Check Your Mail

                        <div onClick={Backspace}>
                            Back
                        </div>

                    </div> :
                    <div className="bg-yellow-400-400">
                        <div >
                            <button onClick={SubmitData2}>Reset Password Using Link</button> <br />
                        </div>
                    </div>
            }

            {
                back ? <div>
                    <div>
                        <Link href="/profile/setting">Back</Link>
                    </div>
                </div> : <div>

                </div>
            }
        </div>
    );
}