import { Footer } from "./components/Footer";
import Navigation from "./components/Navigation";
import { HomePage } from "./pages/Home";

import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

import toast, { Toaster } from "react-hot-toast";
import { authStore } from "./stores/authStore";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import { RecipesCatalog } from "./pages/RecipesCatalog";
import CreateRecipe from "./pages/CreateRecipe";
import Contact from "./pages/Contact";
import RecipeDetails from "./pages/RecipeDetails";
import ProfilePage from "./pages/Profile";
import EditRecipe from "./pages/EditRecipe";
import Loading from "./components/Loading";
import FavouriteRecipes from "./pages/FavouriteRecipes";

const RedirectAuthenticatedUsers = ({ children }) => {
  const { isAuthenticated, user } = authStore();
  if (isAuthenticated && user) {
    toast.error("You don't have access to this page!");
    return <Navigate to={"/"} replace />;
  }
  return children;
};

function App() {
  const { checkAuth, isCheckingAuth, hasHydrated } = authStore();

  useEffect(() => {
    if (hasHydrated) {
      checkAuth();
    }
  }, [hasHydrated, checkAuth]);

  if (!hasHydrated || isCheckingAuth) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RedirectAuthenticatedUsers>
                <RegisterPage />
              </RedirectAuthenticatedUsers>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUsers>
                <LoginPage />
              </RedirectAuthenticatedUsers>
            }
          />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
          <Route path="/recipes" element={<RecipesCatalog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/recipes/:recipeId/edit" element={<EditRecipe />} />
          <Route
            path="/profile/:userId/favourites"
            element={<FavouriteRecipes />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
      <Footer />
    </div>
  );
}

export default App;
