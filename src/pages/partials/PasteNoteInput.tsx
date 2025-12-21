import type React from "react";
import { useState, useEffect } from "react";
import { useFlashCardStore } from "../../stores/flashCard";
import { LoaderCircle } from "lucide-react";
import { formActionDefault } from "../../utils/helpers";
import AlertNotification from "../../components/common/AlertNotifications";
import Button from "../../components/common/Button";
import { validateInput } from "../../utils/validators";

function PasteNoteInput({ folderId }: { folderId: number }) {
  const { createFlashCardsFromDocument, getFlashCardByFolderId } =
    useFlashCardStore();
  const [formAction, setFormAction] = useState(formActionDefault);
  const [documentText, setDocumentText] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [validationError, setValidationError] = useState<string>("");

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDocumentText(value);

    // Clear validation error when user types
    if (validationError) {
      setValidationError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input
    const validation = validateInput(documentText);
    if (!validation.valid) {
      setValidationError(validation.error || "Invalid input");
      return;
    }
    setFormAction({ ...formAction, formProcess: true });

    const res = await createFlashCardsFromDocument(folderId, documentText);

    if (res.success) {
      setFormAction({
        formErrorMessage: "",
        formSuccessMessage: res.message,
        formProcess: false,
      });
      await getFlashCardByFolderId(folderId);
      setDocumentText("");
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
      <div className="relative">
        <textarea
          className={`input-base m-0 resize-none ${
            documentText ? "h-80" : ""
          } ${validationError ? "border-red-500" : ""}`}
          placeholder="Paste your study notes here (minimum 50 characters, 10 words)..."
          value={documentText}
          onChange={handleChange}
        ></textarea>
      </div>

      {validationError && (
        <div className="text-red-500 text-sm mt-2 bg-red-50 border border-red-200 rounded p-2">
          {validationError}
        </div>
      )}

      {showAlert && (
        <AlertNotification
          success={!!formAction.formSuccessMessage}
          message={formAction.formSuccessMessage || formAction.formErrorMessage}
        />
      )}

      <Button
        disabled={formAction.formProcess || !documentText.trim()}
        process={formAction.formProcess}
        icon={LoaderCircle}
        text="Generate Flashcards"
        type="submit"
      />
    </form>
  );
}

export default PasteNoteInput;
