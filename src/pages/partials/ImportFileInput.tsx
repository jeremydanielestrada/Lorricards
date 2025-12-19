import { useState, useRef, useEffect } from "react";
import { useFlashCardStore } from "../../stores/flashCard";
import { LoaderCircle } from "lucide-react";
import { formActionDefault } from "../../utils/helpers";
import AlertNotification from "../../components/common/AlertNotifications";
import Button from "../../components/common/Button";

function ImportFileiInput({ folderId }: { folderId: number }) {
  const { createFlashCardsByFileUpload, getFlashCardByFolderId } =
    useFlashCardStore();
  const [file, setFile] = useState<File | null>(null);
  const [formAction, setFormAction] = useState(formActionDefault);
  const fileInputRef = useRef<HTMLInputElement>(null); // Add this
  const [showAlert, setShowAlert] = useState(false);

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (formAction.formSuccessMessage || formAction.formErrorMessage) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        // Optionally clear messages after hiding
        setFormAction((prev) => ({
          ...prev,
          formSuccessMessage: "",
          formErrorMessage: "",
        }));
      }, 3000);

      return () => clearTimeout(timer); // Cleanup
    }
  }, [formAction.formSuccessMessage, formAction.formErrorMessage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setFormAction({ ...formAction, formProcess: true });
    if (!file) {
      setFormAction({
        formErrorMessage: "Please select a file",
        formProcess: false,
        formSuccessMessage: "",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const res = await createFlashCardsByFileUpload(folderId, formData);

    if (res.success) {
      setFormAction({
        formErrorMessage: "",
        formSuccessMessage: res.message,
        formProcess: false,
      });
      await getFlashCardByFolderId(folderId);
      setFile(null);

      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setFormAction({
        formErrorMessage: res.message || "Error creating flashcards",
        formSuccessMessage: "",
        formProcess: false,
      });
    }
  };

  const onRemoveFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold mb-2">Import File</h2>

        {file && (
          <span
            className="underline  text-red-500 cursor-pointer "
            onClick={onRemoveFile}
          >
            Remove File
          </span>
        )}
      </div>
      <div className="flex gap-2 items-center flex-col">
        <input
          ref={fileInputRef} // Add this
          id="file-input"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="input-base"
          disabled={formAction.formProcess}
        />

        {showAlert && (
          <AlertNotification
            success={!!formAction.formSuccessMessage}
            message={
              formAction.formSuccessMessage || formAction.formErrorMessage
            }
          />
        )}
        <Button
          click={handleUpload}
          disabled={!file || formAction.formProcess}
          text={formAction.formProcess ? "Uploading..." : "Upload"}
          process={formAction.formProcess}
          icon={LoaderCircle}
        />
      </div>
    </div>
  );
}

export default ImportFileiInput;
