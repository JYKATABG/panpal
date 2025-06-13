import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const API_URL = `${API}/api/v1/auth`;
axios.defaults.withCredentials = true;

export const authStore = create(
    persist(
        (set, get) => ({
            user: null,
            hasHydrated: false,
            setHasHydrated: (value) => set({ hasHydrated: value }),
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
                    const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
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
                try {
                    await axios.post(`${API_URL}/logout`);
                } catch { }
                localStorage.removeItem("auth-storage");
                set({ user: null, isAuthenticated: false });
            },

            checkAuth: async () => {
                set({ isCheckingAuth: true, error: null });

                try {
                    const { data } = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
                    set({ user: data.user, isAuthenticated: true });
                } catch (err) {
                    // only log real errors
                    if (err.response?.status !== 401) console.error(err);
                    set({ user: null, isAuthenticated: false });
                } finally {
                    set({ isCheckingAuth: false });
                }
            },

            toggleFavorite: async (recipeId) => {
                const { user } = get();
                if (!user) return;

                const isAlreadyFav = user.favorites.includes(recipeId) || false;
                const updatedFavorites = isAlreadyFav
                    ? user.favorites.filter((id) => id !== recipeId)
                    : [...user.favorites || [], recipeId];

                set({ user: { ...user, favorites: updatedFavorites } });
            },

            isFavorite: (recipeId) => {
                const { user } = get();
                return user?.favorites?.includes(recipeId);
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        }
    )
);
