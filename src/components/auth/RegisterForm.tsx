function RegisterForm() {
  return (
    <form>
      <label htmlFor="first name" className="text-lg">
        First Name
      </label>
      <input type="text" name="first namel" className="input-base" />

      <label htmlFor="last name" className="text-lg">
        Last Name
      </label>
      <input type="text" name="last namel" className="input-base" />

      <label htmlFor="email" className="text-lg">
        Email
      </label>
      <input type="email" name="email" className="input-base" />

      <label htmlFor="password" className="text-lg">
        Password
      </label>
      <input type="password" name="password" className="input-base" />

      <label htmlFor="confirm password" className="text-lg">
        Confirm Password
      </label>
      <input type="password" name="confirm password" className="input-base" />

      <button type="submit" className="base-btn">
        Sign up
      </button>
    </form>
  );
}

export default RegisterForm;
