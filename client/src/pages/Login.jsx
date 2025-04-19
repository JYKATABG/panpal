import { Loader, LockIcon, Mail } from "lucide-react";
import { useState } from "react";
import { authStore } from "../stores/authStore";

import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/Input";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login, error, isLoading } = authStore();

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            await login(email, password);
            navigate("/");
            toast.success("Logged in successfully");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full mx-auto mt-54 bg-white/70 backdrop-blur-md rounded-3xl shadow-lg"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold text-center text-[#343a40] mb-6">
                    Log in
                </h2>

                <form onSubmit={handleLogin}>
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={LockIcon}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="w-full my-4 bg-pink-500 cursor-pointer hover:bg-pink-600 text-white font-semibold py-3 rounded-full transition-shadow shadow-md hover:shadow-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Login"}
                    </button>
                </form>
                <Link to={"/register"} className="font-semibold text-red-600">Need an account?</Link>
            </div>
        </motion.div>
    )
}

export default LoginPage;