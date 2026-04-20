"use client"

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
type UserType = {
    name: string;
    subject: string;
    message: string;
    email: string;
};
export default function Contact() {
    const { handleSubmit } = useForm()
    const [user, setUser] = useState<UserType>({
        name: "",
        subject: "",
        message: "",
        email: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const SubmitedData = async () => {
        console.log(user.email, user.name, user.message, user.subject)
        const res = await fetch("/api/send-mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }
    // useEffect

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(SubmitedData)} >
                    <label htmlFor="name">Name </label>
                    <input type="text" name="name" onChange={handleChange} />
                    <label htmlFor="subject">Subject </label>
                    <input type="text" name="subject" onChange={handleChange} />
                    <label htmlFor="email">Email </label>
                    <input type="email" name="email" onChange={handleChange} />
                    <label htmlFor="message">Message </label>
                    <input type="text" name="message" onChange={handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}