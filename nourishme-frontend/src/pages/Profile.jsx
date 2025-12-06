import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import {
    User, Mail, Activity, Scale, Ruler, Utensils, Goal, Edit2, Save, X, Loader2, Calendar
} from "lucide-react";

export default function Profile() {
    const navigate = useNavigate();
    const { token, logout } = useAuth();

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

    const goalsList = ["Lose Weight", "Gain Weight", "Gain Muscle", "General Wellness"];
    const activityLevels = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Super Active"];
    const genderOptions = ["Male", "Female", "Other"];

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
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
            console.error("Error fetching profile:", err);
            setError(err.response?.data?.message || "Failed to load profile data.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError("");
        try {
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
            const response = await axios.put(
                `${API_URL}/users/profile`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUser(response.data.user);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError(err.response?.data?.message || "Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const calculateBMI = (weight, height) => {
        if (!weight || !height) return "N/A";
        const hMeters = height / 100;
        return (weight / (hMeters * hMeters)).toFixed(1);
    };

    const [allergyInput, setAllergyInput] = useState("");

    const handleAllergyEnter = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            e.preventDefault();
            setFormData(prev => ({
                ...prev,
                allergies: [...(prev.allergies || []), e.target.value.trim()]
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
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
             <aside className="w-72 bg-gradient-to-b from-[#159957] to-[#155799] text-white p-6 flex flex-col justify-between">
                <div>
                <h1 className="text-3xl font-bold tracking-tight mb-10">NourishMe</h1>

                <nav className="space-y-5">
                    <button className="w-full text-left py-3 px-4 bg-white/10 rounded-xl hover:bg-white/20 transition font-medium">
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
            <main className="flex-1 p-10 ml-2">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <User className="w-8 h-8 text-[#159957]" />
                                My Profile
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Manage your personal information and health preferences
                            </p>
                        </div>
                        {!isEditing && !loading && user && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-6 py-2 bg-[#155799] text-white rounded-xl hover:bg-[#155799]/90 transition shadow-sm"
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit Profile
                            </button>
                        )}
                    </header>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 text-[#159957] animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
                            {error}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Profile Header / Cover */}
                            <div className="h-32 bg-gradient-to-r from-[#159957]/10 to-[#155799]/10 relative"></div>

                            <div className="px-8 pb-8">
                                {/* Avatar & Basic Info */}
                                <div className="relative -mt-12 mb-8 flex items-end justify-between">
                                    <div className="flex items-end gap-6">
                                        <div className="w-24 h-24 bg-white rounded-full p-1 shadow-md">
                                            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-3xl">
                                                {user?.name?.charAt(0) || "U"}
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                <Mail className="w-4 h-4" />
                                                {user?.email}
                                            </div>
                                        </div>
                                    </div>
                                    {!isEditing && (
                                        <div className="mb-2 text-right">
                                            <div className="text-sm text-gray-500">Member since</div>
                                            <div className="font-medium text-gray-800">
                                                {new Date(user?.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {isEditing ? (
                                    /* Edit Form */
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#159957] outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                                <input
                                                    type="number"
                                                    name="age"
                                                    value={formData.age}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#159957] outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                                <select
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#159957] outline-none bg-white"
                                                >
                                                    <option value="">Select Gender</option>
                                                    {genderOptions.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                                <input
                                                    type="number"
                                                    name="weight"
                                                    value={formData.weight}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#159957] outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                                                <input
                                                    type="number"
                                                    name="height"
                                                    value={formData.height}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#159957] outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
                                                <select
                                                    name="activityLevel"
                                                    value={formData.activityLevel}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#159957] outline-none bg-white"
                                                >
                                                    <option value="">Select Activity Level</option>
                                                    {activityLevels.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
                                                <select
                                                    name="goal"
                                                    value={formData.goal}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#159957] outline-none bg-white"
                                                >
                                                    <option value="">Select Goal</option>
                                                    {goalsList.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Diet Type</label>
                                                <select
                                                    name="dietType"
                                                    value={formData.dietType}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#159957] outline-none bg-white"
                                                >
                                                    <option value="">Select Diet Type</option>
                                                    {dietsList.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                                                <input
                                                    type="text"
                                                    placeholder="Type allergy & press Enter to add"
                                                    value={allergyInput}
                                                    onChange={(e) => setAllergyInput(e.target.value)}
                                                    onKeyDown={handleAllergyEnter}
                                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#159957] outline-none mb-2"
                                                />
                                                <div className="flex flex-wrap gap-2">
                                                    {(formData.allergies || []).map((allergy, index) => (
                                                        <span key={index} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-100 flex items-center gap-2">
                                                            {allergy}
                                                            <button
                                                                onClick={() => removeAllergy(index)}
                                                                className="hover:text-red-800"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
                                                disabled={saving}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                disabled={saving}
                                                className="px-6 py-2 bg-[#159957] text-white rounded-xl hover:bg-[#159957]/90 transition flex items-center gap-2"
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
                                ) : (
                                    /* View Details */
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Physical Stats */}
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
                                                Physical Stats
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                                        <Calendar className="w-4 h-4" /> Age
                                                    </div>
                                                    <div className="font-semibold text-gray-800 text-lg">{user?.age || "-"} years</div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                                        <User className="w-4 h-4" /> Gender
                                                    </div>
                                                    <div className="font-semibold text-gray-800 text-lg">{user?.gender || "-"}</div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                                        <Scale className="w-4 h-4" /> Weight
                                                    </div>
                                                    <div className="font-semibold text-gray-800 text-lg">{user?.weight || "-"} kg</div>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                                        <Ruler className="w-4 h-4" /> Height
                                                    </div>
                                                    <div className="font-semibold text-gray-800 text-lg">{user?.height || "-"} cm</div>
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-blue-700 font-medium">BMI Score</span>
                                                    <span className="text-2xl font-bold text-blue-800">
                                                        {calculateBMI(user?.weight, user?.height)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Preferences & Goals */}
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
                                                Preferences & Goals
                                            </h3>

                                            <div className="space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                                        <Goal className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Primary Goal</div>
                                                        <div className="font-medium text-gray-800">{user?.goal || "Not set"}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                                        <Activity className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Activity Level</div>
                                                        <div className="font-medium text-gray-800">{user?.activityLevel || "Not set"}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                                        <Utensils className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Dietary Preference</div>
                                                        <div className="font-medium text-gray-800">{user?.dietType || "Not set"}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {user?.allergies && user.allergies.length > 0 && (
                                                <div className="mt-6">
                                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Allergies</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {Array.isArray(user.allergies) ? user.allergies.map(allergy => (
                                                            <span key={allergy} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-100">
                                                                {allergy}
                                                            </span>
                                                        )) : (
                                                            <span className="text-gray-500 text-sm">None</span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
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
