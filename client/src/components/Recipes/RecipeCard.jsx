const RecipeCard = ({ recipe }) => {    

    return (
        <div className="group relative bg-white/60 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl w-full max-w-md">
            <img
                src={recipe?.image}
                alt={recipe?.title}
                className="w-full h-54 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
                    {recipe?.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {recipe?.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                    <span>⏱ {recipe?.cookTime} mins</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(recipe?.difficulty)}`}>
                        {recipe?.difficulty}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Utility to get a color based on difficulty
const getBadgeColor = (difficulty) => {
    switch (difficulty) {
        case 'Easy':
            return 'bg-green-200 text-green-800';
        case 'Medium':
            return 'bg-yellow-200 text-yellow-800';
        case 'Hard':
            return 'bg-red-200 text-red-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
};

export default RecipeCard;
