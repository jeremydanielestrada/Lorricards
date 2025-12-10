import type { AuthResponse } from "../../stores/auth";

interface GoogleAuth {
  login: () => Promise<AuthResponse>;
}

function SigninWithGoogle({ login }: GoogleAuth) {
  return (
    <>
      <button
        className="flex items-center justify-center space-x-2 base-btn border-2 border-slate-600 bg-slate-900"
        onClick={login}
      >
        <img
          src="/public/images/google.png"
          alt="google logo"
          className="w-5 h-5"
        />
        <span>Sign in with Google</span>
      </button>
    </>
  );
}

export default SigninWithGoogle;
