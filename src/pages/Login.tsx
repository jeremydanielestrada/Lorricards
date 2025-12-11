/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import { authStore } from "../stores/auth";
import { useNavigate } from "react-router";
import { useEffect, useCallback } from "react";

function Login() {
  const { googleAuth } = authStore();
  const navigate = useNavigate();

  const handleGoogleAuth = useCallback(
    async (response: any) => {
      console.log("Google response:", response); // Debug log

      if (response.credential) {
        console.log(
          "Credential received:",
          response.credential.substring(0, 20) + "..."
        ); // Debug log

        const res = await googleAuth(response.credential);

        if (res.success && res.user) {
          navigate("/home");
        } else {
          console.error("Auth failed:", res.message); // Debug log
          alert(`Error Google Auth: ${res.message}`);
        }
      } else {
        console.error("No credential in response"); // Debug log
        alert("No credential received from Google");
      }
    },
    [navigate, googleAuth]
  );

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleAuth,
        });

        const buttonDiv = document.getElementById("googleBtn");
        if (buttonDiv) {
          window.google.accounts.id.renderButton(buttonDiv, {
            theme: "outline",
            size: "large",
            with: "300",
          });
        }
      }
    };

    // If script already loaded
    if (window.google) {
      initializeGoogleSignIn();
    } else {
      window.addEventListener("load", initializeGoogleSignIn);
      return () => window.removeEventListener("load", initializeGoogleSignIn);
    }
  }, [handleGoogleAuth]);

  return (
    <div className="card mx-auto md:w-lg ">
      <div>
        <h2 className="text-center pb-3 text-2xl font-extrabold">Lorricards</h2>
      </div>
      <LoginForm />

      <p className="text-center py-4  border-b-2 border-slate-600">Or</p>
      <button id="googleBtn" className="w-full"></button>
      <div className="mt-3 text-lg text-right hover:underline">
        <NavLink to="register">Sign up</NavLink>
      </div>
    </div>
  );
}

export default Login;
