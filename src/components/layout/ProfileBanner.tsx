/* eslint-disable react-hooks/exhaustive-deps */
import { authStore } from "../../stores/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function ProfileBanner() {
  const { userData, fetchUser, logoutUser } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

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
          {userData
            ? `${userData.first_name} ${userData.last_name}`
            : "Loading..."}
        </span>
        <button className="cursor-pointer" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default ProfileBanner;
