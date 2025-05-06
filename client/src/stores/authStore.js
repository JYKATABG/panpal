import { create } from "zustand"
import axios from "axios"

const API_URL = "http://localhost:5500/api/v1/auth";

axios.defaults.withCredentials = true;

export const authStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/register`, { name, email, password })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false })
            throw error;
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error logging in", isLoading: false });
            throw error;
        }
    },
    logout: async () => {
        set({ error: null });
        try {
            const response = await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, });
        } catch (error) {
            set({ error: error.response.data.message || "Error loggin out" });
            throw error;
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ user: null, error: null, isCheckingAuth: false });

        }
    },
    toggleFavorite: async (recipeId) => {
        const { user } = get();
        if (!user) return;

        const isAlreadyFav = user.favorites.includes(recipeId);
        const updatedFavorites = isAlreadyFav
            ? user.favorites.filter((id) => id !== recipeId)
            : [...user.favorites, recipeId];

        set({ user: { ...user, favorites: updatedFavorites } });
    },
    isFavorite: (recipeId) => {
        const { user } = get();
        return user?.favorites?.includes(recipeId);
    },
}),
    {
        name: 'auth-store'
    }
)