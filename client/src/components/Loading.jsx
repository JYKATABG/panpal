export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/50">
            <div className="flex space-x-2">
                <span className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></span>
            </div>
        </div>
    );
}