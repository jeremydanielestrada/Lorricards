function SigninWithGoogle() {
  return (
    <>
      <button className="flex align-middle justify-center space-x-2 rounded-lg py-2 mt-5 bg-slate-400 border border-slate-950 w-full text-lg font-bold cursor-pointer">
        <img
          src="/public/images/google.png"
          alt="google logo"
          className="w-5 h-5 mt-2"
        />
        <span className="mt-1">Sign in with Google</span>
      </button>
    </>
  );
}

export default SigninWithGoogle;
