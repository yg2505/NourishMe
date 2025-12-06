import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Steps
import Step1 from "./wizard/step1";
import Step2 from "./wizard/step2";
import Step3 from "./wizard/step3";
import Step4 from "./wizard/step4";
import Step5 from "./wizard/step5";
import Step6 from "./wizard/step6";

import { useAuth } from "../contexts/AuthContext";

export default function CompleteProfileWizard() {
  const navigate = useNavigate();
  const { token, login } = useAuth(); // Use token from context if available, or fallback to localStorage

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    goal: "",
    dietType: "",
    allergies: [],
    suggestedDiet: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const updateForm = (data) => setForm((prev) => ({ ...prev, ...data }));

  const handleSubmit = async () => {
    console.log("Submitting profile update...", form);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://nourishme.onrender.com/api";
      console.log("Using API URL:", API_URL);

      const authToken = token || localStorage.getItem("token");
      if (!authToken) {
        console.error("No token found");
        alert("Authentication error. Please login again.");
        navigate("/login");
        return;
      }

      const response = await axios.put(
        `${API_URL}/users/profile`,
        {
          ...form,
          dietType: form.dietType,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      console.log("Profile updated successfully:", response.data);

      // Update Auth Context and LocalStorage
      if (response.data.user) {
        login(response.data.user, authToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      localStorage.removeItem("setupSkipped");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert(`Something went wrong updating profile: ${err.response?.data?.message || err.message}`);
    }
  };

  const renderStep = () => {
    const steps = {
      1: <Step1 form={form} updateForm={updateForm} next={nextStep} />,
      2: <Step2 form={form} updateForm={updateForm} next={nextStep} back={prevStep} />,
      3: <Step3 form={form} updateForm={updateForm} next={nextStep} back={prevStep} />,
      4: <Step4 form={form} updateForm={updateForm} next={nextStep} back={prevStep} />,
      5: <Step5 form={form} updateForm={updateForm} next={nextStep} back={prevStep} />,
      6: <Step6 form={form} updateForm={updateForm} back={prevStep} submit={handleSubmit} />,
    };
    return steps[step];
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full  ">
        {renderStep()}
      </div>
    </div>
  );
}
