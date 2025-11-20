import { Route, Routes } from "react-router";
import LayoutWrapper from "../components/layout/LayoutWrapper";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />} />
    </Routes>
  );
}
export default AppRoutes;
