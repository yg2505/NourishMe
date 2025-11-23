import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "",
    activityLevel: "",
    dietType: "",
    allergies: "",
    fitnessGoal: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "https://nourishme.onrender.com/api/users/profile",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/dashboard");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">
        Complete Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" placeholder="Age" name="age" onChange={handleChange} className="form-input" />
        <input type="number" placeholder="Weight (kg)" name="weight" onChange={handleChange} className="form-input" />
        <input type="number" placeholder="Height (cm)" name="height" onChange={handleChange} className="form-input" />

        <select name="gender" onChange={handleChange} className="form-input">
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select name="activityLevel" onChange={handleChange} className="form-input">
          <option value="">Activity Level</option>
          <option>Sedentary</option>
          <option>Light</option>
          <option>Moderate</option>
          <option>Active</option>
          <option>Athlete</option>
        </select>

        <select name="dietType" onChange={handleChange} className="form-input">
          <option value="">Diet Preference</option>
          <option>Vegetarian</option>
          <option>Non-Vegetarian</option>
          <option>Vegan</option>
          <option>Keto</option>
        </select>

        <input type="text" name="allergies" placeholder="Allergies (comma separated)" onChange={handleChange} className="form-input" />

        <select name="fitnessGoal" onChange={handleChange} className="form-input">
          <option value="">Goal</option>
          <option>Lose Weight</option>
          <option>Maintain Weight</option>
          <option>Gain Weight</option>
        </select>

        <button type="submit" className="bg-emerald-600 text-white p-3 rounded-xl w-full">
          Save & Continue
        </button>
      </form>
    </div>
  );
}
