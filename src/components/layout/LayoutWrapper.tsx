import { Outlet } from "react-router";
import Navbar from "./Navbar";

function LayoutWrapper() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}
export default LayoutWrapper;
