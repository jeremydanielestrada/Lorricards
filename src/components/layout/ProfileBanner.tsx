import { authStore } from "../../stores/auth";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext"; // Add this import

function ProfileBanner() {
  const { logoutUser } = authStore();
  const navigate = useNavigate();
  const user = useContext(AuthContext); // Add this line to get user from context

  const handleLogout = async () => {
    const res = await logoutUser();

    if (res.success) {
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
        <button className="cursor-pointer" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default ProfileBanner;
