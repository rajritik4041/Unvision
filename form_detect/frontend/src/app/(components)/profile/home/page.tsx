// // "use client";

// // import { useEffect, useRef, useState , JSX } from "react";
// // import { useRouter } from "next/navigation";

// // type UserType = {
// //   id?: string;
// //   email?: string;
// //   [key: string]: any;
// // };

// // export default function Profile(): JSX.Element {
// //   const router = useRouter();
// //   const hasFetched = useRef<boolean>(false);

// //   const [user, setUser] = useState<UserType | null>(null);
// //   const [loading, setLoading] = useState<boolean>(true);

// //   // useEffect(() => {
// //   //   if (hasFetched.current) return;
// //   //   hasFetched.current = true;

// //   //   const fetchProfile = async (): Promise<void> => {
// //   //     const token = localStorage.getItem("token");

// //   //     if (!token) {
// //   //       router.push("/login");
// //   //       return;
// //   //     }

// //   //     try {
// //   //       const res = await fetch("http://localhost:8000/profile/home", {
// //   //         method: "GET",
// //   //         headers: {
// //   //           Authorization: `Bearer ${token}`,
// //   //           "Content-Type": "application/json",
// //   //         },
// //   //       });

// //   //       console.log("Status:", res.status);

// //   //       if (res.status === 401) {
// //   //         localStorage.removeItem("token");
// //   //         router.push("/login");
// //   //         return;
// //   //       }

// //   //       if (!res.ok) {
// //   //         console.error("Server error");
// //   //         return;
// //   //       }

// //   //       const data: { success: boolean; user: UserType } = await res.json();

// //   //       if (data.success) {
// //   //         setUser(data.user);
// //   //       }

// //   //     } catch (error) {
// //   //       console.error("Fetch failed:", error);
// //   //     } finally {
// //   //       setLoading(false);
// //   //     }
// //   //   };

// //   //   fetchProfile();
// //   // }, [router]);


// //   useEffect(() => {
// //   const fetchProfile = async (): Promise<void> => {
// //     const token = localStorage.getItem("token");

// //     console.log("TOKEN:", token); // 🔥 debug

// //     if (!token) {
// //       router.push("/login");
// //       return;
// //     }

// //     try {
// //       const res = await fetch("http://localhost:8000/profile/home", {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       console.log("Status:", res.status); // 🔥 debug

// //       if (res.status === 401) {
// //         localStorage.removeItem("token");
// //         router.push("/login");
// //         return;
// //       }

// //       const data = await res.json();
// //       console.log("DATA:", data); // 🔥 debug

// //       if (data.success) {
// //         setUser(data.user);
// //       }

// //     } catch (error) {
// //       console.error("Fetch failed:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   fetchProfile();
// // }, []);


// //   const handleLogout = (): void => {
// //     localStorage.removeItem("token");
// //     router.push("/login");
// //   };

// //   return (
// //     <div className="p-4">
// //       <h1>Profile Page ✅</h1>
// //  {loading ? (
// //       <p>Loading...</p>
// //     ) : user ? (
// //       <div className="mt-4 space-y-2">

// //         <p><b>ID:</b> {user._id}</p>
// //         <p><b>Name:</b> {user.first_name} {user.last_name}</p>
// //         <p><b>Username:</b> {user.username}</p>
// //         <p><b>Email:</b> {user.email}</p>
// //         <p><b>Gender:</b> {user.gender}</p>
// //         <p><b>Date of Birth:</b> {user.date_of_birth}</p>
// //         <p><b>Age:</b> {user.age}</p>
// //         <p><b>Country:</b> {user.country}</p>
// //         <p><b>State:</b> {user.state}</p>
// //         <p><b>City:</b> {user.city}</p>
// //         <p><b>Created At:</b> {user.created_at}</p>

// //       </div>
// //     ) : (
// //       <p>No user data</p>
// //     )}
// //       <button
// //         onClick={handleLogout}
// //         className="bg-red-500 text-white p-2 mt-4"
// //       >
// //         Logout
// //       </button>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// type UserType = {
//   _id?: string;
//   first_name?: string;
//   last_name?: string;
//   username?: string;
//   email?: string;
//   gender?: string;
//   date_of_birth?: string;
//   age?: number;
//   country?: string;
//   state?: string;
//   city?: string;
//   created_at?: string;
// };

// export default function Profile() {
//   const router = useRouter();

//   const [user, setUser] = useState<UserType | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");

//       console.log("TOKEN:", token);

//       if (!token) {
//         router.push("/login");
//         return;
//       }

//       try {
//         const res = await fetch("http://127.0.0.1:8000/profile/home", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Status:", res.status);

//         if (res.status === 401) {
//           localStorage.removeItem("token");
//           router.push("/login");
//           return;
//         }

//         const data = await res.json();
//         console.log("DATA:", data);

//         // ✅ flexible handling
//         if (data.user) {
//           setUser(data.user);
//         } else {
//           setUser(data);
//         }

//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Profile Page ✅</h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : user ? (
//         <div className="mt-4 space-y-2">

//           <p><b>ID:</b> {user._id || "N/A"}</p>
//           <p><b>Name:</b> {user.first_name} {user.last_name}</p>
//           <p><b>Username:</b> {user.username}</p>
//           <p><b>Email:</b> {user.email}</p>
//           <p><b>Gender:</b> {user.gender}</p>
//           <p><b>Date of Birth:</b> {user.date_of_birth}</p>
//           <p><b>Age:</b> {user.age}</p>
//           <p><b>Country:</b> {user.country}</p>
//           <p><b>State:</b> {user.state}</p>
//           <p><b>City:</b> {user.city}</p>
//           <p><b>Created At:</b> {user.created_at}</p>

//         </div>
//       ) : (
//         <p>No user data</p>
//       )}

//       <button
//         onClick={handleLogout}
//         className="bg-red-500 text-white p-2 mt-4"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserType = {
  _id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  gender?: string;
  date_of_birth?: string;
  age?: number;
  country?: string;
  state?: string;
  city?: string;
  created_at?: string;
};

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/profile/home", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("STATUS:", res.status);

        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        const data = await res.json();
        console.log("FULL RESPONSE:", data);

        // 🔥 important handling
        const userData = data.user || data;

        setUser(userData);

      } catch (err) {
        console.error("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Profile Page ✅</h1>

      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="mt-4 space-y-2">

          <p><b>ID:</b> {user._id ?? "N/A"}</p>
          <p><b>Name:</b> {(user.first_name || "") + " " + (user.last_name || "") || "N/A"}</p>
          <p><b>Username:</b> {user.username ?? "N/A"}</p>
          <p><b>Email:</b> {user.email ?? "N/A"}</p>
          <p><b>Gender:</b> {user.gender ?? "N/A"}</p>
          <p><b>Date of Birth:</b> {user.date_of_birth ?? "N/A"}</p>
          <p><b>Age:</b> {user.age ?? "N/A"}</p>
          <p><b>Country:</b> {user.country ?? "N/A"}</p>
          <p><b>State:</b> {user.state ?? "N/A"}</p>
          <p><b>City:</b> {user.city ?? "N/A"}</p>
          <p><b>Created At:</b> {user.created_at ?? "N/A"}</p>

        </div>
      ) : (
        <p>No user data</p>
      )}

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 mt-4"
      >
        Logout
      </button>
    </div>
  );
}