"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  

  
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

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const res = await fetch("http://127.0.0.1:8000/profile/settings/Update",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

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
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}