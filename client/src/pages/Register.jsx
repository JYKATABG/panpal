import { motion } from "framer-motion"
import Input from "../components/Input";
import { Loader, LockIcon, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";
import toast from "react-hot-toast";

const RegisterPage = () => {

    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { register, error, isLoading } = authStore();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register(name, email, password);
            navigate("/");
            toast.success("Account created successfully!");
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
                    Create Account
                </h2>

                <form onSubmit={handleRegister}>
                    <Input
                        icon={User}
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                        {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Register"}
                    </button>
                </form>
                <Link to={"/login"} className="font-semibold text-red-600">Already have an account?</Link>
            </div>
        </motion.div>
    )
}

export default RegisterPage;