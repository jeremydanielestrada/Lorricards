/* eslint-disable react-hooks/exhaustive-deps */
import { useState, type JSX, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { NotebookPen, Import, type LucideIcon } from "lucide-react";
import PasteNoteInput from "./partials/PasteNoteInput";
import Flashcard from "../components/system/Flashcard";
import ImportFileiInput from "./partials/ImportFileInput";
import { useFlashCardStore } from "../stores/flashCard";
import type { FlashCard } from "../stores/flashCard";

//Types
type TabId = "tab1" | "tab2";
interface Tabs {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

function ViewFolder() {
  const location = useLocation();
  const { id, title } = useParams();
  const folderData = location.state?.folderData;
  const [activeTab, setActiveTab] = useState<TabId>("tab1");
  const { getFlashCardByFolderId, flashCards } = useFlashCardStore();

  const tabs: Tabs[] = [
    { id: "tab1", label: "Paste Notes", icon: NotebookPen },
    { id: "tab2", label: "Super Import", icon: Import },
  ];

  useEffect(() => {
    console.log(title);
    console.log(id);
    if (id) {
      getFlashCardByFolderId(Number(id));
    }
  }, [id]);

  const tabContent: Record<TabId, JSX.Element> = {
    tab1: <PasteNoteInput folderId={folderData.id || 0} />,

    tab2: <ImportFileiInput folderId={folderData.id || 0} />,
  };

  return (
    <div className="mx-auto w-80 sm:w-100  md:w-300">
      <h1 className="text-center  text-3xl sm:text-5xl md:text-7xl">
        {title || folderData?.title}
      </h1>

      <div className="mt-5 flex flex-wrap space-x-2 justify-center items-center border-b  font-semibold">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              className={`md:py-2 font-semibold md:text-lg px-1 text-sm bg-slate-400 mb-2 rounded cursor-pointer  flex items-center space-x-1 ${
                activeTab === tab.id
                  ? " border-b-2 border-b-blue-600 text-blue-600"
                  : `text-white`
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
        className={`w-full border-2 border-white  max-h-120  mt-5 grid md:grid-cols-3 sm:grid-cols-2 gap-4 ${
          flashCards.length > 3 ? "overflow-y-scroll" : "overflow-hidden"
        }`}
      >
        {flashCards ? (
          flashCards.map((f: FlashCard) => (
            <Flashcard
              key={f.question}
              question={f.question}
              answer={f.answer}
            />
          ))
        ) : (
          <div>Loading FlashCards</div>
        )}
      </div>
    </div>
  );
}

export default ViewFolder;
