import { Ghost, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
            <Ghost size={64} className="text-gray-400 mb-6" />

            <h1 className="text-3xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
            <p className="text-gray-600 max-w-md mb-6">
                Sorry, the page you're looking for doesn’t exist or has been moved.
            </p>

            <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
                <ArrowLeft size={16} />
                Go back home
            </Link>
        </div>
    )
}
