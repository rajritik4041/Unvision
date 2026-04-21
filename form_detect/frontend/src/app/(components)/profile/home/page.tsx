"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChatBot from "../../ChatBot/page";
import Contact from "../ththththt/page"
import Tomato from "../tomato/page";
import Navbar from "../components/navbar/page"
import Update from "../setting/update/page"
import Jake from "../home/j/page"
// import Navbar from "../../../components/navbar/page"

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
      if (!token) { router.push("/login"); return; }
      try {
        const res = await fetch(`http://127.0.0.1:8000/profile/home`, { headers: { Authorization: `Bearer ${token}`, }, credentials: "include", });
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

  const handleLogout = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  return (
    <div className="p-4">

      <div>
        {/* <ChatBot /> */}
        <Navbar />
        <Jake />
        {/* <Update /> */}
        {/* <ChatBot /> */}
        {/* <ChatBot /> */}
      </div>
      <Link href="/profile/g">
        <div className="bg-blue-500 text-white p-2 mt-4">
          View Profile
        </div>
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







