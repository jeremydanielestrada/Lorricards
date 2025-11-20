import { Outlet } from "react-router";
import { useState } from "react";
import SideNavigation from "./SideNavigation";
import { CircleChevronRight } from "lucide-react";
import { CircleChevronLeft } from "lucide-react";

function LayoutWrapper() {
  const [isNavShow, setIsNavShow] = useState<boolean>(true);
  return (
    <>
      {/* Navbar */}
      <button
        className={isNavShow ? "ml-70 p-5" : "p-5"}
        onClick={() => setIsNavShow((prev) => !prev)}
      >
        {isNavShow ? (
          <CircleChevronLeft className="size-8" />
        ) : (
          <CircleChevronRight className="size-8" />
        )}
      </button>

      <SideNavigation showNav={isNavShow} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default LayoutWrapper;
