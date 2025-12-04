import { useLocation } from "react-router";

function SigninWithGoogle() {
  const location = useLocation();
  const isRegisterPage: boolean = location.pathname === "/register";
  return (
    <>
      <button className="flex items-center justify-center space-x-2 base-btn border-2 border-slate-600 bg-slate-900">
        <img
          src="/public/images/google.png"
          alt="google logo"
          className="w-5 h-5"
        />
        <span>Sign {isRegisterPage ? "up" : "in"} with Google</span>
      </button>
    </>
  );
}

export default SigninWithGoogle;
