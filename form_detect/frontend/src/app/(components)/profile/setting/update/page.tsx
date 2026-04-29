"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar/page";
import { useAuth } from "@/app/components/AuthProvider/page";
import { Country, State, City } from "country-state-city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faMarker } from "@fortawesome/free-solid-svg-icons";
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
        <div>
            <Navbar />

            <div className="p-4">
                {loading ? (
                    <p>Loading...</p>
                ) : data ? (
                    <form onSubmit={SubmitUpdateData} className="space-y-3">

                        <label className="cursor-pointer inline-block">
                            <FontAwesomeIcon icon={faPenToSquare} className="text-xl text-blue-500" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>

                        <input
                            type="text"
                            name="first_name"
                            value={data.first_name || ""}
                            onChange={UpdateSetData}
                            className="border p-2 w-full text-black"
                        />

                        <input
                            type="text"
                            name="last_name"
                            value={data.last_name || ""}
                            onChange={UpdateSetData}
                            className="border p-2 w-full text-black"
                        />

                        <input
                            type="text"
                            name="username"
                            value={data.username || ""}
                            onChange={UpdateSetData}
                            className="border p-2 w-full text-black"
                        />

                        <input
                            type="text"
                            name="email"
                            value={data.email || ""}
                            onChange={UpdateSetData}
                            className="border p-2 w-full text-black"
                        />

                        <input
                            type="text"
                            name="Bio"
                            value={data.Bio || ""}
                            onChange={UpdateSetData}
                            className="border p-2 w-full text-black"
                            placeholder="Enter Bio"
                        />

                        <input
                            type="text"
                            name="date_of_birth"
                            value={data.date_of_birth || ""}
                            onChange={UpdateSetData}
                            className="border p-2 w-full text-black"
                        />

                        <input
                            type="number"
                            name="age"
                            value={data.age || ""}
                            onChange={UpdateSetData}
                            className="border p-2 w-full text-black"
                        />

                        <select
                            name="country"
                            value={data.country || ""}
                            onChange={UpdateSetData}
                            className="border p-2 w-full text-black"
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
                            className="border p-2 w-full text-black"
                        >
                            <option value="">Select State</option>
                            {states.map((s, index) => (
                                <option key={index} value={s.isoCode}>
                                    {s.name}
                                </option>
                            ))}
                        </select>

                        <select
                            name="city"
                            value={data.city || ""}
                            onChange={UpdateSetData}
                            className="border p-2 w-full text-black"
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
                            className="border p-2 w-full text-black"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <label htmlFor="">
                            <FontAwesomeIcon icon={faMarker} />
                            <input type="submit" value="Update" />
                        </label>
                    </form>
                ) : (
                    <p>No user</p>
                )}
            </div>
        </div>
    );
}