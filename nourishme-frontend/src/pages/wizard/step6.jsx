// src/pages/profile/Step6.jsx
import React, { useState, useMemo } from "react";
import axios from "axios";

export default function Step6({ back }) {
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const token = localStorage.getItem("token");

  const dietsList = [
    "Balanced Diet",
    "High-Protein Diet",
    "Keto Diet",
    "Mediterranean Diet",
    "Vegan / Plant-Based Diet",
    "Low-Carb Diet",
    "Intermittent Fasting(IF)",
    "DASH Diet",
    "Gluten-Free",
    "Whole30"
  ];

  const [dietType, setDietType] = useState(storedProfile?.dietType || "");
  const [isSuggested, setIsSuggested] = useState(false);


  // BMI
  const bmi = useMemo(() => {
    if (!storedProfile?.weight || !storedProfile?.height) return null;
    const hMeters = storedProfile.height / 100;
    return (storedProfile.weight / (hMeters * hMeters)).toFixed(1);
  }, [storedProfile]);

  // Suggest based on BMI
  const suggestDiet = () => {
    if (!bmi) return;

    if (bmi < 18.5) setDietType("High-Protein Diet");
    else if (bmi < 24.9) setDietType("Mediterranean Diet");
    else if (bmi < 29.9) setDietType("Balanced Diet");
    else setDietType("Low-Carb Diet");
    setIsSuggested(true)
  };

  const saveProfile = async () => {
    const updatedProfile = { ...storedProfile, dietType, profileCompleted: true };

    await axios.put(
      "https://nourishme.onrender.com/api/user/profile",
      updatedProfile,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    localStorage.setItem("user", JSON.stringify(updatedProfile));
    localStorage.removeItem("setupSkipped")
    window.location.href = "/dashboard";
  };

  return (
    <div className="w-full max-w-xl space-y-6">
      <h2 className="text-xl font-semibold">Choose Your Diet Plan</h2>

      

      

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dietsList.map((diet) => (
          <div
            key={diet}
            onClick={() => {setDietType(diet) 
              setIsSuggested(false)}}
            className={`p-4 border rounded-xl cursor-pointer text-center font-medium transition ${
              dietType === diet
                ? "bg-emerald-600 text-white border-emerald-700"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {diet}
          </div>
        ))}
      </div>

      <button
          onClick={suggestDiet}
          className="w-full px-5 py-2 bg-emerald-600 text-white rounded-xl"
        >
          Suggest Diet Based on BMI
      </button>
      {isSuggested && dietType && (<div>
        {bmi && (
          <p className="font-semibold text-center">Your BMI: {bmi}</p>
      )}
        <p className="text-center font-semibold text-emerald-600">
          Suggested Diet: {dietType}
        </p>
      </div>)}

      <div className="flex justify-between pt-4">
        <button onClick={back} className="px-6 py-2 border rounded-xl">
          Back
        </button>
        <button
          onClick={saveProfile}
          disabled={!dietType}
          className="px-6 py-2 bg-emerald-600 text-white rounded-xl disabled:bg-gray-400"
        >
          Save & Finish
        </button>
      </div>
    </div>
  );
}
