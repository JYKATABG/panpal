import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { error } from "console";

const API = import.meta.env.VITE_API_URL;
const API_URL = `${API}/api/v1/auth`;
axios.defaults.withCredentials = true;

export const authStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
            isCheckingAuth: true,

            register: async (name, email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/register`, {
                        name,
                        email,
                        password,
                    }, { withCredentials: true });
                    set({ user: response.data.user, isAuthenticated: true, isLoading: false });
                } catch (error) {
                    set({
                        error: error.response?.data?.message || "Error signing up",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/login`, { email, password }, {
                        withCredentials
                            : true
                    });
                    set({ user: response.data.user, isAuthenticated: true, isLoading: false });
                } catch (error) {
                    set({
                        error: error.response?.data?.message || "Error logging in",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                set({ error: null });
                try {
                    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
                    set({ user: null, isAuthenticated: false, isCheckingAuth: false });
                } catch (error) {
                    set({
                        error: error.response?.data?.message || "Error logging out",
                    });
                    throw error;
                }
            },

            checkAuth: async () => {
                set({ isCheckingAuth: true, error: null });
                try {
                    const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
                    set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
                } catch (error) {
                    if (error.response?.status !== 401) {
                        console.error("Unexpected auth check error:", error);
                    }
                    set({ user: null, isAuthenticated: false, isCheckingAuth: false });
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
            name: "auth-storage", // localStorage key
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
