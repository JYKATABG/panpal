import { RecipeCardsContainer } from "../components/Recipes/RecipeCardsContainer"
import { motion } from "framer-motion"
export const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans text-gray-800">
            {/* Hero Section */}
            <section className="w-[80%] mx-auto bg-gradient-to-br rounded-b-xl from-[#f8f9fa] via-[#b2f7ef] to-[#ff6b6b]/30 py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">

                {/* Text Content */}
                <motion.div
                    className="flex-1 space-y-6 max-w-xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#343A40] leading-tight">
                        Share your taste, inspire others 🍰
                    </h1>
                    <p className="text-gray-700 text-lg">
                        Welcome to <span className="font-semibold text-red-600">Panpal</span> – the cozy corner where foodies, home chefs, and bakers come together to share their favorite recipes.
                        Create your own, comment on others, drop a like, and get inspired daily!
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <motion.a
                            href="#recipes"
                            whileHover={{ scale: 1.05 }}
                            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
                        >
                            Start Sharing Recipes
                        </motion.a>
                        <motion.a
                            href="#create"
                            whileHover={{ scale: 1.05 }}
                            className="border-2 border-pink-500 text-pink-500 px-6 py-3 rounded-full hover:bg-pink-50 transition"
                        >
                            Explore Community
                        </motion.a>
                    </div>
                </motion.div>

                {/* Image Content */}
                <motion.div
                    className="flex-1 flex justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80"
                        alt="Delicious Food"
                        className="rounded-xl shadow-lg max-h-[400px] w-full object-cover"
                    />
                </motion.div>
            </section>

            {/* Recipe Cards Section */}
            <section className="w-[80%] mx-auto mt-16">
                <RecipeCardsContainer />
            </section>
        </div>
    )
}