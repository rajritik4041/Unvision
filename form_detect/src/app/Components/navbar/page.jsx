"use client"
import React from 'react'
import Link from 'next/link'
// import { motion } from "motion/react"

function navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const Navbar = [
        { id: 1, name: "Home", link: "/" },
        { id: 2, name: "About", link: "/aboutus" },
        { id: 3, name: "Contact Us", link: "/contactus" },
        { id: 4, name: "Opertunities", link: "/opertunities" },
    ]
    const btnname = [
        {
            id: 1,
            name: "Sign Up",
            link: "/signup"
        },
        {
            id: 2,
            name: "Login",
            link: "/login"
        }
    ]
    return (
        <div>
            <div className='bg-green-400   p-2 h-20 w-auto text-white' >
                <div className='flex   justify-between items-center text-[20px] h-full '>
                    <div> <h2 className='font-bold p-1'> PLANT DISEASE DETECTION</h2></div>
                    <div className='display-none '>

                        <ul className='decoration-0 flex w-full   items-center  m-1' >
                            {/* Isme edit karo ye Link hai ek me use karoge 4 me atometic hoga  */}
                            {Navbar.map((item) => (
                                <li key={item.id} className=' px-2 '>
                                    <Link href={item.link}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        {/* Isme edit karo ye button hai ek me use karoge dusra atometic hoga  */}
                        {
                            btnname.map((item) => (
                                <button className='h-10 p-1 m-1.5  w-28 text-[15px] font-bold bg-white rounded-[11px] ' key={item.id}>
                                    <Link className='text-black h-10 w-[150px]' href={item.link}>{item.name}</Link>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>





        </div>
    )
}

export default navbar
