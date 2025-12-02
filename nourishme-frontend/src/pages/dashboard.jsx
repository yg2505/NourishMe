import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
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
            <button onClick={() => navigate("/meal-plans")} 
            className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
              Meal Plans
            </button>
            <button className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
              Recipes
            </button>
            <button className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
              Goals
            </button>
            <button className="w-full text-left py-3 px-4 hover:bg-white/10 rounded-xl transition font-medium">
              Profile
            </button>
          </nav>
        </div>

        <button className="mt-10 py-2 px-4 bg-white/20 rounded-lg hover:bg-white/30 transition font-medium">
          Logout
        </button>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-10">
        {/* Greeting */}
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome back 👋
        </h2>
        <p className="text-gray-500 mt-1">
          Here's your daily wellness summary.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500">Today's Calories</p>
            <h3 className="text-3xl font-semibold mt-3">1,540 kcal</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500">Protein Intake</p>
            <h3 className="text-3xl font-semibold mt-3">78 g</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500">Water</p>
            <h3 className="text-3xl font-semibold mt-3">1.8 L</h3>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold">Today’s Meal Plan</h3>
            <p className="text-gray-500 mt-2">Breakfast, lunch, dinner & snacks assigned.</p>
            <button className="mt-5 bg-gradient-to-r from-[#159957] to-[#155799] text-white px-5 py-3 rounded-lg font-medium shadow hover:opacity-90 transition">
              View Meal Plan
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold">Profile Setup</h3>
            <p className="text-gray-500 mt-2">
              Complete your profile to get personalized plans.
            </p>
            <button className="mt-5 bg-gradient-to-r from-[#159957] to-[#155799] text-white px-5 py-3 rounded-lg font-medium shadow hover:opacity-90 transition">
              Complete Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
