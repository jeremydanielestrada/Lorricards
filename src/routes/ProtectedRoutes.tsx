import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../hooks/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useContext(AuthContext);

  // Redirect to login if not authenticated (null means not logged in)
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
