"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log(window.location.href);
  }, []);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");

        if (urlToken) {
          localStorage.setItem("token", urlToken);
          window.history.replaceState({}, document.title, "/profile/home");
        }

        const token = localStorage.getItem("token");

        const headers: HeadersInit = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const res = await fetch(`${apiBase}/profile/settings/Update`, {
          headers,
          credentials: "include",
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
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
      } catch (err) {
        console.error(err);
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