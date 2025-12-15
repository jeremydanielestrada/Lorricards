import type React from "react";
import { useState } from "react";
import { useFlashCardStore } from "../../stores/flashCard";
import { LoaderCircle } from "lucide-react";
import { formActionDefault } from "../../utils/helpers";
import Button from "../../components/common/Button";

function PasteNoteInput({ folderId }: { folderId: number }) {
  const { createFlashCardsFromDocument, getFlashCardByFolderId } =
    useFlashCardStore();
  const [formAction, setFormAction] = useState(formActionDefault);
  const [documet, setDocument] = useState<string>("");

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
        className="input-base m-0 resize-none "
        placeholder="Paste your notes.."
        value={documet}
        onChange={(e) => setDocument(e.target.value)}
      ></textarea>
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
