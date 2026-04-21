"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import g from "@/app/(components)/profile/g/page"
import Link from "next/link";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || "https://unvision-first.onrender.com";
  useEffect(() => {
    const fetchProfile = async () => {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");

      if (urlToken) {
        localStorage.setItem("token", urlToken);
        window.history.replaceState({}, document.title, "/profile/home");
      }
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return;   }
      try { const res = await fetch(`${api}/profile/home`, {  headers: { Authorization: `Bearer ${token}`,   }, credentials: "include",  });
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        const data = await res.json();
        if (data.success) {  setUser(data.user);  } } 
        catch (err) { console.error(err); } 
        finally { setLoading(false); }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="p-4">
      <Link href="/profile/g">
        <button className="bg-blue-500 text-white p-2 mt-4">
          View Profile
        </button>
      </Link>
         <Link href="/profile/policy">
        <button className="bg-blue-500 text-white p-2 mt-4">
          View Profile
        </button>
      </Link>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 mt-4"
      >
        Logout
      </button>
    </div>
  );
}








//  <h1 className="text-xl font-bold">Profile Page ✅</h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : user ? (
        
//         <div className="mt-4 space-y-2">

//           <p><b>Name:</b> {user.first_name || "N/A"} {user.last_name || ""}</p>
//           <p><b>Email:</b> {user.email}</p>

//           <p><b>Login Type:</b> {user.providers?.join(", ")}</p>

//           <p><b>Profile Pic:</b></p>
//           {user.profilePic && (
//             <img src={user.profilePic} width={80} />
//           )}

//           <p><b>Created:</b> {user.created_at}</p>

//         </div>
//       ) : (
//         <p>No user</p>
//       )}