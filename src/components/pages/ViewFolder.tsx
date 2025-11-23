import { useState, type JSX } from "react";
import { useParams, useLocation } from "react-router";
import { NotebookPen, Import, type LucideIcon } from "lucide-react";

//Types
type TabId = "tab1" | "tab2";
interface Tabs {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

function ViewFolder() {
  const location = useLocation();
  const { title } = useParams();
  const folderData = location.state?.folderData;
  const [activeTab, setActiveTab] = useState<TabId>("tab1");

  const tabs: Tabs[] = [
    { id: "tab1", label: "Paste Notes", icon: NotebookPen },
    { id: "tab2", label: "Super Import", icon: Import },
  ];

  const tabContent: Record<TabId, JSX.Element> = {
    tab1: (
      <form>
        <textarea
          className="input-base m-0 resize-none "
          placeholder="Paste your notes.."
        ></textarea>
        <button className="base-btn mt-1">Save</button>
      </form>
    ),

    tab2: (
      <div className="mt-2">
        <h2 className="text-xl font-bold mb-2">Import File</h2>
        <input type="file" className="input-base" />
      </div>
    ),
  };

  return (
    <div className="mx-auto w-80 sm:w-100  md:w-180">
      <h1 className="text-center  text-3xl sm:text-5xl md:text-7xl">
        {folderData?.title || title}
      </h1>

      <div className="mt-5 flex flex-wrap space-x-2 justify-center items-center border-b  font-semibold">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              className={`py-2 px-1 bg-slate-400 mb-2 rounded cursor-pointer font-semibold flex items-center space-x-1 ${
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
    </div>
  );
}

export default ViewFolder;
