import { NavLink } from "react-router";
import LoginForm from "../auth/LoginForm";
import SigninWithGoogle from "../auth/SigninWithGoogle";

function Login() {
  return (
    <div className="card mx-auto md:w-lg ">
      <div>
        <h2 className="text-center pb-3 text-2xl font-extrabold">Lorricards</h2>
      </div>
      <LoginForm />

      <p className="text-center my-4  border-b-2 border-slate-600">Or</p>
      <SigninWithGoogle />
      <div className="mt-3 text-lg text-right hover:underline">
        <NavLink to="register">Sign up</NavLink>
      </div>
    </div>
  );
}

export default Login;
