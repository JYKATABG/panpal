import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { User2, LogOut } from "lucide-react"

export default function UserDropdown({ user, onLogout }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
            >
                <User2 size={24} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm text-gray-600">Signed in as</p>
                        <p className="font-medium text-gray-800 truncate">
                            {user?.name || user?.email || "User"}
                        </p>
                    </div>

                    <ul className="py-1">
                        <li>
                            <Link
                                to={`/profile`}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                <User2 size={16} />
                                Profile
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    onLogout()
                                    setOpen(false)
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}
