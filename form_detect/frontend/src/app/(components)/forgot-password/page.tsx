"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
type VerifyType = { email: string; };
type ErrorType = { email?: string; general?: string; };

export default function ForgotPassword() {
    const { handleSubmit } = useForm();
    const router = useRouter();
    const [errors, setErrors] = useState<ErrorType>({});
    const [verify, setVerify] = useState<VerifyType>({
        email: "",
    });
    
    return (
        <div>
            Hello
        </div>

    );
}