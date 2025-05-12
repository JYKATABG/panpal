import axios from "axios";
import toast from "react-hot-toast";

export const fetchFavouriteRecipes = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5500/api/v1/users/${userId}/favourites`,
      { withCredentials: true }
    );

    return response.data.recipes;
  } catch (error) {
    console.error("Failed to fetch favourite recipes: ", error);
    toast.error(
      error?.response?.data?.message ||
        "Something went wrong fetching favourites!"
    );
    return [];
  }
};
