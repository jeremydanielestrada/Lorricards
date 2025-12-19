/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, type JSX } from "react";
import { useFolderStore } from "../stores/folder";
import PasteNoteInput from "./partials/PasteNoteInput";
import ImportFileiInput from "./partials/ImportFileInput";
import Flashcard from "../components/system/Flashcard";
import { useFlashCardStore } from "../stores/flashCard";
import type { FlashCard } from "../stores/flashCard";
import { NotebookPen, Import, type LucideIcon } from "lucide-react";

type TabId = "tab1" | "tab2";
interface Tabs {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

function CreateFlashCards() {
  const [activeTab, setActiveTab] = useState<TabId>("tab1");
  const [untitledFolderId, setUntitledFolderId] = useState<number | null>(null);
  const { getOrCreateUntitledFolder } = useFolderStore();
  const { getFlashCardByFolderId, flashCards } = useFlashCardStore();

  const tabs: Tabs[] = [
    { id: "tab1", label: "Paste Notes", icon: NotebookPen },
    { id: "tab2", label: "Super Import", icon: Import },
  ];

  useEffect(() => {
    const initializeFolder = async () => {
      const folder = await getOrCreateUntitledFolder();
      if (folder) {
        setUntitledFolderId(folder.id!);
        getFlashCardByFolderId(folder.id!);
      }
    };
    initializeFolder();
  }, []);

  const tabContent: Record<TabId, JSX.Element> = {
    tab1: <PasteNoteInput folderId={untitledFolderId || 0} />,
    tab2: <ImportFileiInput folderId={untitledFolderId || 0} />,
  };

  if (!untitledFolderId) {
    return (
      <div className="mx-auto w-80 sm:w-100 md:w-300 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
        Paste your notes, or upload some documents to see the magic
      </h1>

      <div className="mt-5 flex flex-wrap space-x-2 justify-center items-center border-b font-semibold">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              className={`md:py-2 font-semibold md:text-lg px-1 text-sm bg-slate-400 mb-2 rounded cursor-pointer flex items-center space-x-1 ${
                activeTab === tab.id
                  ? "border-b-2 border-b-blue-600 text-blue-600"
                  : "text-white"
              }`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              <Icon />
            </button>
          );
        })}
      </div>

      <div className="mt-5">{tabContent[activeTab]}</div>

      <div
        className={`w-full border border-white max-h-120 mt-5 grid md:grid-cols-3 sm:grid-cols-2 gap-4 ${
          flashCards.length > 3 ? "overflow-y-scroll" : "overflow-hidden"
        }`}
      >
        {flashCards.length > 0 ? (
          flashCards.map((f: FlashCard) => (
            <Flashcard
              key={f.question}
              question={f.question}
              answer={f.answer}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-4">
            No flashcards yet. Start creating!
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateFlashCards;
