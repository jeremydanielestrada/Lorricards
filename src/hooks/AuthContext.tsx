/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect } from "react";
import type { UserData } from "../stores/auth";
import { authStore } from "../stores/auth";
export const AuthContext = createContext<UserData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userData, fetchUser } = authStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
}
