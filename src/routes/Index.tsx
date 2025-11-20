import { Route, Routes } from "react-router";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import Login from "../components/pages/Login";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
