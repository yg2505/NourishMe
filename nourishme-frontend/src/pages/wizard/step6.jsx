// src/pages/profile/Step6.jsx
import React, { useMemo } from "react";

export default function Step6({ form, updateForm, back, submit }) {
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
    "Whole30",
    "Diabetic",
    "PCOD/PCOS"
  ];

  // BMI calculation
  const bmi = useMemo(() => {
    if (!form.weight || !form.height) return null;
    const hMeters = form.height / 100;
    return (form.weight / (hMeters * hMeters)).toFixed(1);
  }, [form.weight, form.height]);

  // Suggest based on BMI
  const suggestDiet = () => {
    if (!bmi) return;

    let suggestedDiet;
    if (bmi < 18.5) suggestedDiet = "High-Protein Diet";
    else if (bmi < 24.9) suggestedDiet = "Mediterranean Diet";
    else if (bmi < 29.9) suggestedDiet = "Balanced Diet";
    else suggestedDiet = "Low-Carb Diet";

    updateForm({ dietType: suggestedDiet, suggestedDiet });
  };

  return (
    <div className="w-full max-w-xl space-y-6">
      <h2 className="text-xl font-semibold">Choose Your Diet Plan</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dietsList.map((diet) => (
          <div
            key={diet}
            onClick={() => updateForm({ dietType: diet, suggestedDiet: "" })}
            className={`p - 4 border rounded - xl cursor - pointer text - center font - medium transition ${form.dietType === diet
              ? "bg-emerald-600 text-white border-emerald-700"
              : "bg-white hover:bg-gray-50"
              } `}
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

      {form.suggestedDiet && (
        <div>
          {bmi && (
            <p className="font-semibold text-center">Your BMI: {bmi}</p>
          )}
          <p className="text-center font-semibold text-emerald-600">
            Suggested Diet: {form.suggestedDiet}
          </p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={back} className="px-6 py-2 border rounded-xl">
          Back
        </button>
        <button
          onClick={() => {
            console.log("Save & Finish clicked in Step6");
            submit();
          }}
          disabled={!form.dietType}
          className="px-6 py-2 bg-emerald-600 text-white rounded-xl disabled:bg-gray-400"
        >
          Save & Finish
        </button>
      </div>
    </div>
  );
}
