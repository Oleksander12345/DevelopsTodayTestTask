"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const router = useRouter();

  const isButtonEnabled = query || cuisine || prepTime;

  const handleNext = () => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (cuisine) params.append("cuisine", cuisine);
    if (prepTime) params.append("maxReadyTime", prepTime);
    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Recipe Finder</h1>

        <label className="block">
          <span className="text-gray-700">Recipe Name</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. pasta"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Cuisine</span>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select a cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Max Preparation Time (minutes)</span>
          <input
            type="number"
            min="1"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="e.g. 30"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </label>

        <button
          onClick={handleNext}
          disabled={!isButtonEnabled}
          className={`w-full text-white font-semibold py-2 rounded-md transition-all ${
            isButtonEnabled ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </main>
  );
}