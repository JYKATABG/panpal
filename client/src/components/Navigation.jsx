import { authStore } from "../stores/authStore";
import { useState } from "react";
import { Menu, User2, X } from "lucide-react"; // Optional: you can replace these with SVGs if you want
import logo from "../assets/logo.png"; // Update with your logo path
import { Link, useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropDown";
import toast from "react-hot-toast";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = authStore();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white/70 backdrop-blur-sm shadow-lg p-2 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Panpal Logo" className="w-12 h-12" />
          <h1 className="text-3xl font-bold">Panpal</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to={"/"} className="hover:underline font-medium">
            Home
          </Link>
          <Link to="/recipes" className="hover:underline font-medium">
            Recipes
          </Link>
          {isAuthenticated && (
            <Link to={"/create-recipe"} className="hover:underline font-medium">
              Create
            </Link>
          )}

          <Link to={"/contact"} className="hover:underline font-medium">
            Contact us
          </Link>
          <span className="px-2">|</span>
          {!isAuthenticated ? (
            <>
              <Link to={"/login"} className="hover:underline font-medium">
                Login
              </Link>
              <Link
                to={"/register"}
                className="hover:bg-[#eb5858] bg-[#FF6B6B] text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
              >
                Register
              </Link>
            </>
          ) : (
            <UserDropdown user={user} onLogout={onLogout} />
          )}
        </nav>

        {/* Burger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center">
          <Link to={"/"} className="block font-medium hover:underline">
            Home
          </Link>
          <Link to={"/recipes"} className="block font-medium hover:underline">
            Recipes
          </Link>
          {!isAuthenticated && (
            <Link
              to={"/create-recipe"}
              className="block font-medium hover:underline"
            >
              Create
            </Link>
          )}
          <Link to={"/contact"} className="block font-medium hover:underline">
            Contact us
          </Link>
          <hr className="my-2" />
          {!isAuthenticated ? (
            <>
              <Link to={"/login"} className="block font-medium hover:underline">
                Login
              </Link>
              <Link
                to={"/register"}
                className="block bg-[#FF6B6B] hover:bg-[#eb5858] text-white font-semibold px-4 py-2 rounded-full shadow-md transition"
              >
                Register
              </Link>
            </>
          ) : (
            <UserDropdown user={user} onLogout={onLogout} />
          )}
        </div>
      )}
    </header>
  );
};

export default Navigation;
