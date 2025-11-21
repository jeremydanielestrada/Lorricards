import { NavLink } from "react-router";
import SigninWithGoogle from "../auth/SigninWithGoogle";
import RegisterForm from "../auth/RegisterForm";

function Register() {
  return (
    <div className="card mx-auto md:w-lg">
      <div>
        <h2 className="text-center pb-3 text-2xl font-extrabold">Lorricards</h2>
      </div>
      <RegisterForm />
      <p className="text-center my-4  border-b-2 border-slate-600">Or</p>
      <SigninWithGoogle />
      <div className="mt-3 text-lg text-right hover:underline">
        <NavLink to="/">Sign in</NavLink>
      </div>
    </div>
  );
}

export default Register;
