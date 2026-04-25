"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthTokenCookie, setAuthTokenCookie } from "@/lib/auth-cookie";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(window.location.href);
  }, []);
  useEffect(() => {
    console.log("Cookies:", document.cookie);
  }, []);
  useEffect(() => {
    const rawToken = localStorage.getItem("token") ?? "";
    const token = rawToken.trim();
    const hasToken = token !== "" && token !== "undefined" && token !== "null";
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    if (hasToken) {
      // Cookie ko refresh karte raho taaki middleware consistently token read kare.
      setAuthTokenCookie(token);
    }

    if (hasToken && isAuthPage) {
      router.replace("/profile/home");
    }
  }, [pathname, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");

        if (urlToken) {
          localStorage.setItem("token", urlToken);
          setAuthTokenCookie(urlToken);
          window.history.replaceState({}, document.title, "/profile/home");
        }

        const token = localStorage.getItem("token");

        // Public pages par bina token backend profile call ki zarurat nahi hai.
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const headers: HeadersInit = {};
        headers.Authorization = `Bearer ${token}`;
        const res = await fetch(`${apiBase}/profile/settings/Update`, {
          headers,
          credentials: "include",
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          clearAuthTokenCookie();
          setUser(null);
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [apiBase]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}