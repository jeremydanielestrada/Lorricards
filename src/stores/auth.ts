/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { api } from "../utils/axios";

//types
export interface UserData {
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
  googleAuth: () => Promise<AuthResponse>;
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

  googleAuth: async () => {
    try {
      const res = await api.post("/auth/google");
      set({ userData: res.data.user });
      return { success: true, ...res.data };
    } catch (error: any) {
      console.log(error.message);
      return {
        success: false,
        message: error.response?.data?.message,
      };
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
