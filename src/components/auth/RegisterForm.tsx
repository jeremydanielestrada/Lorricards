import { authStore } from "../../stores/auth";
import { useState } from "react";
import { formActionDefault } from "../../utils/helpers";
import { useNavigate } from "react-router";
import { LoaderCircle } from "lucide-react";
import type { UserData } from "../../stores/auth";
import AlertNotification from "../common/AlertNotifications";
import Button from "../common/Button";

const formDataDefault = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  role: "user",
};

function RegisterForm() {
  const { registerUser } = authStore();
  const navigate = useNavigate();

  const [form, setForm] = useState<UserData>(formDataDefault);
  const [formAction, setFormAction] = useState(formActionDefault);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate passwords match
    if (form.password !== form.confirm_password) {
      setFormAction({
        ...formAction,
        formProcess: false,
        formErrorMessage: "Passwords do not match",
      });
      return;
    }

    setFormAction({ ...formAction, formProcess: true });

    const res = await registerUser(form);

    if (res.user && res.success) {
      setFormAction({
        ...formAction,
        formProcess: false,
        formSuccessMessage: "User registered successfully",
      });
      setForm(formDataDefault);
      setSuccess(true);
      navigate("/home");
    } else {
      setFormAction({
        ...formAction,
        formProcess: false,
        formErrorMessage: res.message,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <AlertNotification
        success={isSuccess}
        message={
          isSuccess
            ? formAction.formSuccessMessage
            : formAction.formErrorMessage
        }
      />

      <label htmlFor="first name" className="text-lg">
        First Name
      </label>
      <input
        type="text"
        name="first_name"
        className="input-base"
        value={form.first_name}
        onChange={handleChange}
      />

      <label htmlFor="last name" className="text-lg">
        Last Name
      </label>
      <input
        type="text"
        name="last_name"
        className="input-base"
        value={form.last_name}
        onChange={handleChange}
      />

      <label htmlFor="email" className="text-lg">
        Email
      </label>
      <input
        type="email"
        name="email"
        className="input-base"
        value={form.email}
        onChange={handleChange}
      />

      <label htmlFor="password" className="text-lg">
        Password
      </label>
      <input
        type="password"
        name="password"
        className="input-base"
        value={form.password}
        onChange={handleChange}
      />

      <label htmlFor="confirm password" className="text-lg">
        Confirm Password
      </label>
      <input
        type="password"
        name="confirm_password"
        className="input-base"
        value={form.confirm_password}
        onChange={handleChange}
      />
      <Button
        type={"submit"}
        disabled={formAction.formProcess}
        process={formAction.formProcess}
        icon={LoaderCircle}
        text={"Sign In"}
      />
    </form>
  );
}

export default RegisterForm;
