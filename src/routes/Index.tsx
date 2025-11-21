import { Route, Routes } from "react-router";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
