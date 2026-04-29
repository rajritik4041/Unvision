"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar/page";
import { useAuth } from "@/app/components/AuthProvider/page";
import { Country, State, City } from "country-state-city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faMarker } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/app/components/footer/page"
// import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";

type UserType = {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    profilePic?: string;
    age?: number;
    username?: string;
    email?: string;
    country?: string;
    state?: string;
    city?: string;
    gender?: string;
    Bio?: string;
};

export default function Update() {
    const { user, loading } = useAuth() as {
        user: UserType | null;
        loading: boolean;
    };

    const [data, setData] = useState<UserType | null>(null);
    const [profileFile, setProfileFile] = useState<File | null>(null);

    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);

    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);



    useEffect(() => {
        if (!user) return;

        // ✅ Find country (name OR isoCode)
        const countryObj = Country.getAllCountries().find(
            (c) => c.name === user.country || c.isoCode === user.country
        );

        // ✅ Find state
        const stateObj = countryObj
            ? State.getStatesOfCountry(countryObj.isoCode).find(
                (s) => s.name === user.state || s.isoCode === user.state
            )
            : null;

        setData({
            ...user,
            country: countryObj?.isoCode || "",
            state: stateObj?.isoCode || "",
            city: user.city || "",
        });
    }, [user]);

    useEffect(() => {
        if (data?.country) {
            setStates(State.getStatesOfCountry(data.country));
            setCities([]);
        }
    }, [data?.country]);

    useEffect(() => {
        if (data?.country && data?.state) {
            setCities(City.getCitiesOfState(data.country, data.state));
        }
    }, [data?.state, data?.country]);

    const UpdateSetData = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setData((prev) => {
            if (!prev) return prev;

            let updated = { ...prev, [name]: value };

            // 🔥 Reset state & city when country changes
            if (name === "country") {
                updated.state = "";
                updated.city = "";
            }

            // 🔥 Reset city when state changes
            if (name === "state") {
                updated.city = "";
            }

            return updated;
        });
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileFile(e.target.files[0]);
        }
    };

    const SubmitUpdateData = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });
        }

        if (profileFile) {
            formData.append("file", profileFile);
        }

        await fetch("http://localhost:8000/profile/set", {
            method: "POST",
            body: formData,
            credentials: "include",
        });
    };

    return (
        <div className=" h-full bg-green-100">
            <Navbar />

            <div className="p-5 text-center ">

                <div className="text-center w-full flex justify-center  items-center pt-4">
                    {user && (
                        <div className="  rounded-full bg-white  flex justify-center  items-center  ">
                            <img
                                src={
                                    user?.profilePic
                                        ? `http://localhost:8000/${user.profilePic}`
                                        : "/default.png"
                                }
                                className=" object-cover rounded-full w-40 h-40 "
                                alt="profile"
                            />
                        </div>
                    )}
                </div>


                {loading ? (
                    <p>Loading...</p>
                ) : data ? (
                    <form onSubmit={SubmitUpdateData} className="space-y-3 pt-2">

                        <label className="cursor-pointer inline-block text-black font-bold mb-8 ">
                            <FontAwesomeIcon icon={faPenToSquare} className="text-xl text-blue-500" />
                            EDIT PROFILE
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden "
                            />
                        </label>

                        <div className="w-full grid md:grid-cols-2 gap-6 grid-cols-1 ">
                            <input
                                type="text"
                                name="first_name"
                                value={data.first_name || ""}
                                onChange={UpdateSetData}
                                className="p-2 mb-2 w-full  text-black rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            />

                            <input
                                type="text"
                                name="last_name"
                                value={data.last_name || ""}
                                onChange={UpdateSetData}
                                className="p-2  mb-2 w-full  text-black rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            />
                        </div>
                        <div className="w-full grid md:grid-cols-2 gap-6 grid-cols-1">
                            <input
                                type="text"
                                name="username"
                                value={data.username || ""}
                                onChange={UpdateSetData}
                                className="p-2  w-full  mb-2 text-black rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            />


                            <input
                                type="text"
                                name="Bio"
                                value={data.Bio || ""}
                                onChange={UpdateSetData}
                                className="p-2  w-full  mb-2 text-black rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                                placeholder="Enter Bio"
                            />
                        </div>
                        <div className="w-full grid md:grid-cols-2 gap-6 grid-cols-1">
                            <input
                                type="text"
                                name="date_of_birth"
                                value={data.date_of_birth || ""}
                                onChange={UpdateSetData}
                                className="p-2  w-full  mb-2 text-black rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            />

                            <input
                                type="number"
                                name="age"
                                value={data.age || ""}
                                onChange={UpdateSetData}
                                className="p-2  w-full  mb-2 text-black rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            />
                        </div>
                        <div className="w-full grid md:grid-cols-2 gap-6 grid-cols-1">
                            <select
                                name="country"
                                value={data.country || ""}
                                onChange={UpdateSetData}
                                className=" p-2  w-full  mb-2 text-black rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <option value="">Select Country</option>
                                {countries.map((c) => (
                                    <option key={c.isoCode} value={c.isoCode}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="state"
                                value={data.state || ""}
                                onChange={UpdateSetData}
                                className=" p-2  w-full  mb-2 text-black rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <option value="">Select State</option>
                                {states.map((s, index) => (
                                    <option key={index} value={s.isoCode}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full grid md:grid-cols-2 gap-6 grid-cols-1">

                            <select
                                name="city"
                                value={data.city || ""}
                                onChange={UpdateSetData}
                                className=" p-2  w-full  mb-2 text-black rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <option value="">Select City</option>
                                {cities.map((c, index) => (
                                    <option key={index} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="gender"
                                value={data.gender || ""}
                                onChange={UpdateSetData}
                                className=" p-2  w-full  mb-2 text-black rounded-lg bg-white  shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className=" p-4 m-7">

                        <label htmlFor="" className="text-black  rounded-lg px-8 bg-white py-3 mt-7 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <FontAwesomeIcon icon={faMarker} />
                            <input type="submit" value="Update" />
                        </label>
                        </div>
                    </form>
                ) : (
                    <p className="text-black b shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">No user</p>
                )}
            </div>
            <Footer />
        </div>
    );
}