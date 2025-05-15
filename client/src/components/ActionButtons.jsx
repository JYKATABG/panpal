import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function ActionButtons({ recipeId }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const onDelete = async () => {
    try {
      await axios.delete(`${API}/api/v1/recipes/${recipeId}`);
      toast.success("Recipe deleted successfully!");
      navigate("/recipes");
    } catch (error) {
      console.log("Failed to delete recipe: ", error);
      toast.error("An error occurred while deleting the comment.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Edit Button */}
        <Link to={`/recipes/${recipeId}/edit`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-xl shadow hover:bg-blue-200 transition"
          >
            <Pencil className="w-4 h-4" />
          </motion.button>
        </Link>

        {/* Delete Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDeleteModal(true)}
          className="flex cursor-pointer items-center gap-2 py-2 px-4 bg-red-100 text-red-700 font-medium rounded-xl shadow hover:bg-red-200 transition"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>

        {showDeleteModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center">
            <motion.div
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 60, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-10 bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this recipe? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 cursor-pointer py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={onDelete}
                  className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
