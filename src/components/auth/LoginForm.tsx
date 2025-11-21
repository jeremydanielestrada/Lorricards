function LoginForm() {
  return (
    <form>
      <label htmlFor="email" className="text-lg">
        Email
      </label>
      <input type="email" name="email" className="input-base" />

      <label htmlFor="password" className="text-lg">
        Password
      </label>
      <input type="password" name="password" className="input-base" />

      <button type="submit" className="base-btn">
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
