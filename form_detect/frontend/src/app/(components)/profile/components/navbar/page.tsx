
"use client"
import Link from 'next/link'
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { faAddressBook } from "@fortawesome/free-solid-svg-icons"
import { faBlog } from "@fortawesome/free-solid-svg-icons"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { faGauge } from "@fortawesome/free-solid-svg-icons"
import { faRocket, faBriefcase, faBullseye } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
{/* <FontAwesomeIcon icon={faKey} /> */ }

type NavItem = {
    id: number;
    name: string;
    link: string;
    image: IconDefinition;
};
function navbar() {
    const router = useRouter();
    const [user, setUser] = useState<any>(() => {
        if (typeof window !== "undefined") {
            const cached = localStorage.getItem("user");
            return cached ? JSON.parse(cached) : null;
        }
        return null;
    });
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [page, setpage] = useState<boolean>(false)
    const [refreshKey, setRefreshKey] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        setRefreshKey(prev => prev + 1);
    }, [pathname]);
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
                const res = await fetch(`http://localhost:8000/profile/settings/Update`, { headers: { Authorization: `Bearer ${token}`, }, credentials: "include", });
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
            const res = await fetch("http://localhost:8000/logout", {
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

    const Navbar: NavItem[] = [
        { id: 1, name: "Home", link: "/profile/home", image: faHouse },
        { id: 2, name: "About", link: "/profile/about", image: faCircleInfo },
        { id: 3, name: "Contact Us", link: "/profile/contactus", image: faAddressBook },
        { id: 4, name: "Opportunities", link: "/profile/opportunities", image: faRocket },
        { id: 5, name: "Blog", link: "/profile/blog", image: faBlog }];
    const ExtraLink: NavItem[] = [
        { id: 1, name: "Profile", link: "/profile/setting/update", image: faCircleUser },
        { id: 2, name: "Setting", link: "/profile/setting", image: faGear },
        { id: 3, name: "Analyze News", link: "/profile/analyze", image: faBusinessTime },
        { id: 4, name: "History", link: "/profile/history", image: faClockRotateLeft },
        { id: 5, name: "Dashboard", link: "/profile/dashboard", image: faGauge },
        { id: 6, name: "Reset Password", link: "/profile/setting/reset-password", image: faKey }
    ]
    return (

        <div key={refreshKey}>
            {loading ? (
                <div>
                    Loading ...
                </div>
            ) : (
                <div >
                    <div>
                        {/* Navbar start ho gaya hai  */}

                        <div className='bg-green-400  relative  p-2 h-20 w-auto text-white' >
                            <div className='flex   justify-between items-center text-sm h-full '>
                                <div> <h2 className=' p-1 '>
                                    <Link href="/profile/home">
                                        <img width={60} src="/MultiDesease.svg" alt="Multi Disease" />
                                    </Link>
                                </h2></div>
                                <div className='display-none '>
                                    <ul className='decoration-0 lg:flex hidden w-full   items-center  m-1' >
                                        {Navbar.map((item) => (<li key={item.id} className=' px-2 '>
                                            <Link href={item.link}>{item.name}</Link>
                                        </li>))}
                                    </ul>
                                </div>

                                {/* Yaha display  function ka usekarke do bhag me divide  kiye hai  */}
                                {/* first bgag */}
                                <div className="lg:flex hidden ">
                                    <button
                                        onClick={() => {
                                            setIsOpen(!isOpen);
                                            setpage(false);
                                        }}
                                        className="h-10 p-1 m-1.5 w-14 text-[15px] flex justify-center font-bold text-white rounded-[11px]"
                                    >
                                        {user && (
                                            <img
                                                src={user?.profilePic || "/default.png"}
                                                className="w-10  h-10 object-cover rounded-[70\px]"
                                                alt="profile"
                                            />
                                        )}
                                    </button>

                                    <div className='bg-green-500' >
                                        {isOpen && (
                                            <div>
                                                <div className="absolute top-20 right-0 flex flex-col justify-center w-[380\px] p-4 rounded-2xl bg-green-400">
                                                    <div className="w-[350\px]  rounded-2xl bg-red-500 p-2 text-center">  <div>
                                                        {user && (
                                                            <div className="my-10">
                                                                <div className=" w-full flex justify-center  ">
                                                                    <img src={user?.profilePic || "/default.png"}
                                                                        className=" w-16 object-cover rounded-[70\px]"
                                                                        alt="profile"
                                                                    />
                                                                </div>
                                                                <p className="mt-2 ">{user.first_name || "N/A"} {user.last_name || ""}</p>
                                                                <p> {user.email}</p>

                                                            </div>
                                                        )}
                                                    </div>

                                                    </div>
                                                    <div className="mt-2 gap-0.5">
                                                        <div className=" hover:bg-lime-500 pl-2 py-0.5 rounded-2xl cursor-pointer ">
                                                            <Link href="/profile/components/about">
                                                                <FontAwesomeIcon className="h-3 w-3" icon={faCircleUser} /> Profile
                                                            </Link>
                                                        </div>
                                                        <div className=" hover:bg-lime-500 pl-2 py-0.5 rounded-2xl cursor-pointer ">

                                                            <Link href="/profile/components/sync">
                                                                <FontAwesomeIcon className="h-3 w-3" icon={faRotate} size="xs" />
                                                                Sync is on
                                                            </Link>
                                                        </div >
                                                        <div className=" hover:bg-lime-500 pl-2 py-0.5 rounded-2xl cursor-pointer ">
                                                            <Link href="/profile/components/support">
                                                                <FontAwesomeIcon className="h-3 w-3" icon={faCircleQuestion} /> help
                                                            </Link>
                                                        </div>
                                                        <div className=' bg-amber-400 '>
                                                            {
                                                                ExtraLink.map((items) => (
                                                                    <div key={items.id}>
                                                                        <Link href={items.link} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                                                                            <FontAwesomeIcon
                                                                                className="h-4 w-4 text-gray-600" icon={items.image} />
                                                                            <span>{items.name}</span>

                                                                        </Link>
                                                                    </div>
                                                                ))
                                                            }
                                                            <div>
                                                                <div onClick={handleLogout}>  <FontAwesomeIcon className="h-3 w-3" icon={faArrowRightFromBracket} />Sign out</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className=" lg:hidden flex   ">
                                    <button onClick={() => {
                                        setIsOpen(!isOpen);
                                        setpage(false);
                                    }}
                                        className='h-10 p-1 m-1.5 w-14 text-[15px] flex justify-center font-bold text-white rounded-[11px] '>
                                        {user && (
                                            <img src={user?.profilePic || "/default.png"}
                                                className=" w-8 h-8 object-cover rounded-[70\px]"
                                                alt="profile"
                                            />
                                        )}

                                    </button>
                                    <div className='bg-green-500' >
                                        {isOpen && (
                                            <div>
                                                <div className="absolute top-20 right-0 flex flex-col justify-center w-[380\px] p-4 rounded-2xl bg-green-400">
                                                    <div className="w-[350\px]  rounded-2xl bg-red-500 p-2 text-center">  <div>
                                                        {user && (
                                                            <div className="my-10">
                                                                <div className=" w-full flex justify-center  ">
                                                                    <img
                                                                        src={user?.profilePic || "/default.png"}
                                                                        className=" w-14 object-cover rounded-[70\px]"
                                                                        alt="profile"
                                                                    />
                                                                </div>
                                                                <p className="mt-2 ">{user.first_name || "N/A"} {user.last_name || ""}</p>
                                                                <p> {user.email}</p>

                                                            </div>
                                                        )}
                                                    </div>

                                                    </div>

                                                    <div className="mt-2 gap-0.5">
                                                        <div className=" hover:bg-lime-500 pl-2 py-0.5 rounded-2xl cursor-pointer ">
                                                            <Link href="/profile/components/about">
                                                                <FontAwesomeIcon className="h-3 w-3" icon={faCircleUser} /> Profile
                                                            </Link>
                                                        </div>
                                                        <div className=" hover:bg-lime-500 pl-2 py-0.5 rounded-2xl cursor-pointer ">

                                                            <Link href="/profile/components/sync">
                                                                <FontAwesomeIcon className="h-3 w-3" icon={faRotate} size="xs" />
                                                                Sync is on
                                                            </Link>
                                                        </div >
                                                        <div className=" hover:bg-lime-500 pl-2 py-0.5 rounded-2xl cursor-pointer ">
                                                            <Link href="/profile/components/support">
                                                                <FontAwesomeIcon className="h-3 w-3" icon={faCircleQuestion} /> help
                                                            </Link>
                                                        </div>

                                                        <div>

                                                            <div className=' bg-amber-400 pl-2 '>
                                                                {
                                                                    Navbar.map((items) => (
                                                                        <div key={items.id}>
                                                                            <Link href={items.link} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                                                                                <FontAwesomeIcon
                                                                                    className="h-4 w-4 text-gray-600" icon={items.image} />
                                                                                <span>{items.name}</span>

                                                                            </Link>
                                                                        </div>
                                                                    ))
                                                                }      {
                                                                    ExtraLink.map((items) => (
                                                                        <div key={items.id}>
                                                                            <Link href={items.link} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                                                                                <FontAwesomeIcon
                                                                                    className="h-4 w-4 text-gray-600" icon={items.image} />
                                                                                <span>{items.name}</span>

                                                                            </Link>
                                                                        </div>
                                                                    ))
                                                                }
                                                                <div>
                                                                    <div onClick={handleLogout}>  <FontAwesomeIcon className="h-3 w-3" icon={faArrowRightFromBracket} />Sign out</div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div >
                </div>
            )}

        </div>
    )
}

export default navbar


// "use client";

// import { useEffect } from "react";

// export default function Translate() {
//   useEffect(() => {
//     const addScript = document.createElement("script");
//     addScript.src =
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     addScript.async = true;
//     document.body.appendChild(addScript);

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         { pageLanguage: "en" },
//         "google_translate_element"
//       );
//     };
//   }, []);

//   return <div id="google_translate_element"></div>;
// }