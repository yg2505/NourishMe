// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import {
    User, Mail, Activity, Scale, Ruler, Utensils, Goal,
    Edit2, Save, X, Loader2, Calendar
} from "lucide-react";

export default function Profile() {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        weight: "",
        height: "",
        activityLevel: "",
        goal: "",
        dietType: "",
        allergies: []
    });

    const dietsList = [
        "Balanced Diet", "High-Protein Diet", "Keto Diet",
        "Mediterranean Diet", "Vegan / Plant-Based Diet",
        "Low-Carb Diet", "Intermittent Fasting(IF)", "DASH Diet",
        "Gluten-Free", "Whole30", "Diabetic", "PCOD/PCOS"
    ];

    const goalsList = ["Lose Weight", "Gain Weight", "Gain Muscle", "General Wellness"];
    const activityLevels = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Super Active"];
    const genderOptions = ["Male", "Female", "Other"];

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || "https://nourishme.onrender.com/api";
            const response = await axios.get(`${API_URL}/users/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(response.data);

            setFormData({
                name: response.data.name || "",
                age: response.data.age || "",
                gender: response.data.gender || "",
                weight: response.data.weight || "",
                height: response.data.height || "",
                activityLevel: response.data.activityLevel || "",
                goal: response.data.goal || "",
                dietType: response.data.dietType || "",
                allergies: response.data.allergies || []
            });
        } catch (err) {
            setError("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || "https://nourishme.onrender.com/api";
            const response = await axios.put(
                `${API_URL}/users/profile`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUser(response.data.user);
            setIsEditing(false);
        } catch (err) {
            setError("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const calculateBMI = (weight, height) => {
        if (!weight || !height) return "N/A";
        const hMeters = height / 100;
        return (weight / (hMeters * hMeters)).toFixed(1);
    };

    // Allergy handlers
    const [allergyInput, setAllergyInput] = useState("");

    const handleAllergyEnter = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            e.preventDefault();
            setFormData(prev => ({
                ...prev,
                allergies: [...prev.allergies, e.target.value.trim()]
            }));
            setAllergyInput("");
        }
    };

    const removeAllergy = (index) => {
        setFormData(prev => ({
            ...prev,
            allergies: prev.allergies.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-[#159957] to-[#155799] text-white p-6 flex flex-col justify-between">
                <div>

                    <nav className="space-y-5">
                        <button onClick={() => navigate("/dashboard")}
                        className="w-full text-left py-3 px-4  rounded-xl hover:bg-white/10 transition font-medium">
                            Dashboard
                        </button>
                        <button onClick={() => navigate("/monthly-meal-plan")}
                            className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
                            Monthly Meal Plans
                        </button>
                        <button
                            onClick={() => navigate("/recipes")}
                            className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
                            Recipes
                        </button>
                        <button
                            onClick={() => navigate("/favorites")}
                            className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
                            Favorites
                        </button>
                        <button
                            onClick={() => navigate("/profile")}
                            className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
                            Profile
                        </button>
                    </nav>
                </div>

            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <header className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <User className="w-8 h-8 text-[#159957]" />
                                My Profile
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Personal details, health metrics & dietary preferences
                            </p>
                        </div>

                        {!isEditing && !loading && user && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-6 py-2 bg-[#159957] text-white rounded-xl shadow-md hover:bg-[#159957]/90"
                            >
                                <Edit2 className="w-4 h-4" /> Edit Profile
                            </button>
                        )}
                    </header>

                    {/* Loading */}
                    {loading && (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 text-[#159957] animate-spin" />
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    {/* Profile Content */}
                    {!loading && user && (
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">

                            {/* Cover */}
                            <div className="h-36 bg-gradient-to-r from-[#159957]/20 to-[#155799]/20"></div>

                            <div className="px-10 pb-10">

                                {/* Avatar + Name */}
                                <div className="relative -mt-16 mb-10 flex justify-between items-end">
                                    <div className="flex items-end gap-5">
                                        <div className="w-28 h-28 bg-white rounded-full shadow-lg p-1">
                                            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-4xl font-semibold">
                                                {user?.name?.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="pb-6">
                                            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail className="w-4 h-4" /> {user.email}
                                            </div>
                                        </div>
                                    </div>

                                    {!isEditing && (
                                        <div className="text-right pb-6">
                                            <div className="text-sm text-gray-500">Member since</div>
                                            <div className="font-medium text-gray-800">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* --------------------- VIEW MODE ----------------------- */}
                                {!isEditing && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                                        {/* Physical Stats */}
                                        <section>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                                Physical Stats
                                            </h3>

                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    ["Age", user.age, Calendar],
                                                    ["Gender", user.gender, User],
                                                    ["Weight", `${user.weight} kg`, Scale],
                                                    ["Height", `${user.height} cm`, Ruler]
                                                ].map(([label, value, Icon]) => (
                                                    <div key={label} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                            <Icon className="w-4 h-4" /> {label}
                                                        </div>
                                                        <div className="font-semibold text-gray-800 text-lg mt-1">
                                                            {value || "-"}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-5 p-5 rounded-xl bg-blue-50 border border-blue-100">
                                                <div className="flex justify-between">
                                                    <span className="text-blue-700 font-medium">BMI Score</span>
                                                    <span className="text-2xl font-bold text-blue-800">
                                                        {calculateBMI(user.weight, user.height)}
                                                    </span>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Preferences */}
                                        <section>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                                Preferences & Goals
                                            </h3>

                                            <div className="space-y-5">
                                                {[
                                                    ["Primary Goal", user.goal, Goal, "green"],
                                                    ["Activity Level", user.activityLevel, Activity, "orange"],
                                                    ["Diet Type", user.dietType, Utensils, "purple"]
                                                ].map(([label, value, Icon, color]) => (
                                                    <div key={label} className="flex items-start gap-4">
                                                        <div className={`p-2 bg-${color}-100 text-${color}-600 rounded-lg`}>
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm text-gray-500">{label}</div>
                                                            <div className="font-medium text-gray-800">{value || "Not set"}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {user.allergies?.length > 0 && (
                                                <div className="mt-6">
                                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Allergies</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {user.allergies.map((allergy, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-200"
                                                            >
                                                                {allergy}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </section>
                                    </div>
                                )}

                                {/* --------------------- EDIT MODE ----------------------- */}
                                {isEditing && (
                                    <div className="space-y-6 mt-5">

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* INPUTS */}
                                            {[
                                                ["Full Name", "name", "text"],
                                                ["Age", "age", "number"],
                                                ["Weight (kg)", "weight", "number"],
                                                ["Height (cm)", "height", "number"]
                                            ].map(([label, name, type]) => (
                                                <div key={name}>
                                                    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                                                    <input
                                                        type={type}
                                                        name={name}
                                                        value={formData[name]}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-[#159957] focus:border-[#159957] outline-none"
                                                    />
                                                </div>
                                            ))}

                                            {/* SELECTS */}
                                            {[
                                                ["Gender", "gender", genderOptions],
                                                ["Activity Level", "activityLevel", activityLevels],
                                                ["Goal", "goal", goalsList],
                                                ["Diet Type", "dietType", dietsList]
                                            ].map(([label, name, options]) => (
                                                <div key={name}>
                                                    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                                                    <select
                                                        name={name}
                                                        value={formData[name]}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 border border-gray-300 bg-white rounded-xl shadow-sm focus:ring-[#159957]"
                                                    >
                                                        <option value="">Select</option>
                                                        {options.map(opt => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ))}

                                            {/* Allergies */}
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                    Allergies
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Type allergy & press Enter"
                                                    value={allergyInput}
                                                    onChange={(e) => setAllergyInput(e.target.value)}
                                                    onKeyDown={handleAllergyEnter}
                                                    className="w-full p-3 border border-gray-300 rounded-xl mb-2 focus:ring-[#159957]"
                                                />

                                                <div className="flex flex-wrap gap-2">
                                                    {formData.allergies.map((allergy, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-200 flex items-center gap-2"
                                                        >
                                                            {allergy}
                                                            <button onClick={() => removeAllergy(index)}>
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Save Buttons */}
                                        <div className="flex justify-end gap-4 pt-4">
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={handleSave}
                                                disabled={saving}
                                                className="px-6 py-2 bg-[#159957] text-white rounded-xl flex items-center gap-2 shadow hover:bg-[#159957]/90"
                                            >
                                                {saving ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="w-4 h-4" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
