"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChatBot from "../../ChatBot/page";
import Contact from "../ththththt/page"
import Tomato from "../tomato/page";
// import Navbar from "../components/navbar/page"
import Update from "../setting/update/page"
import Jake from "../home/j/page"
<<<<<<< HEAD
// import Navbar from "../../../components/navbar/page"
import Support from "../components/Supports/page"
=======
import Navbar from "../../../components/navbar/page"
import { usePathname } from "next/navigation";
import { clearAuthTokenCookie, setAuthTokenCookie } from "@/lib/auth-cookie";

>>>>>>> e4cb5bb5f587d0e3849a40f958f4fc080694cc1c
export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const api = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
 const pathname = usePathname();

  useEffect(() => {
  const hasRefreshed = sessionStorage.getItem("hasRefreshed");

  if (!hasRefreshed) {
    sessionStorage.setItem("hasRefreshed", "true");
    window.location.reload();
  } else {
    sessionStorage.removeItem("hasRefreshed");
  }
}, [pathname]);
  useEffect(() => {
    const fetchProfile = async () => {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");

      if (urlToken) {
        localStorage.setItem("token", urlToken);
        setAuthTokenCookie(urlToken);
        window.history.replaceState({}, document.title, "/profile/home");
      }
      const token = localStorage.getItem("token");
      try {
        const headers: HeadersInit = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const res = await fetch(`${api}/profile/home`, { headers, credentials: "include" });
        if (res.status === 401) {
          localStorage.removeItem("token");
          clearAuthTokenCookie();
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
  }, [api, router]);

  const handleLogout = async () => {
    try {
      await fetch(`${api}/logout`, {
        method: "POST",
        credentials: "include",
      });
      // Also clear frontend-domain auth cookies used by middleware/next-auth.
      await fetch("/api/logout", { method: "POST" });
      localStorage.removeItem("token");
      clearAuthTokenCookie();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("token");
      clearAuthTokenCookie();
      window.location.href = "/login";
    }
  };
  return (
    <div className="">

      <div>
        {/* <ChatBot /> */}
        <Navbar />
        <Jake />
        <Support />
        {/* <Update /> */}
        {/* <ChatBot /> */}
        {/* <ChatBot /> */}
      </div>
      <Link href="/profile/g">
        <div className="bg-blue-500 text-white p-2 mt-4">
          View Profile
        </div>
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







