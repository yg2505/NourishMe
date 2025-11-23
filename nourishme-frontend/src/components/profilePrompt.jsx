// src/components/ProfilePrompt.jsx
import React from "react";

export default function ProfilePrompt({ startSetup, skip }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-center">
          Complete Your Profile?
        </h2>

        <p className="text-center text-gray-600">
          This helps us personalize your meal plans and nutrition recommendations.
        </p>

        <div className="space-y-3">
          <button
            onClick={startSetup}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium"
          >
            Start Setup
          </button>

          <button
            onClick={skip}
            className="w-full py-3 border rounded-xl font-medium"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
