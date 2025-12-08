import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-[#159957] to-[#155799] text-white p-6 flex flex-col justify-between">
        <div>
          <nav className="space-y-5">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/10 transition font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/monthly-meal-plan")}
              className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium"
            >
              Monthly Meal Plans
            </button>
            <button
              onClick={() => navigate("/recipes")}
              className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium"
            >
              Recipes
            </button>
            <button
              onClick={() => navigate("/favorites")}
              className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium"
            >
              Favorites
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium"
            >
              Profile
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Welcome Back, Yashvi 👋</h1>
            <p className="text-gray-500 mt-2 mb-5">
              Your personalized health & wellness overview for today.
            </p>
          </div>

  </div>
        {/* Hero Section */}
<div className="relative w-full rounded-3xl overflow-hidden shadow-xl">
  {/* Background Image */}
  <img
    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200"
    alt="Healthy Food"
    className="w-full h-80 object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />

  {/* Hero Content */}
  <div className="absolute inset-0 flex flex-col justify-center p-10 text-white">
    <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
      Your Wellness Journey Starts Today
    </h1>
    <p className="text-lg md:text-xl mt-3 max-w-xl text-gray-200">
      A healthier, energized, and more confident you—powered by personalized
      meal plans, smart analytics, & daily habits.
    </p>

    <button onClick={() => navigate("/monthly-meal-plan")}
    className="mt-5 w-fit px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg font-medium transition">
      Explore Your Plan
    </button>
  </div>
</div>

{/* Small Highlights Beneath Hero */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
  <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
    <img
      src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300"
      className="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <p className="text-lg font-semibold text-gray-800">Daily Meal Plans</p>
      <p className="text-gray-500 text-sm">Custom tailored for your goals.</p>
    </div>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
    <img
      src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=300"
      className="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <p className="text-lg font-semibold text-gray-800">Smart Tracking</p>
      <p className="text-gray-500 text-sm">Stay ahead with insights.</p>
    </div>
  </div>

  <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
    <img
      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=300"
      className="w-16 h-16 rounded-xl object-cover"
    />
    <div>
      <p className="text-lg font-semibold text-gray-800">Healthy Recipes</p>
      <p className="text-gray-500 text-sm">Easy, delicious, mindful.</p>
    </div>
  </div>
</div>


  

  {/* Today's Overview Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
    
    {/* Steps */}
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
      <p className="text-gray-500 text-sm font-semibold">Steps Taken</p>
      <h2 className="text-3xl font-bold mt-3 text-gray-800">7,842</h2>
      <p className="text-emerald-600 mt-1">Goal: 10,000</p>
    </div>

    {/* Calories */}
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
      <p className="text-gray-500 text-sm font-semibold">Calories Burned</p>
      <h2 className="text-3xl font-bold mt-3 text-gray-800">520 kcal</h2>
      <p className="text-yellow-600 mt-1">Slightly below target</p>
    </div>

    {/* Sleep */}
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
      <p className="text-gray-500 text-sm font-semibold">Sleep Duration</p>
      <h2 className="text-3xl font-bold mt-3 text-gray-800">6.5 hrs</h2>
      <p className="text-blue-600 mt-1">Aim for 7–8 hrs</p>
    </div>

    {/* Hydration */}
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
      <p className="text-gray-500 text-sm font-semibold">Water Intake</p>
      <h2 className="text-3xl font-bold mt-3 text-gray-800">1.8 L</h2>
      <p className="text-cyan-600 mt-1">Stay hydrated!</p>
    </div>
  </div>

  {/* Insights Section */}
  <div className="mt-12">
    <h2 className="text-2xl font-bold text-gray-800">Daily Insights</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold">Quote of the Day</h3>
        <p className="text-gray-600 mt-2 italic">
          "Healthy eating is a form of self-respect."
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold">Motivation</h3>
        <p className="text-gray-600 mt-2">
          You're <span className="font-bold text-green-600">75% on track</span> with your goals!
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold">Did You Know?</h3>
        <p className="text-gray-600 mt-2">
          Drinking water in the morning boosts metabolism by up to 24%.
        </p>
      </div>
    </div>
  </div>

  {/* Action Section */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">

    <div className="bg-gradient-to-br from-white to-gray-50 p-7 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800">Today's Meal Plan</h3>
      <p className="text-gray-600 mt-2">
        Breakfast, lunch, dinner & snacks prepared for you.
      </p>
      <button onClick={() => navigate("/monthly-meal-plan")}
      className="mt-6 bg-gradient-to-r from-[#159957] to-[#155799] text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition font-medium">
        View Meal Plan
      </button>
    </div>

    <div className="bg-gradient-to-br from-white to-gray-50 p-7 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800">Generate Custom Recipes</h3>
      <p className="text-gray-600 mt-2">
        Create personalized, healthy recipes using the ingredients you already have.
      </p>
      <button onClick={() => navigate("/recipes")}
      className="mt-6 bg-gradient-to-r from-[#159957] to-[#155799] text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition font-medium">
        Generate Recipes
      </button>
    </div>

    
  </div>

</main>

    </div>
  );
}

export default Dashboard;
