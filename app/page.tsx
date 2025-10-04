'use client'

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [customerId, setCustomerId] = useState("");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form className="w-96 p-6 ">
        <div className="text-2xl font-bold">Customer Number</div>
        <input
          type="number"
          className="w-full border border-gray-300 p-2 rounded mt-4"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <div className="w-full flex justify-end">
          <Link href={`/customer/${customerId}`} className="text-blue-500 mt-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4" disabled={!customerId}>
              Continue
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
