import type React from "react";
import { useState, useEffect } from "react";
import { useFlashCardStore } from "../../stores/flashCard";
import { LoaderCircle } from "lucide-react";
import { formActionDefault } from "../../utils/helpers";
import AlertNotification from "../../components/common/AlertNotifications";
import Button from "../../components/common/Button";

function PasteNoteInput({ folderId }: { folderId: number }) {
  const { createFlashCardsFromDocument, getFlashCardByFolderId } =
    useFlashCardStore();
  const [formAction, setFormAction] = useState(formActionDefault);
  const [documet, setDocument] = useState<string>("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormAction({ ...formAction, formProcess: true });

    const res = await createFlashCardsFromDocument(folderId, documet);

    if (res.success) {
      setFormAction({
        formErrorMessage: "",
        formSuccessMessage: res.message,
        formProcess: false,
      });
      await getFlashCardByFolderId(folderId);
      setDocument("");
    } else {
      setFormAction({
        formErrorMessage: res.message || "Error creating flashcards",
        formSuccessMessage: "",
        formProcess: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className={`input-base m-0 resize-none ${documet ? "h-80" : " "}`}
        placeholder="Paste your notes.."
        value={documet}
        onChange={(e) => setDocument(e.target.value)}
      ></textarea>

      {showAlert && (
        <AlertNotification
          success={!!formAction.formSuccessMessage}
          message={formAction.formSuccessMessage || formAction.formErrorMessage}
        />
      )}

      <Button
        disabled={formAction.formProcess}
        process={formAction.formProcess}
        icon={LoaderCircle}
        text="Generate Flashcards"
        type="submit"
      />
    </form>
  );
}

export default PasteNoteInput;
