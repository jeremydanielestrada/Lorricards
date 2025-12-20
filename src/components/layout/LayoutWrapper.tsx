import { Outlet, useLocation } from "react-router";
import { useState, useContext, useEffect } from "react";
import { CircleChevronRight } from "lucide-react";
import { CircleChevronLeft } from "lucide-react";
import SideNavigation from "./SideNavigation";
import { AuthContext } from "../../hooks/AuthContext";

function LayoutWrapper() {
  const [isNavShow, setIsNavShow] = useState<boolean>(false);
  const user = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      setIsNavShow(true);
    } else {
      setIsNavShow(false);
    }
  }, [user]);

  // Check if current route is landing page
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {user && (
        <button
          className={`p-5 cursor-pointer transition-all duration-300 relative z-50 ${
            isNavShow ? "ml-70" : "ml-0"
          }`}
          onClick={() => setIsNavShow((prev) => !prev)}
        >
          {isNavShow ? (
            <CircleChevronLeft className="size-8" />
          ) : (
            <CircleChevronRight className="size-8" />
          )}
        </button>
      )}

      <SideNavigation
        navShow={isNavShow}
        setNavShow={() => setIsNavShow((prev) => !prev)}
      />
      <main
        className={`${!isLandingPage ? "px-2" : ""} ${
          isNavShow ? "w-full md:ml-35 " : "mx-auto"
        }`}
      >
        <Outlet />
      </main>
    </>
  );
}
export default LayoutWrapper;
