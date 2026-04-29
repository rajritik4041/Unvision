"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { setAuthTokenCookie } from "@/lib/auth-cookie";
import { clearAuthTokenCookie } from "@/lib/auth-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons"
// import { Feature } from "framer-motion";
type Learn = {
  icon: string;
  title: string;
  description: string;
};
type Features = {
  title: string;
  description: string;
};
type testimonials = {
  message: string;
  name: string;
  role: string;
}
export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  const details: Learn[] = [
    {
      icon: "📷",
      title: "1. Capture",
      description: "Farmer snaps a photo of the animal",
    },
    {
      icon: "🔎",
      title: "2. Classify",
      description: "Lightweight AI analyzes on cloud device",
    },
    {
      icon: "📋",
      title: "3. Report",
      description: "Receive breed info and expert tips",
    },
  ];
  const Featuresdata: Features[] = [
    {
      title: "Accurate Breed Recognition",
      description: "Identifies animal breeds using color, body shape, horns, and facial features.",
    },
    {
      title: "Breed-Specific Guidance",
      description: "Provides insights like milk production estimates, feeding recommendations, and disease risks.",
    },
    {
      title: "Lightweight & Offline-Friendly",
      description: "Optimized for low-end devices and supports offline usage with cached results.",
    },
    {
      title: "Data Storage & Reports ",
      description: " Securely stores data in the cloud for insurance and government scheme support.",
    }, {
      title: "DSelf-Improving AI ",
      description: " Continuously improves accuracy by learning from farmer-uploaded images.",
    }, {
      title: "Designed for Farmers",
      description: "Simple design with large icons and support for local languages.",
    },
  ];

  const testimonials: testimonials[] = [
    {
      message: "Is technology ne hamare dairy business ko kaafi improve kar diya hai.",
      name: "Ramesh Yadav",
      role: "Dairy Farmer"
    },
    {
      message: "Breed recognition bahut accurate hai aur disease detection bhi helpful hai.",
      name: "Suresh Kumar",
      role: "Livestock Manager"
    },
    {
      message: "Ab hume animals ki pehchan ke liye kisi expert par depend nahi rehna padta.",
      name: "Pooja Singh",
      role: "Farm Owner"
    },
    {
      message: "Milk yield estimation feature kaafi useful hai planning ke liye.",
      name: "Amit Verma",
      role: "Dairy Entrepreneur"
    },
    {
      message: "Simple interface aur fast results – gaon ke farmers ke liye perfect hai.",
      name: "Sunita Devi",
      role: "Small Scale Farmer"
    },
    {
      message: "Offline mode bhi kaam karta hai, jo rural areas ke liye bahut zaroori hai.",
      name: "Rajesh Patel",
      role: "Cattle Breeder"
    }
  ];

  return (
    <div className="bg-green-100 w-screen h-full">
      <div>
        <div className="w-full bg-green-500 min-h-96 text-center px-3 flex justify-center flex-1 flex-col ">
          <h1 className="text-white font-bold sm:text-4xl text-xl ">Welcome to Unvision</h1>
          <p className="font-normal mt-4 text-white ">AI-Powered Image-Based Animal Recognition System</p>
        </div>
      </div>
      <div className="mt-4 p-4 h-full  w-full">
        <div className="text-black text-center py-12 text-5xl font-bold">
          Learn How It Works
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 max-w-7xl mx-auto text-black">
          {details.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl hover:[&>h3]:text-green-400 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"             >
              <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 text-3xl mb-4 group-hover:scale-110 transition"> {item.icon}      </div>
              <h3 className="text-xl font-semibold text-center mb-2">              {item.title} </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">               {item.description}  </p>
            </div>
          ))}

        </div>

      </div>

      <div className="mt-4 p-4 h-full  w-full">
        <div className="text-black text-center py-12 text-5xl font-bold">
          Features & Benefits
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 max-w-7xl mx-auto text-black">
          {Featuresdata.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 hover:[&>h3]:text-green-400 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-semibold text-center mb-2">              {item.title} </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">               {item.description}  </p>
            </div>
          ))}


        </div>
      </div>
      <div>
        <div className="mt-4 p-4 h-full  w-full">
             <div className="text-black text-center py-12 text-5xl font-bold">
                Testimonials
                </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 max-w-7xl mx-auto text-black">
          {testimonials.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 hover:[&>h3]:text-green-400 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <p className="text-xl font-semibold text-center mb-2">              {item.message} </p>
              <h3 className="text-gray-600  text-sm leading-relaxed">               {item.name}  </h3>
              <p className="text-gray-600 text-sm leading-relaxed">               {item.role}  </p>
            </div>
          ))}
      </div>
      </div>
      </div>
    </div>
  );
}


