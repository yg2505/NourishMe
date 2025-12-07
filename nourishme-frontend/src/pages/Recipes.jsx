import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, ChefHat, Loader2, Plus, Utensils, Heart } from "lucide-react";

function Recipes() {
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("newest");

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:4000/api/recipes", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecipes(response.data);
        } catch (err) {
            console.error("Failed to fetch recipes", err);
            setError("Failed to load recipes.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!ingredients.trim()) return;

        setGenerating(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:4000/api/recipes/generate",
                { ingredients },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRecipes([response.data, ...recipes]);
            setIngredients("");
        } catch (err) {
            console.error("Failed to generate recipe", err);
            setError("Failed to generate recipe. Please try again.");
        } finally {
            setGenerating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this recipe?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:4000/api/recipes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecipes(recipes.filter((r) => r.id !== id));
        } catch (err) {
            console.error("Failed to delete recipe", err);
            setError("Failed to delete recipe.");
        }
    };

    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const toggleFavorite = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const API_URL = import.meta.env.VITE_API_URL || "https://nourishme.onrender.com/api";
            const response = await axios.post(`${API_URL}/recipes/favorite/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update local state
            setRecipes(prev => prev.map(recipe =>
                recipe.id === id
                    ? { ...recipe, isFavorited: response.data.isFavorited }
                    : recipe
            ));
        } catch (err) {
            console.error("Error toggling favorite:", err);
            alert("Failed to update favorites");
        }
    };

    const filteredRecipes = recipes
        .filter(recipe => {
            const query = searchQuery.toLowerCase();
            return (
                recipe.title.toLowerCase().includes(query) ||
                recipe.ingredients.toLowerCase().includes(query)
            );
        })
        .sort((a, b) => {
            if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortOption === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortOption === "calories-high") return (b.calories || 0) - (a.calories || 0);
            if (sortOption === "calories-low") return (a.calories || 0) - (b.calories || 0);
            return 0;
        });

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
            <main className="flex-1 p-10 ml-2">
                <header className="mb-10">
                    <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
                        <ChefHat className="w-8 h-8 text-[#159957]" />
                        AI Recipe Generator
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Turn your ingredients into delicious, healthy meals tailored to your diet.
                    </p>
                </header>

                {/* Create Recipe Section */}
                <section className="bg-white p-8 rounded-2xl shadow-sm mb-10 border border-gray-100">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-[#155799]" />
                        Create New Recipe
                    </h3>
                    <form onSubmit={handleGenerate} className="space-y-4">
                        <div>
                            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                                What ingredients do you have?
                            </label>
                            <textarea
                                id="ingredients"
                                rows="3"
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#159957] focus:border-transparent outline-none transition resize-none"
                                placeholder="e.g., chicken breast, spinach, tomatoes, olive oil..."
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                disabled={generating}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={generating || !ingredients.trim()}
                                className="bg-gradient-to-r from-[#159957] to-[#155799] text-white px-6 py-3 rounded-xl font-medium shadow hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {generating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Utensils className="w-5 h-5" />
                                        Generate Recipe
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
                </section>

                {/* Previous Recipes Section */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h3 className="text-2xl font-semibold text-gray-800">Recipe History</h3>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Search Input */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search recipes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-4 pr-10 py-2 border-2 border-[#159957] rounded-xl focus:border-[#5E8C75] focus:outline-none w-full sm:w-64"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Sort Dropdown */}
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="px-4 py-2 border-2 border-[#159957] rounded-xl focus:border-[#5E8C75] focus:outline-none bg-white text-gray-700 cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="calories-high">Highest Calories</option>
                                <option value="calories-low">Lowest Calories</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 text-[#159957] animate-spin" />
                        </div>
                    ) : filteredRecipes.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500">
                                {recipes.length === 0
                                    ? "No recipes saved yet. Generate one above!"
                                    : "No recipes found matching your search."}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredRecipes.map((recipe) => (
                                <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-lg font-bold text-gray-800 line-clamp-2">{recipe.title}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full whitespace-nowrap">
                                                    {recipe.calories} kcal
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(recipe.id);
                                                    }}
                                                    className="p-1.5 rounded-full hover:bg-red-50 transition"
                                                    title={recipe.isFavorited ? "Remove from favorites" : "Add to favorites"}
                                                >
                                                    <Heart
                                                        className={`w-5 h-5 ${recipe.isFavorited ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-3 text-sm text-gray-600">
                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span>Protein</span>
                                                <span className="font-semibold">{recipe.macros?.protein}g</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span>Carbs</span>
                                                <span className="font-semibold">{recipe.macros?.carbs}g</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Fats</span>
                                                <span className="font-semibold">{recipe.macros?.fats}g</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-500 line-clamp-3 italic">
                                                {recipe.ingredients}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 flex justify-between items-center">
                                        <button
                                            className="text-[#155799] text-sm font-medium hover:underline"
                                            onClick={() => setSelectedRecipe(recipe)}
                                        >
                                            View Instructions
                                        </button>
                                        <button
                                            onClick={() => handleDelete(recipe.id)}
                                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                                            title="Delete Recipe"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* Modal */}
            {selectedRecipe && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-2xl font-bold text-gray-800">{selectedRecipe.title}</h3>
                            <button
                                onClick={() => setSelectedRecipe(null)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-[#159957] mb-2">Ingredients</h4>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedRecipe.ingredients}</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-[#155799] mb-2">Instructions</h4>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedRecipe.instructions}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Nutritional Info</h4>
                                <div className="grid grid-cols-4 gap-4 text-center">
                                    <div>
                                        <div className="text-xl font-bold text-gray-800">{selectedRecipe.calories}</div>
                                        <div className="text-xs text-gray-500">Calories</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-gray-800">{selectedRecipe.macros?.protein}g</div>
                                        <div className="text-xs text-gray-500">Protein</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-gray-800">{selectedRecipe.macros?.carbs}g</div>
                                        <div className="text-xs text-gray-500">Carbs</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-gray-800">{selectedRecipe.macros?.fats}g</div>
                                        <div className="text-xs text-gray-500">Fats</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => setSelectedRecipe(null)}
                                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recipes;
