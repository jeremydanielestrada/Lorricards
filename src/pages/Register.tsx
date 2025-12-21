import { NavLink } from "react-router";
import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <div className="card mx-auto  mt-10 md:w-lg">
      <div className="flex items-center space-x-2 justify-center mb-4">
        <img
          className="rounded"
          src="/images/LorricardsLogo.png"
          alt="logo"
          width="50"
        />
        <h2 className="text-center pb-3 text-2xl font-extrabold">Lorricards</h2>
      </div>
      <RegisterForm />
      <div className="mt-3 text-lg text-right hover:underline">
        <NavLink to="/login" className="hover:text-blue-400">
          Sign in
        </NavLink>
      </div>
    </div>
  );
}

export default Register;
