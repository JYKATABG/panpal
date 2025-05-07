import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { authStore } from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Utensils } from "lucide-react";

export default function ProfilePage() {
  const [recipes, setRecipes] = useState([]);

  const { user } = authStore();
  const navigate = useNavigate();

  if (!user) {
    toast.error("You don't have permission to access this page!");
    navigate("/");
    return;
  }

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5500/api/v1/users/me/recipes`
        );
        if (!isMounted) setRecipes(data.data);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-indigo-100 p-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10 space-y-10"
      >
        {/* User Info */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            <img
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.name}`}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* User Recipes */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            My Recipes ({recipes.length})
          </h2>

          {recipes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-between text-center bg-indigo-50 p-10 rounded-2xl shadow-inner"
            >
              <Utensils className="w-16 h-16 text-indigo-400 mb-4" />
              <p className="text-xl font-bold text-gray-700 mb-2">
                Dude! Where are my recipes?
              </p>
              <p className="text-sm text-gray-500">
                Looks like your recipe book is still empty. Time to cook
                something up!
              </p>
              <Link
                to={"/create-recipe"}
                className="py-2 px-5 mt-5 rounded-xl font-bold bg-white text-black"
              >
                Create Recipe
              </Link>
              ;
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {recipes.map((recipe) => (
                <Link to={`/recipes/${recipe._id}`} key={recipe._id}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
                  >
                    <motion.img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <h3 className="text-lg font-semibold text-gray-700">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {recipe.description}
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      Cook Time: {recipe.cookTime} min · Difficulty:{" "}
                      {recipe.difficulty}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
