"use client"
import { useEffect, useState } from "react";
import Link  from "next/link";
import { useRouter } from "next/navigation";
import React from "react"
export default function Profile() {
  const router = useRouter();
  return (

    <div className="p-4 justify-items-center items-start grid grid-cols-4 gap-10 min-h-screen  bg-slate-700 ">

      <div className="h-20 w-10"><img src="https://cdn.iconsax.io/icons/free/rounded/business/bold/personalcard_user-profile-contact-information-id-card-temp.webp" alt="" />

        <div className="place-items-center grid grid-cols-1 gap-2 p-5 m-2 text-2xl font-semibold font-serif">
          <h2>" Dectect Early.Act Smart.Live Better "</h2> </div>
      </div>


     
      <div className="h-20 w-10"><img src="https://cdn.iconsax.io/icons/free/rounded/location/bold/global-search_find-query-explore-search-results-information-temp.webp" alt="" />
   
      
        <div className=" place-items-center grid grid-cols-1 gap-2 p-6 m-2  text-2xl font-semibold font-serif">
          <h2 >"Smarter Health Starts Here"</h2>
          <p>AI-powered tools to help you detect possible health issues early,understand 
            symptoms,and take informed steps toward better care.</p>
        </div>

        </div>
        
      

      <div className="h-20 w-10"><img src="https://cdn.iconsax.io/icons/pro/rounded/travel/linear/search_magnifying-glass-find-query-locate-discover-information-temp.webp" alt="" />

        <div className=" place-items-center grid grid-cols-1 gap-2 p-5 m-2 text-2xl font-semibold font-serif"><p>Search for health information and resources.</p></div>
      </div>

      <div className="h-20 w-10"><img src="https://cdn.iconsax.io/icons/pro/rounded/essential/linear/question-mark-circle_help-information-query-support-assistance-faq-temp.webp" alt="" />

        <div className=" place-items-center grid grid-cols-1 gap-2 p-5 m-2 text-2xl font-semibold font-serif"><p>Get help and support for your health-related questions.</p></div>
      </div>

     <div className="fixed bottom-6 left-1/2-translate-x-1/2">
      <Link href="/profile/home" className="bg-red-500 text-white px-6 py-2 rounded-lg text-3xl font-mono">exit</Link>
     </div>

    </div>

 

  );
}