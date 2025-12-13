import { useState, useContext } from "react";
import { formActionDefault } from "../../utils/helpers";
import { useFolderStore } from "../../stores/folder";
import { AuthContext } from "../../hooks/AuthContext";
import { LoaderCircle } from "lucide-react";
import AlertNotification from "../common/AlertNotifications";
import type { FolderType } from "../../stores/folder";
import Button from "../common/Button";

interface FolderDialog {
  open: boolean;
  onClose: () => void;
}

function FolderDialog({ open, onClose }: FolderDialog) {
  const { createFolder } = useFolderStore();
  const user = useContext(AuthContext);
  const [formAction, setFormAction] = useState(formActionDefault);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [form, setForm] = useState<FolderType>({
    title: "",
    user_id: user?.id || 0,
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormAction({ ...formAction, formProcess: true });

    const res = await createFolder(form);

    if (res.success) {
      setFormAction({
        formSuccessMessage: res.message,
        formProcess: false,
        formErrorMessage: "",
      });
      setForm({ title: "", user_id: user?.id || 0 });
      setIsSuccess(true);
      onClose();
    } else {
      setFormAction({
        formProcess: false,
        formErrorMessage: res.message || "Error creating folder",
        formSuccessMessage: "",
      });
      setIsSuccess(false);
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
    <>
      {/* BackDrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          open ? "visible bg-black/20" : "invisible"
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()} //Avoid modal being close when click
          className={`card shadow transition-all ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="text-lg font-extrabold">
              Folder Name
            </label>
            <input
              type="text"
              name="title"
              className="input-base"
              value={form.title}
              onChange={handleChange}
            />
            <AlertNotification
              message={
                isSuccess
                  ? formAction.formSuccessMessage
                  : formAction.formErrorMessage
              }
              success={isSuccess}
            />
            <Button
              type="submit"
              disabled={formAction.formProcess}
              text="Submit"
              icon={LoaderCircle}
              process={formAction.formProcess}
            />
          </form>
          <div className="my-2">
            <button
              className="base-btn bg-red-600 hover:bg-red-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FolderDialog;
