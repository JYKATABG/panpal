import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { ThumbsUp, Trash2 } from "lucide-react";
import { authStore } from "../stores/authStore";

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const [recipeData, setRecipeData] = useState(null);
    const [authorData, setAuthorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);

    const { user } = authStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/api/v1/recipes/${recipeId}`);
                setRecipeData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recipe: ", error);
                setLoading(false);
                navigate("/recipes")
                toast.error("Failed to fetch recipe data!");
            }
        };
        fetchRecipe();
    }, [recipeId]);

    console.log(recipeData);
    

    const handleCreateComment = async (e) => {
        e.preventDefault();
        if (!commentText) {
            toast.error("Please enter a comment!")
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5500/api/v1/recipes/${recipeId}/comments`, {
                text: commentText
            });

            setRecipeData(prev => ({
                ...prev,
                comments: [...prev.comments || [], response.data.data]
            }))

            setCommentText("");
            toast.success("Comment created successfully!");
        } catch (error) {
            console.error("Error creating comment: ", error);
            toast.error("An error occurred while creating the comment.");
        }
    }

    const handleLike = async (commentId, ownerId) => {

        if (!user) {
            toast.error("You need to be logged in to like a comment!");
            return;
        }

        if (user._id === ownerId) {
            toast.error("You can't like your own comment!");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5500/api/v1/recipes/${recipeId}/comments/${commentId}/like`)
            setRecipeData(prevData => {
                if (!prevData) return prevData;
                return {
                    ...prevData,
                    comments: prevData.comments.map(comment =>
                        comment._id === commentId
                            ? { ...comment, likes: response.data.data.likes }
                            : comment
                    )
                };
            });
        } catch (error) {
            console.log(error);
            console.error("Error liking comment: ", error);
            toast.error("An error occurred while liking the comment.");
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`http://localhost:5500/api/v1/recipes/${recipeId}/comments/${commentId}`);

            setRecipeData(prev => ({
                ...prev,
                comments: prev.comments.filter(comment => comment._id !== commentId)
            }))

            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            console.error("Error deleting comment: ", error);
            toast.error("An error occurred while deleting the comment.");
        } finally {
            setShowDeleteModal(false);
            setSelectedCommentId(null);
        }

    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!recipeData) {
        return <div>Recipe not found!</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-100 to-indigo-100 p-6">
            {/* Recipe Card */}
            <motion.div
                initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto my-16 bg-white shadow-2xl rounded-3xl overflow-hidden"
            >
                {/* Image Section */}
                <div
                    className="w-full h-64 md:h-96 bg-cover bg-center"
                    style={{ backgroundImage: `url(${recipeData?.image})` }}
                >
                    <div className="h-full w-full bg-black/30 p-6 flex flex-col justify-end text-white">
                        <h2 className="text-3xl font-bold mb-2">{recipeData?.title}</h2>
                        <p className="text-lg">{recipeData?.description}</p>
                    </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800">Recipe Details</h3>

                    <div className="space-y-4">
                        {/* Ingredients */}
                        <div>
                            <span className="text-sm font-medium text-gray-600">Ingredients</span>
                            <ul className="list-disc pl-5 text-gray-700">
                                {recipeData?.ingredients?.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Steps */}
                        <div>
                            <span className="text-sm font-medium text-gray-600">Steps</span>
                            <ol className="list-decimal pl-5 text-gray-700">
                                {recipeData?.steps?.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ol>
                        </div>

                        {/* Time & Difficulty */}
                        <div className="flex gap-6">
                            <div>
                                <span className="text-sm font-medium text-gray-600">Cook Time</span>
                                <p className="text-gray-700">{recipeData?.cookTime} minutes</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Difficulty</span>
                                <p className="text-gray-700">{recipeData?.difficulty}</p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <span className="text-sm font-medium text-gray-600">Tags</span>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {recipeData?.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 text-xs font-medium bg-indigo-600 text-white rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Comments Section Below */}
            <div className="max-w-4xl mx-auto mt-10 space-y-6">
                {user && (
                    <form onSubmit={handleCreateComment} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                        <span className="text-sm font-medium text-gray-600">Leave a Comment</span>
                        <textarea
                            className="w-full border rounded-md p-2 text-sm resize-none"
                            rows="3"
                            placeholder="Write your comment here..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                        <button type="submit" className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                            Post Comment
                        </button>
                    </form>
                )}

                {recipeData?.comments?.map((comment, index) => (
                    <div key={index} className="flex items-start gap-4 border-t pt-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                            <img
                                src={`https://api.dicebear.com/5.x/initials/svg?seed=${comment?.user?.name || comment?.user}`}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm font-semibold text-gray-800">{comment?.user?.name || "Anonymous"}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-gray-500">{new Date(comment?.createdAt).toLocaleString()}</p>

                                    {/* Delete Button: only if current user is the owner */}
                                    {user?._id === comment?.user?._id && (
                                        <button
                                            onClick={() => {
                                                setSelectedCommentId(comment?._id);
                                                setShowDeleteModal(true);
                                            }}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            title="Delete Comment"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {showDeleteModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                                    <motion.div
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -100, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
                                        <p className="text-sm text-gray-600 mb-6">
                                            Are you sure you want to delete this comment? This action cannot be undone.
                                        </p>
                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => setShowDeleteModal(false)}
                                                className="px-4 py-2 cursor-pointer bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleDeleteComment(selectedCommentId)}
                                                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            <p className="text-sm text-gray-700">{comment?.text}</p>

                            <div className="mt-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => handleLike(comment?._id, comment?.user?._id)}
                                    className="flex cursor-pointer items-center gap-2 text-indigo-600"
                                >
                                    <ThumbsUp
                                        className={`w-5 h-5 ${user &&
                                            Array.isArray(comment?.likes) &&
                                            comment?.likes.some((id) => id?.toString() === user?._id?.toString())
                                            ? "fill-indigo-600"
                                            : "fill-none"
                                            }`}
                                    />
                                    <span>{comment?.likes?.length || 0} Likes</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>

    );
};

export default RecipeDetails;
