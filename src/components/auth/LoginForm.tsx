import { authStore } from "../../stores/auth";
import { useState } from "react";
import type { LoginTypes } from "../../stores/auth";
import { formActionDefault } from "../../utils/helpers";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import AlertNotification from "../common/AlertNotifications";
import Button from "../common/Button";

const formDataDefault = {
  email: "",
  password: "",
};

function LoginForm() {
  const [form, setForm] = useState<LoginTypes>(formDataDefault);
  const [formAction, setFormAction] = useState(formActionDefault);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const { loginUser } = authStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setFormAction({ ...formAction, formProcess: true });
    e.preventDefault();

    const res = await loginUser(form);

    if (res.user && res.success) {
      setFormAction({
        ...formAction,
        formSuccessMessage: res.message,
        formProcess: false,
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

export default LoginForm;
