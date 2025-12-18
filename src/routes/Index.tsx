import { Route, Routes } from "react-router";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ViewFolder from "../pages/ViewFolder";
import CreatFlashCards from "../pages/CreateFlashCards";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create-flashcards" element={<CreatFlashCards />} />
        <Route path="folder/:id/:title" element={<ViewFolder />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
