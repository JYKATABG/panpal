import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { authStore } from "../stores/authStore";
import RecipeCatalogCard from "../components/Recipes/RecipeCatalogCard";

const API = import.meta.env.VITE_API_URL;

export const RecipesCatalog = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const { isAuthenticated } = authStore();
  const recipesPerPage = 6;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API}/api/v1/recipes`);
        setRecipes(response.data.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredData = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(debouncedSearch)
  );

  const totalPages = Math.ceil(filteredData.length / recipesPerPage);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredData.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br mt-[3em] from-pink-100 via-orange-100 to-yellow-100 px-4 py-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10"
        >
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            🍽️ Recipe Catalog
          </h1>
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/80 backdrop-blur"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentRecipes.map((recipe, i) => (
            <RecipeCatalogCard
              key={recipe._id}
              recipe={recipe}
              i={i}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>

        {!currentRecipes.length ? (
          <h1 className="text-center text-xl font-bold">
            Can't find recipes with title {searchTerm}
          </h1>
        ) : (
          <div className="flex justify-center mt-8 gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 cursor-pointer py-2 bg-orange-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-lg font-medium">
              {currentPage} / {totalPages || 1}
            </span>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 cursor-pointer py-2 bg-orange-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {!recipes.length && (
          <motion.p
            className="text-center text-gray-600 mt-20"
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading deliciousness...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
