"use client"
import React, { useState } from 'react'
import Link from 'next/link'
// import { motion } from "motion/react"
type NavItem = {
    id: number;
    name: string;
    link: string;
};
function navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const Navbar: NavItem[] = [{ id: 1, name: "Home", link: "/" }, { id: 2, name: "About", link: "/about" }, { id: 3, name: "Contact Us", link: "/contactus" }, { id: 4, name: "Opportunities", link: "/opportunities" }, { id: 5, name: "Blog", link: "/blog" }];
    const btnname: NavItem[] = [{ id: 1, name: "Sign Up", link: "/signup" }, { id: 2, name: "Login", link: "/login" }];
    return (
        <div> <div className='bg-green-400  relative  p-2 h-20 w-auto text-white' >
            <div className='flex   justify-between items-center text-sm h-full '>
                <div> <h2 className='font-bold p-1 '> PLANT DISEASE DETECTION</h2></div>
                <div className='display-none '>
                    <ul className='decoration-0 lg:flex hidden w-full   items-center  m-1' >
                        {Navbar.map((item) => (<li key={item.id} className=' px-2 '> <Link href={item.link}>{item.name}</Link> </li>))}
                    </ul>
                </div> <div className="lg:flex hidden ">
                    {btnname.map((item) => (<button className='h-10 p-1 m-1.5  w-28 text-[15px] font-bold bg-white rounded-[11px] ' key={item.id}> <Link className='text-black h-10 w-37.5' href={item.link}>{item.name}</Link> </button>))}
                </div>
                <div className=" lg:hidden flex   ">
                    <button onClick={() => setIsOpen(!isOpen)} className='h-10 p-1 m-1.5  w-28 text-[15px] font-bold bg-black text-white rounded-[11px] '>Menu</button>
                    <div className='bg-green-500' >
                        {isOpen && (
                            <div className='absolute top-20 right-0 bg-green-300  '>
                                <ul className='decoration-0  flex flex-col items-center  ' >
                                    {Navbar.map((item) => (<li key={item.id} className= ' shadow my-1 w-full  px-6  hover:transition hover:bg-green-500  '> <Link
                                        href={item.link}>{item.name}</Link> </li>))}
                                </ul>
                                <div className="flex flex-col items-center">
                                    {btnname.map((item) => (<button className= ' shadow my-1 w-full  px-6  hover:transition hover:bg-green-500  ' key={item.id}> <Link className='text-black h-10 w-37.5' href={item.link}>{item.name}</Link> </button>))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div> </div>
        </div>
    )
}
//  <ul className='decoration-0 flex flex-col items-center  m-1' >
//                             {Navbar.map((item) => (<li key={item.id} className=' px-2 '> <Link href={item.link}>{item.name}</Link> </li>))}
//                         </ul>
//                         <div className="flex ">
//                             {btnname.map((item) => (<button className='h-10 p-1 m-1.5  w-28 text-[15px] font-bold bg-white rounded-[11px] ' key={item.id}> <Link className='text-black h-10 w-37.5' href={item.link}>{item.name}</Link> </button>))}
//                         </div>
export default navbar
