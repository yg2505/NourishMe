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

export default function CompleteProfileWizard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    try {
      await axios.put(
        "https://nourishme.onrender.com/api/users/profile",
        {
          ...form,
          dietType: form.suggestedDiet || form.dietType,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/dashboard");
    } catch (err) {
      alert("Something went wrong updating profile");
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
