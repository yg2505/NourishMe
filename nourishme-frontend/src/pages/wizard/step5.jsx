// src/pages/profile/Step4.jsx
import React, { useState } from "react";

export default function Step4({ next, back }) {
  const [goal, setGoal] = useState("");

  const handleNext = () => {
    const prev = JSON.parse(localStorage.getItem("profile")) || {};
    localStorage.setItem("profile", JSON.stringify({ ...prev, goal }));
    next();
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">What is your goal?</h2>

      {["Lose Weight", "Gain Muscle", "General Wellness", "Not Sure"].map((g) => (
        <label key={g} className="flex gap-3 items-center">
          <input type="radio" value={g} onChange={() => setGoal(g)} />
          {g}
        </label>
      ))}

      <div className="flex justify-center gap-3">
        <button onClick={back} className="w-[50%] px-6 py-2 border rounded-xl">
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!goal}
          className={`w-[50%] px-6 py-2 rounded-xl text-white
          ${!goal ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600'}`}
        >
          Next
      </button>
      </div>
    </div>
  );
}
