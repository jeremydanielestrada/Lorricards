import { create } from "zustand";
import { api } from "../utils/axios";

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  error: boolean;
  message: string;
  user?: UserData;
}

type LoginTypes = Pick<UserData, "email" | "password">;

interface AuthStore {
  userData: UserData | null;
  registerUser: (formData: UserData) => Promise<AuthResponse>;
  loginUser: (formData: LoginTypes) => Promise<AuthResponse>;
  logoutUser: () => Promise<AuthResponse>;
  fetchUser: () => Promise<void>;
  setUserData: (user: UserData | null) => void;
}

export const authStore = create<AuthStore>((set) => ({
  userData: null,

  registerUser: async (formData) => {
    try {
      const res = await api.post("/auth/register", formData);
      return res.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  },

  loginUser: async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);
      set({ userData: res.data.user }); // Automatically store user on login
      return res.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      const res = await api.post("/auth/logout");
      set({ userData: null });
      return res.data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },

  fetchUser: async () => {
    try {
      const res = await api.get("/auth/session");
      set({ userData: res.data });
    } catch (error) {
      console.error("Fetch user failed:", error);
      set({ userData: null });
    }
  },

  setUserData: (user) => set({ userData: user }),
}));
