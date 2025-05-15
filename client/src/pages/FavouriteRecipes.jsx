import { useEffect, useState } from "react";
import { authStore } from "../stores/authStore";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import Loading from "../components/Loading";
import { fetchFavouriteRecipes } from "../api/fetchFavouriteRecipes";

const API = import.meta.env.VITE_API_URL;

export default function FavouriteRecipes() {
  const { user, isAuthenticated, isCheckingAuth } = authStore();
  const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    if (!user || !isAuthenticated) return;

    if (user?._id === userId) {
      fetchFavouriteRecipes(userId).then((recipeId) => {
        setFavourites(recipeId);
      });

      axios.get(`${API}/api/v1/users/${userId}/favourites`);
    } else {
      toast.error("Access denied! Can't access this page");
      navigate("/");
    }
  }, [user, userId, isAuthenticated, navigate]);

  const handleFavorite = async (e, recipeId) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please log in to add/remove a recipe from favorites.");
      return;
    }

    try {
      const response = await axios.post(
        `${API}/api/v1/recipes/${recipeId}/favorites`
      );

      if (
        response.data.message.includes("removed") &&
        response.status === 200
      ) {
        setFavourites(favourites.filter((recipe) => recipe._id !== recipeId));
        toast.success(response.data.message);
      } else {
        toast.error("Failed to remove recipe. Please try again later.");
      }
    } catch (error) {
      toast.error("Error updating favorite status. Please try again later.");
    }
  };

  if (isCheckingAuth) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 flex flex-col my-10 gap-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Your Favorite Recipes ❤️
      </h1>

      {favourites.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't favorited any recipes yet.
        </p>
      ) : (
        favourites.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Recipe Image */}
              <div className="w-full md:w-1/3">
                {recipe.image ? (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>

              {/* Recipe Content */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {recipe.title || "Loading..."}
                  </h2>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {recipe.description || "No description available."}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/recipes/${recipe._id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Recipe →
                  </Link>

                  {/* Star Icon (filled or empty) */}
                  {isAuthenticated && (
                    <button
                      onClick={(e) => handleFavorite(e, recipe._id)}
                      className="cursor-pointer hover:text-yellow-500 transition-colors duration-200"
                    >
                      <Star
                        size={20}
                        className="fill-yellow-500 text-yellow-500 transition-colors duration-200"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
