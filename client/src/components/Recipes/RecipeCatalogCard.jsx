import { Flame, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

export const RecipeCatalogCard = ({ recipe, i, isAuthenticated }) => {

    const [isAddedToFavourites, setIsAddedToFavorites] = useState(false);

    const handleFavorite = async (e, recipeId, userId) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isAuthenticated) {
            alert("Please log in to add a recipe to your favorites.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5500/api/v1/recipes/${recipeId}/favorites`, {
                recipeId,
                userId
            })
            if (response.status === 200) {
                toast.success(response.data.message);
                setIsAddedToFavorites(isAddedToFavourites => !isAddedToFavourites);
            } else {
                toast.error("Failed to add recipe to favorites.");
            }

        } catch (error) {
            toast.error("Error adding recipe to favorites. Please try again later.");
        }
    }

    return (
        <motion.div
            key={recipe._id}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
        >
            <Link
                to={`/recipes/${recipe._id}`}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
                <div className="overflow-hidden h-48">
                    <img
                        src={recipe?.image}
                        alt={recipe?.title}
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-5 bg-white rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-800">{recipe?.title}</h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{recipe?.description}</p>
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Flame size={16} />
                            {recipe?.cookTime} min
                        </span>
                        {isAuthenticated && (
                            <button
                                onClick={(e) => handleFavorite(e, recipe._id, recipe?.author)}
                                className="cursor-pointer hover:text-yellow-500 transition-colors duration-200"
                            >
                                <Star
                                    size={18}
                                    className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                                    style={{ fill: isAddedToFavourites ? "#FFBF00" : "gray", color: isAddedToFavourites ? "#FFAC1C" : "gray" }}
                                />
                            </button>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default RecipeCatalogCard;