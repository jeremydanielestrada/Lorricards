/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import type { UserData } from "../stores/auth";
import { authStore } from "../stores/auth";

export const AuthContext = createContext<UserData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userData, fetchUser } = authStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // Check if token exists before making API call
      const token = localStorage.getItem("token");

      if (token) {
        await fetchUser();
      }

      setIsLoading(false);
    };
    initAuth();
  }, []);

  // Only show loading for authenticated routes
  if (isLoading && localStorage.getItem("token")) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
}
