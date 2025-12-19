import { authStore } from "../../stores/auth";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext"; // Add this import
import { useState } from "react";

function ProfileBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const { logoutUser } = authStore();
  const navigate = useNavigate();
  const user = useContext(AuthContext); // Add this line to get user from context

  const handleLogout = async () => {
    setIsLoading(true);
    const res = await logoutUser();

    if (res.success) {
      setIsLoading(false);
      navigate("/");
    } else {
      alert("Error logging out user");
    }
  };

  return (
    <div className="absolute bottom-2 border-t-2 w-60">
      <div className="mt-2 flex items-center justify-between">
        <span className="font-semibold">
          {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
        </span>
        <button
          disabled={isLoading}
          className={`cursor-pointer text-red-500  hover:text-red-400 ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleLogout}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default ProfileBanner;
