import { Route, Routes } from "react-router";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ViewFolder from "../pages/ViewFolder";
import CreatFlashCards from "../pages/CreateFlashCards";
import LandingPage from "../pages/LandingPage";
import ForbiddenPage from "../pages/ForbiddenPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route
          index
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        {/* Public Routes - only for non-authenticated users */}
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="create-flashcards"
          element={
            <ProtectedRoute>
              <CreatFlashCards />
            </ProtectedRoute>
          }
        />
        <Route
          path="folder/:id/:title"
          element={
            <ProtectedRoute>
              <ViewFolder />
            </ProtectedRoute>
          }
        />

        {/* Error Pages */}
        <Route path="forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
