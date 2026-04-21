"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";

type VerifyType = { password: string; };
type ErrorType = { 
  email?: string; 
  general?: string; 
  password?: string; 
};
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
    const automail = async (): Promise<void> => {
        try {
            const res = await fetch(`http://localhost:3000/api/send-reset-message`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
                credentials: "include",
            });

            if (!res.ok) {
                console.log("Mail sending failed");
            }
        } catch (error) {
            console.log("Automail error:", error);
        }
    };
    const Submited = async (): Promise<void> => {
        try {
            console.log(verify.password);
            const res = await fetch(`https://unvision-first.onrender.com/reset-password/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, password: verify.password }),
                credentials: "include",
            });
            const data = await res.json();
            console.log(data)
            if (!res.ok) {
                console.log("Password reset failed");
                return;
            }
            if (data.success) {
                console.log(data)
                await automail();
                console.log("Password reset + mail sent");
            }
            if (!data.success) {
                setErrors({ password: data.message });
                return;
            }
        } catch (error) {
            console.log("Submit error:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Reset Password</h2>
            {/* <p>User ID: {id}</p> */}
            <form onSubmit={handleSubmit(Submited)} >
                <input type="password" name="password" onChange={setdata} placeholder="Enter new password" />
                {errors.password && (
                    <p style={{ color: "red" }}>
                        {errors.password}
                    </p>
                )}
                <input type="submit" value="Reset Password" />
            </form>
        </div>
    );
}