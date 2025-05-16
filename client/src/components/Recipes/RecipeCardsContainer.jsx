import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export const RecipeCardsContainer = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API}/api/v1/recipes`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="w-full mb-16">
      <h2 className="text-center my-6 font-bold text-[#343A40] text-2xl">
        LASTLY ADDED RECIPES
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="px-4"
      >
        {recipes
          .reverse()
          .slice(0, 5)
          .map((recipe) => (
            <SwiperSlide key={recipe?._id}>
              <Link to={`/recipes/${recipe?._id}`}>
                <RecipeCard recipe={recipe} />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
