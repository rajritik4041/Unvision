"use client"
import React from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"





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
                    {/* {user.profilePic && (
                        <img src={user.profilePic} width={80} />
                    )} */}

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
            <div className="flex justify-center w-[380\px] p-4 rounded-2xl bg-green-400">
                <div className="w-[350\px]  rounded-2xl bg-red-500 p-2 text-center">  <div>
                    {user && (
                        <div className="my-10">
                            <div className=" w-full flex justify-center  ">
                                <img
                                    style={{
                                        borderRadius: "70px"
                                    }}
                                    width={45}
                                    src={user?.profilePic || "/default.png"}
                                    className="  object-cover"
                                    alt="profile"
                                />
                            </div>
                            <p className="mt-2 ">{user.first_name || "N/A"} {user.last_name || ""}</p>
                            <p> {user.email}</p>
                        </div>


                    )}
                </div>
                <div>
                    <Link href="/"></Link>
                </div>

                </div>
            </div>

        </div>
    )
}