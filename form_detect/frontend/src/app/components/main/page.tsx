"use client";
import { HtmlHTMLAttributes, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

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

type images = {
  image: string,
  id: number
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
      message: "This technology has significantly improved our dairy business operations.",
      name: "Ramesh Yadav",
      role: "Dairy Farmer"
    },
    {
      message: "The breed recognition is very accurate, and the disease detection feature is extremely helpful.",
      name: "Suresh Kumar",
      role: "Livestock Manager"
    },
    {
      message: "We no longer need to rely on experts for identifying animal breeds.",
      name: "Pooja Singh",
      role: "Farm Owner"
    },
    {
      message: "The milk yield estimation feature is very useful for planning and management.",
      name: "Amit Verma",
      role: "Dairy Entrepreneur"
    },
    {
      message: "Simple interface and fast results make it perfect for rural farmers.",
      name: "Sunita Devi",
      role: "Small-Scale Farmer"
    },
    {
      message: "The offline mode works well, which is very important for rural areas.",
      name: "Rajesh Patel",
      role: "Cattle Breeder"
    }
  ];
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === 9 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const container = useRef<HTMLDivElement | null>(null);

//   useGSAP(() => {
//     const ScrollTrigger = require("gsap/ScrollTrigger").default;
//     gsap.registerPlugin(ScrollTrigger);

//     // const cards = gsap.utils.toArray(".works");

//     // cards.forEach((card: any) => {
//     gsap.fromTo(
//       ".works",
//       { scale: 0, opacity: 0 },
//       {
//         scale: 1,
//         opacity: 1,
//         duration: 0.5,
//         scrollTrigger: {
//           trigger: ".works",
//           start: "top 75%",
//           toggleActions: "play none none none",
//           scrub : 0.2
//         },
//       }
//     );
//   // });
// }, { scope: container });


return (
  <div className="bg-green-100 w-screen h-full">
    <div>
      <div
        style={{ backgroundImage: `url('/images/${index}.jpg')` }}
        className="w-full min-h-96 text-center px-3 flex justify-center flex-col bg-cover bg-center transition-all duration-500"
      >
        <h1 className="text-white font-bold sm:text-4xl text-xl">
          Welcome to Unvision
        </h1>

        <p className="mt-4 text-white">
          AI-Powered Image-Based Animal Recognition System
        </p>
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
            <h3 className="text-xl font-semibold text-center mb-2">{item.title} </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed"> {item.description}  </p>
          </div>
        ))}

      </div>


    </div>

    <div className=" mt-4 p-4 h-full  w-full">
      <div className="text-black text-center py-12 text-5xl font-bold">
        Features & Benefits
      </div>
      <div ref={container} className="grid md:grid-cols-2 grid-cols-1 gap-6 max-w-7xl mx-auto text-black">
        {/* {Featuresdata.map((item, index) => (
            <div key={index} className="works group  bg-white rounded-2xl p-6 hover:[&>h3]:text-green-400 shadow-md hover:shadow-xl ">
              <h3 className="text-xl font-semibold text-center mb-2">              {item.title} </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">               {item.description}  </p>
            </div>
          ))} */}
        <div className="works group bg-white rounded-2xl hover:[&>h3]:text-green-400 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 text-3xl mb-4 group-hover:scale-110 transition">
            🐄
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">
            Accurate Breed Recognition
          </h3>
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            Identifies animal breeds using color, body shape, horns, and facial features.
          </p>
        </div>

        <div className=" works group bg-white rounded-2xl hover:[&>h3]:text-green-400 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 text-3xl mb-4 group-hover:scale-110 transition">
            📊
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">
            Breed-Specific Guidance
          </h3>
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            Provides insights like milk production estimates, feeding recommendations, and disease risks.
          </p>
        </div>

        <div className=" works group bg-white rounded-2xl hover:[&>h3]:text-green-400 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 text-3xl mb-4 group-hover:scale-110 transition">
            ⚡
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">
            Lightweight & Offline-Friendly
          </h3>
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            Optimized for low-end devices and supports offline usage with cached results.
          </p>
        </div>

        <div className=" works group bg-white rounded-2xl hover:[&>h3]:text-green-400 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 text-3xl mb-4 group-hover:scale-110 transition">
            ☁️
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">
            Data Storage & Reports
          </h3>
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            Securely stores data in the cloud for insurance and government scheme support.
          </p>
        </div>

        <div className=" works group bg-white rounded-2xl hover:[&>h3]:text-green-400 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 text-3xl mb-4 group-hover:scale-110 transition">
            🤖
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">
            Self-Improving AI
          </h3>
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            Continuously improves accuracy by learning from farmer-uploaded images.
          </p>
        </div>

        <div className=" works group bg-white rounded-2xl hover:[&>h3]:text-green-400 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 text-3xl mb-4 group-hover:scale-110 transition">
            🌾
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">
            Designed for Farmers
          </h3>
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            Simple design with large icons and support for local languages.
          </p>
        </div>

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


