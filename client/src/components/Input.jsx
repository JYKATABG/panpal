const Input = ({ icon: Icon, ...props }) => {
    return (
        <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon className="text-gray-400 size-5" />
            </div>
            <input
                {...props}
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-80 border border-gray-300 rounded-xl shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 
                placeholder-gray-500 text-gray-800 transition duration-200"
            />
        </div>
    )
}

export default Input;