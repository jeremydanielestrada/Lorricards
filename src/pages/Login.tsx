import { NavLink } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import SigninWithGoogle from "../components/auth/SigninWithGoogle";
import { authStore } from "../stores/auth";
import { useEffect } from "react";

function Login() {
  const { googleAuth } = authStore();

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: googleAuth,
    });

    google.accounts.id.renderButton(document.getElementById("googleBtn"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="card mx-auto md:w-lg ">
      <div>
        <h2 className="text-center pb-3 text-2xl font-extrabold">Lorricards</h2>
      </div>
      <LoginForm />

      <p className="text-center py-4  border-b-2 border-slate-600">Or</p>
      <SigninWithGoogle login={googleAuth} />
      <div className="mt-3 text-lg text-right hover:underline">
        <NavLink to="register">Sign up</NavLink>
      </div>
    </div>
  );
}

export default Login;
