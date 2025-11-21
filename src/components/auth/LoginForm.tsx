function LoginForm() {
  return (
    <form>
      <label htmlFor="email" className="text-lg">
        Email
      </label>
      <input
        type="email"
        name="email"
        className="border-2 p-2 border-slate-950 mb-5 rounded w-full"
      />

      <label htmlFor="password" className="text-lg">
        Password
      </label>
      <input
        type="password"
        name="password"
        className="border-2 p-2 border-slate-950   rounded w-full"
      />

      <button
        type="submit"
        className="rounded-lg py-2 mt-5 bg-slate-400 border border-slate-950 w-full text-lg font-bold cursor-pointer"
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
