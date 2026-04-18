"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";

type VerifyType = { password: string; };
type ErrorType = { email?: string; general?: string; };

export default function ResetPasswordPage() {
    const params = useParams();
    const { handleSubmit } = useForm();
    const id = params?.id as string;
    const [errors, setErrors] = useState<ErrorType>({});
    const [show, setShow] = useState<boolean>(false);
    const [verify, setVerify] = useState<VerifyType>({
        password: "",
    });
    //   const api = process.env.NEXT_PUBLIC_API_URL || "https://unvision-first.onrender.com";

    const setdata = (e: ChangeEvent<HTMLInputElement>) => {
        setVerify({ ...verify, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: "", }));
    };

    const Submited = async () =>{
        console.log(verify.password)
        const res = await fetch(`http://127.0.0.1:8000/reset-password/${id}` , {
               method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id , password: verify.password }),
                credentials: "include",
        })
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Reset Password</h2>
            {/* <p>User ID: {id}</p> */}
            <form onSubmit={handleSubmit(Submited)} >
                <input type="password" name="password" onChange={setdata} placeholder="Enter new password" />
                <input type="submit" value="Reset Password" />
            </form>
        </div>
    );
}