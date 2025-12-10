import { NavLink } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import SigninWithGoogle from "../components/auth/SigninWithGoogle";
import { authStore } from "../stores/auth";
import { useEffect } from "react";

function Login() {
  const { googleAuth } = authStore();

  useEffect(() => {
    console.log("Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);
    console.log(
      "Is undefined?",
      import.meta.env.VITE_GOOGLE_CLIENT_ID === undefined
    );
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: googleAuth,
        });

        const buttonDiv = document.getElementById("googleBtn");
        if (buttonDiv) {
          window.google.accounts.id.renderButton(buttonDiv, {
            theme: "outline",
            size: "large",
          });
        }
      }
    };

    // Wait for script to load
    if (window.google) {
      initializeGoogleSignIn();
    } else {
      window.addEventListener("load", initializeGoogleSignIn);
      return () => window.removeEventListener("load", initializeGoogleSignIn);
    }
  }, [googleAuth]);

  return (
    <div className="card mx-auto md:w-lg ">
      <div>
        <h2 className="text-center pb-3 text-2xl font-extrabold">Lorricards</h2>
      </div>
      <LoginForm />

      <p className="text-center py-4  border-b-2 border-slate-600">Or</p>
      <SigninWithGoogle id={"googleBtn"} login={googleAuth} />
      <div className="mt-3 text-lg text-right hover:underline">
        <NavLink to="register">Sign up</NavLink>
      </div>
    </div>
  );
}

export default Login;
