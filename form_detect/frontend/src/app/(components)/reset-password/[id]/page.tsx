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
            const res = await fetch(`https://www.apnawebtech.online/api/send-reset-message`, {
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
            const res = await fetch(`https://api.apnawebtech.online/reset-password/${id}`, {
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
   const setinputclass = "peer  w-full  px-4 pt-6 pb-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-grey-500 focus:border-grey-500 text-sm";
  const setlabelclass =
    "absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-black-500 peer-valid:top-1 peer-valid:text-xs"; 

    return (
        <div className="bg-green-200 min-h-screen text-black flex justify-center items-center">
            <div className="border-2 max-h-fit  rounded-2xl shadow-xl p-8 max-w-fit bg-white">

                <h2 className="text-center mb-6 text-green-700 text-2xl  font-extrabold">🌿 Reset Password</h2>
                {/* <p>User ID: {id}</p> */}
                <form onSubmit={handleSubmit(Submited)} className="w-full text-black" >
                    <div className="relative w-full mt-4 ">
                        <input type="password" name="password" onChange={setdata} required className={setinputclass} />
                        <label htmlFor="password" className={setlabelclass} > Enter New Password : </label>
                    </div>
                    <div className="relative w-full mt-4 ">
                        <input type="password" name="ccpassword" onChange={setdata} required className={setinputclass} />
                        <label htmlFor="ccpassword" className={setlabelclass} > Comform Password : </label>
                    </div>
                    
                    {errors.password && (
                        <p style={{ color: "red" }}>
                            {errors.password}
                        </p>
                    )}
                    <div className="text-center w-full mt-4">
                        <input type="submit" value="Reset Password" className="bg-green-500 rounded-lg px-3 py-2" />
                    </div>
                </form>
            </div>
        </div>
    );
}