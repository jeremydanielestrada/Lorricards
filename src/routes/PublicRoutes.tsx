import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../hooks/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
  const user = useContext(AuthContext);

  // If user is authenticated, redirect to create-flashcards or dashboard
  if (user) {
    return <Navigate to="/create-flashcards" replace />;
  }

  return <>{children}</>;
}

export default PublicRoute;
