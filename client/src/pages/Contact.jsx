import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill in all fields!");
            return;
        }
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-indigo-100 p-6">
            <motion.div
                initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row"
            >
                {/* Image Section */}
                <div
                    className="md:w-1/2 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://img.freepik.com/free-vector/organic-flat-feedback-concept-illustrated_23-2148951368.jpg')",
                    }}
                >
                    <div className="h-full w-full bg-black/20 backdrop-blur-sm p-10 flex flex-col justify-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Let’s talk!</h2>
                        <p className="text-lg">
                            Have feedback or questions? Fill out the form and we’ll get back
                            to you.
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="md:w-1/2 p-8 md:p-12">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                        Contact Us
                    </h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            ></textarea>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-indigo-600 cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                            type="submit"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
