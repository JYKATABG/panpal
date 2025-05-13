import { Link } from "react-router-dom";
import { RecipeCardsContainer } from "../components/Recipes/RecipeCardsContainer";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png"; // Make sure this path matches where you placed the logo image

export const HomePage = () => {
  return (
    <div
      className="flex flex-col min-h-screen font-sans mt-15 text-gray-800"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #b2f7ef, #ff6b6b)",
      }}
    >
      {/* Hero Section */}
      <section className="w-[90%] mx-auto bg-white rounded-xl py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10 shadow-lg mt-6">
        {/* Left Content */}
        <motion.div
          className="flex-1 space-y-6 max-w-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.img
            src={Logo}
            alt="Panpal Logo"
            className="h-20 w-20 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          />

          <h1 className="text-4xl md:text-5xl font-bold text-[#343A40] leading-tight">
            Share your taste, inspire others 🍰
          </h1>
          <p className="text-gray-700 text-lg">
            Welcome to{" "}
            <span className="font-semibold text-red-600">Panpal</span> – the
            cozy corner where foodies, home chefs, and bakers come together to
            share their favorite recipes. Create your own, comment on others,
            drop a like, and get inspired daily!
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to={"/recipes"} className="mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
              >
                Start Sharing Recipes
              </motion.div>
            </Link>
            <Link to={"/create-recipe"} className="mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="border-2 border-pink-500 text-pink-500 px-6 py-3 rounded-full hover:bg-pink-50 transition"
              >
                Explore Community
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80"
            alt="Delicious Food"
            className="rounded-xl shadow-lg max-h-[400px] w-full object-cover"
          />
        </motion.div>
      </section>

      {/* Recipes Section */}
      <section className="w-[90%] mx-auto mt-16 mb-20">
        <RecipeCardsContainer />
      </section>
    </div>
  );
};
