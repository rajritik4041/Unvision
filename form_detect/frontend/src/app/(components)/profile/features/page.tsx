// "use client";
// import Link from "next/link";
// import React from "react";

// export default function Profile() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-700 to-green-500">

//       {/* HEADER */}
//       <div className="text-center py-10">
//         <h1 className="text-4xl md:text-5xl font-bold text-white">
//           Features & Benefits
//         </h1>
//         <p className="text-green-300 mt-3">
//           Smart AI-powered solutions for better decisions
//         </p>
//       </div>

//       {/* CARDS */}
//       <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

//         {/* CARD 1 */}
//         <div className="bg-green-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition text-center">
//           <img
//             src="https://cdn.iconsax.io/icons/free/rounded/business/bold/personalcard_user-profile-contact-information-id-card-temp.webp"
//             className="w-16 mx-auto mb-4"
//           />
//           <h2 className="text-lg font-semibold text-white">
//             Detect Early. Act Smart. Live Better.
//           </h2>
//         </div>

//         {/* CARD 2 */}
//         <div className="bg-green-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition text-center">
//           <img
//             src="https://cdn.iconsax.io/icons/free/rounded/location/bold/global-search_find-query-explore-search-results-information-temp.webp"
//             className="w-16 mx-auto mb-4"
//           />
//           <h2 className="text-lg font-semibold text-white mb-2">
//             Smarter Health Starts Here
//           </h2>
//           <p className="text-green-200 text-sm">
//             AI-powered tools to detect health issues early, understand symptoms,
//             and take better decisions.
//           </p>
//         </div>

//         {/* CARD 3 */}
//         <div className="bg-green-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition text-center">
//           <img
//             src="https://cdn.iconsax.io/icons/pro/rounded/travel/linear/search_magnifying-glass-find-query-locate-discover-information-temp.webp"
//             className="w-16 mx-auto mb-4"
//           />
//           <p className="text-green-200 text-sm">
//             Search for health information and useful resources instantly.
//           </p>
//         </div>

//         {/* CARD 4 */}
//         <div className="bg-green-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition text-center">
//           <img
//             src="https://cdn.iconsax.io/icons/pro/rounded/essential/linear/question-mark-circle_help-information-query-support-assistance-faq-temp.webp"
//             className="w-16 mx-auto mb-4"
//           />
//           <p className="text-green-200 text-sm">
//             Get help and support for your health-related queries anytime.
//           </p>
//         </div>

//       </div>

//       {/* EXIT BUTTON */}
//       <div className="flex justify-center pb-10">
//         <Link
//           href="/profile/home"
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition hover:scale-105"
//         >
//           Exit
//         </Link>
//       </div>

//     </div>
//   );
// }

"use client";
import Link from "next/link";
import React from "react";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-700 to-green-500">
<Navbar />
      {/* HEADER */}
      <div className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Features & Benefits
        </h1>
        <p className="text-green-300 mt-3">
          AI-powered solutions for animal detection and smart livestock management
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {/* CARD 1 */}
        <div className="bg-green-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition text-center">
          <img
            src="https://cdn.iconsax.io/icons/free/rounded/business/bold/personalcard_user-profile-contact-information-id-card-temp.webp"
            className="w-16 mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold text-white">
            Identify Breeds Instantly
          </h2>
          <p className="text-green-200 text-sm mt-2">
            Detect animal breeds quickly using AI-powered image recognition.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-green-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition text-center">
          <img
            src="https://cdn.iconsax.io/icons/free/rounded/location/bold/global-search_find-query-explore-search-results-information-temp.webp"
            className="w-16 mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold text-white mb-2">
            Smart Disease Detection
          </h2>
          <p className="text-green-200 text-sm">
            Analyze animal health and detect possible diseases early for better care.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-green-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition text-center">
          <img
            src="https://cdn.iconsax.io/icons/pro/rounded/travel/linear/search_magnifying-glass-find-query-locate-discover-information-temp.webp"
            className="w-16 mx-auto mb-4"
          />
          <h2 className="text-white font-semibold mb-2">
            Detailed Insights
          </h2>
          <p className="text-green-200 text-sm">
            Get detailed reports including breed info, health status, and care recommendations.
          </p>
        </div>

        {/* CARD 4 */}
        <div className="bg-green-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition text-center">
          <img
            src="https://cdn.iconsax.io/icons/pro/rounded/essential/linear/question-mark-circle_help-information-query-support-assistance-faq-temp.webp"
            className="w-16 mx-auto mb-4"
          />
          <h2 className="text-white font-semibold mb-2">
            Easy to Use
          </h2>
          <p className="text-green-200 text-sm">
            Simple interface designed for farmers and livestock managers with fast results.
          </p>
        </div>

      </div>

      {/* EXIT BUTTON */}
      <div className="flex justify-center pb-10">
        <Link
          href="/profile/home"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition hover:scale-105"
        >
          Exit
        </Link>
      </div>
<Footer />
    </div>
  );
}