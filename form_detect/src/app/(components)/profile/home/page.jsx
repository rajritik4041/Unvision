"use client";

import React from 'react';
import { signOut } from "next-auth/react";

function Page() {

    const handleLogout = async () => {

        await fetch("/api/logout", {
            method: "POST",
            credentials: "include"
        });

        await signOut({ redirect: false });

        // 🔥 force full reload (bypass middleware confusion)
        window.location.href = "/";
    };

    return (
        <div className="p-4">
            <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
}

export default Page;