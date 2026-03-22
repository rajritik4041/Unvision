"use client"
import React from 'react'
import Link from 'next/link'
// import { motion } from "motion/react"

function navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const Navbar = [
        { id: 1, name: "Home", link: "/home" },
        { id: 2, name: "About", link: "/about" },
        { id: 3, name: "Contact Us", link: "/contact us" },
        { id: 4, name: "Plants", link: "/plants" },
    ]
    return (
        <div>
            <div className='bg-green-400    p-2 h-20 w-auto text-white' >
                <div className='flex   justify-between items-center text-1xl h-full '>
                    <div> <h2 className='font-bold p-1'> PLANT DISEASE DETECTION</h2></div>
                    <div className='display-none '>

                        <ul className='decoration-0 flex w-full   items-center  m-1' >

                            <li > <Link className='hover:text-[18px] px-2 ' href="/">Home</Link></li>

                            <li ><Link className='hover:text-[18px] px-2 ' href="/aboutus">About</Link></li>

                            <li ><Link className='hover:text-[18px]  px-2 ' href="/contactus">Contact us</Link></li>

                            <li ><Link className='hover:text-[18px] px-2 ' href="/opertunities">Opertunities</Link></li>

                        </ul>
                    </div>
                    <div> 
                        <button>
                           <Link className='bg-white border-2  text-black rounded-full hover: p-2 h-2  ' href="/signup">Sign Up</Link>
                        </button>
                        <button>
                            <Link className='bg-white text-black border-2 rounded-full h-2 hover: p-2 m-1 ' href="/login">login</Link>
                        </button>
                        
                    </div>
                </div> 
            </div>





        </div>
    )
}

export default navbar
