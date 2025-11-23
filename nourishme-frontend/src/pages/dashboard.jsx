import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // BMI Calculation
  const bmi = useMemo(() => {
    if (!user?.weight || !user?.height) return null;
    const hMeters = user.height / 100; // convert from cm to meters
    return (user.weight / (hMeters * hMeters)).toFixed(1);
  }, [user]);

  // Diet Suggestion Based on BMI
  const dietSuggestion = useMemo(() => {
    if (!bmi) return "";

    if (bmi < 18.5) {
      return "Your BMI suggests you are underweight. Consider a high-calorie balanced diet rich in protein, healthy fats, nuts, whole grains, and milk products. Aim for 5–6 small meals daily.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "You are in a healthy weight range 🎉. Maintain your balanced diet including fruits, vegetables, lean protein, whole grains, and plenty of water.";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "You fall in the overweight category. Try reducing refined carbs & sugar, increase fiber and protein, and engage in regular physical activity.";
    } else {
      return "You are in the obese range. A calorie-controlled diet with vegetables, lean proteins, high fiber foods, and structured activity is recommended. Consider consulting a nutritionist.";
    }
  }, [bmi]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate, token]);

  const profileIncomplete =
    !user?.profileCompleted || !user?.weight || !user?.height || !user?.dietType;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to NourishMe 🍎</h1>

      {/* Banner if profile is incomplete */}
      {profileIncomplete && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-xl mb-6 max-w-xl">
          <p className="font-semibold">
            Complete your profile to get personalized nutrition planning.
          </p>
          <button
            onClick={() => navigate("/complete-profile")}
            className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl"
          >
            Complete Profile
          </button>
        </div>
      )}

      <p className="mb-4">Your dashboard is ready.</p>

      {/* Show BMI + Diet plan only if profile is complete */}
      {!profileIncomplete && (
        <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-xl max-w-xl text-center shadow-md">
          <h2 className="text-xl font-bold mb-2">Your Health Summary</h2>
          <p className="font-semibold">BMI: <span className="text-emerald-700">{bmi}</span></p>
          <p className="mt-3 text-gray-700">{dietSuggestion}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

