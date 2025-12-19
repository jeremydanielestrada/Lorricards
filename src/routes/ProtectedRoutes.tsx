import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../hooks/AuthContext";
import { LoaderCircle } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useContext(AuthContext);

  // Show loading state while checking authentication
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="animate-spin size-10" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
