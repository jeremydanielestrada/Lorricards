import { Route, Routes } from "react-router";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import ViewFolder from "../components/pages/ViewFolder";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="folder/:title" element={<ViewFolder />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
