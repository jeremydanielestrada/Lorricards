function LoginForm() {
  return (
    <form>
      <label htmlFor="email" className="text-2xl">
        Email
      </label>
      <input
        type="email"
        name="email"
        className="border-2 p-1 border-slate-950  rounded w-full"
      />

      <label htmlFor="password" className="text-2xl">
        Password
      </label>
      <input
        type="password"
        name="password"
        className="border-2 p-1 border-slate-950  rounded w-full"
      />

      <button
        type="submit"
        className="rounded-2xl p-1 mt-5 bg-slate-400 border border-slate-950 w-full text-2xl font-bold cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
