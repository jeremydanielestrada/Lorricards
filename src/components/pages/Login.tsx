import LoginForm from "../auth/LoginForm";
import SigninWithGoogle from "../auth/SigninWithGoogle";

function Login() {
  return (
    <div className="bg-slate-800  p-5 m-5 rounded shadow-2xl mx-auto  md:w-lg ">
      <div>
        <h2 className="text-center pb-3 text-2xl font-extrabold">Lorricards</h2>
      </div>
      <LoginForm />

      <div>
        <p className="text-center my-4  border-b-2 border-slate-600">
          Other Option
        </p>
        <SigninWithGoogle />
      </div>
    </div>
  );
}

export default Login;
