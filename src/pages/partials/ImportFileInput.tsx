import { useState } from "react";
import { useFlashCardStore } from "../../stores/flashCard";
import { LoaderCircle } from "lucide-react";
import { formActionDefault } from "../../utils/helpers";
import Button from "../../components/common/Button";

function ImportFileiInput({ folderId }: { folderId: number }) {
  const { createFlashCardsByFileUpload, getFlashCardByFolderId } =
    useFlashCardStore();
  const [file, setFile] = useState<File | null>(null);
  const [formAction, setFormAction] = useState(formActionDefault);

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
    } else {
      setFormAction({
        formErrorMessage: res.message || "Error creating flashcards",
        formSuccessMessage: "",
        formProcess: false,
      });
    }
  };

  return (
    <div className="mt-2">
      <h2 className="text-xl font-bold mb-2">Import File</h2>
      <div className="flex gap-2 items-center flex-col">
        <input
          id="file-input"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="input-base"
          disabled={formAction.formProcess}
        />
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
