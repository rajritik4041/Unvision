"use client"
import React from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"





export default function Update() {

    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
                const res = await fetch(`http://127.0.0.1:8000/profile/components/Update`, { headers: { Authorization: `Bearer ${token}`, }, credentials: "include", });
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


    return (
        <div>


            <h1 className="text-xl font-bold">Profile Page ✅</h1>

            {loading ? (
                <p>Loading...</p>
            ) : user ? (

                <div className="mt-4 space-y-2">

                    <p><b>Name:</b> {user.first_name || "N/A"} {user.last_name || ""}</p>
                    <p><b>Email:</b> {user.email}</p>

                    <p><b>Login Type:</b> {user.providers?.join(", ")}</p>

                    <p><b>Profile Pic:</b></p>
                    {user.profilePic && (
                        <img src={user.profilePic} width={80} />
                    )}

                    <p><b>age:</b> {user.age}</p>
                    <p><b>Created:</b> {user.created_at}</p>
                    <p><b>Gender:</b> {user.gender}</p>
                    <p><b>D. O. B. :</b> {user.date_of_birth}</p>
                    <p><b>Country:</b> {user.country}</p>
                    <p><b>State:</b> {user.state}</p>
                    <p><b>City:</b> {user.city}</p>

                </div>
            ) : (
                <p>No user</p>
            )}

        </div>
    )
}