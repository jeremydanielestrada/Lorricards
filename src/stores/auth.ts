/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { api } from "../utils/axios";

//types
export interface UserData {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  status?: number;
  user?: UserData;
}

export type LoginTypes = Pick<UserData, "email" | "password">;

interface AuthStore {
  userData: UserData | null;
  registerUser: (formData: UserData) => Promise<AuthResponse>;
  loginUser: (formData: LoginTypes) => Promise<AuthResponse>;
  googleAuth: (credential: string) => Promise<AuthResponse>;
  logoutUser: () => Promise<AuthResponse>;
  fetchUser: () => Promise<void>;
  setUserData: (user: UserData | null) => void;
}

//Actions and States
export const authStore = create<AuthStore>((set) => ({
  userData: null,

  registerUser: async (formData) => {
    try {
      const res = await api.post("/auth/register", formData);
      return res.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  loginUser: async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);
      set({ userData: res.data.user }); // Automatically store user on login
      return { success: true, ...res.data };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  googleAuth: async (credential: string) => {
    try {
      const res = await api.post("/auth/google", { credential }); // ✅ Send credential to backend
      set({ userData: res.data.user });
      return { success: true, ...res.data };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Google auth failed",
      };
    }
  },

  logoutUser: async () => {
    try {
      const res = await api.post("/auth/logout");
      set({ userData: null });
      return { success: true, ...res.data };
    } catch (error: any) {
      console.error("Logout failed:", error.response?.data?.message);
      throw error;
    }
  },

  fetchUser: async () => {
    try {
      const res = await api.get("/auth/session");
      set({ userData: res.data });
      console.log("User is authenticated", res.data);
    } catch (error: any) {
      console.error("Fetch user failed:", error.response?.data?.message);
      set({ userData: null });
    }
  },

  setUserData: (user) => set({ userData: user }),
}));
