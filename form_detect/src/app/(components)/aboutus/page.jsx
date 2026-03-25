"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="p-4 space-y-4">
     
      <div>
        This is an About Us page
      </div>

      
      <div>
        <Link href="/about" className="text-blue-600 underline">
          Go to About Us
        </Link>
      </div>

    </div>
  );
}