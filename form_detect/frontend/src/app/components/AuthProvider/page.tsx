"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthTokenCookie, setAuthTokenCookie } from "@/lib/auth-cookie";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.apnawebtech.online";

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      try {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");

        if (urlToken) {
          localStorage.setItem("token", urlToken);
          setAuthTokenCookie(urlToken);
          const cleanPath = `${window.location.pathname}${window.location.hash || ""}`;
          window.history.replaceState({}, document.title, cleanPath);
        }

        const token = localStorage.getItem("token");

        // Public pages par bina token backend profile call ki zarurat nahi hai.
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const res = await fetch(`${apiBase}/profile/home`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          cache: "no-store",
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          clearAuthTokenCookie();
          setUser(null);
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (data?.success && data?.user) {
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
  }, [apiBase, pathname]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}