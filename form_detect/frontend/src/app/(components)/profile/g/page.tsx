"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react"
export default function Profile() {
  const router = useRouter();
  return (
    <div className=" h-screen bg-blue-400  ">
    <div className="p-4 justify-items-center items-start grid grid-cols-1 h-fit   md:grid-cols-3 lg:grid-cols-4 gap-10 bg-blue-400   ">

        <div className=" w-full ">
          <img className="hover:scale-110 transition" src="https://cdn.iconsax.io/icons/free/rounded/business/bold/personalcard_user-profile-contact-information-id-card-temp.webp" alt="" />
          <div className="place-items-center gap-2 p-5 m-2 sm:text-lg md:text-xl  font-semibold font-serif text-white  hover:scale-110 transition">
            <h2 className="text-white hover:bg-blue-500">" Dectect Early.Act Smart.Live Better "</h2>
          </div>
        </div>



        <div className="w-full h-fit  "><img className="hover:scale-110 transition " src="https://cdn.iconsax.io/icons/free/rounded/location/bold/global-search_find-query-explore-search-results-information-temp.webp" alt="" />


          <div className=" place-items-center  gap-2 p-6 m-2  font-semibold font-serif  text-white hover:scale-110 transition">
            <h2 className="text-white hover:bg-blue-500 sm:text-lg md:text-xl h-fit" >"Smarter Health Starts Here"
              <p>AI-powered tools to help you detect possible health issues early,understand
                symptoms,and take informed steps toward better care.</p></h2>
          </div>


        </div>



        <div className="w-fit "><img className="hover:scale-110 transition" src="https://cdn.iconsax.io/icons/pro/rounded/travel/linear/search_magnifying-glass-find-query-locate-discover-information-temp.webp" alt="" />

          <div className=" place-items-center  gap-2 p-5 m-2  font-semibold font-serif  text-white  hover:scale-110 transition"><p className="text-white hover:bg-blue-500 sm:text-lg md:text-xl">Search for health information and resources.</p>
          </div>


        </div>

        <div className="w-fit "><img className="hover:scale-110 transition" src="https://cdn.iconsax.io/icons/pro/rounded/essential/linear/question-mark-circle_help-information-query-support-assistance-faq-temp.webp" alt="" />

          <div className=" place-items-center  gap-2 p-5 m-2 font-semibold font-serif  text-white  hover:scale-110 transition"><p className="text-white hover:bg-blue-500  sm:text-lg md:text-xl ">Get help and support for your health-related questions.</p>
          </div>

  
      </div>

      <div className="fixed bottom-6 left-1/2-translate-x-1/2">
        <Link href="/profile/home" className="bg-red-500 text-white px-6 py-2 rounded-lg text-3xl font-mono">exit</Link>
      </div>

    </div>
    </div>



  );
}