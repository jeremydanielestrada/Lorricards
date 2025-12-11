import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { Folders } from "../mock-data/Folders";
import Folder from "../system/Folder";
import FolderDialog from "../system/FolderDialog";
import ProfileBanner from "./ProfileBanner";

function SideNavigation() {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  return (
    <>
      <div className="fixed top-0 bottom-0 z-50 px-4 bg-slate-800 border-2 border-slate-700 w-70  transition-transform  duration-300 ease-in-out ">
        <div className="px-2 py-3 text-white flex flex-col gap-2  items-center justify-center border-b mx-2">
          <img
            src="/public/images/LorricardsLogo.png"
            alt="Lorricards Logo"
            className="w-10 rounded"
          />
          <h2 className="text-2xl font-bold">Lorricards</h2>
        </div>
        <button
          onClick={() => setIsDialogVisible(true)}
          className="base-btn py-1 flex items-center justify-center space-x-2"
        >
          <FolderPlus />
          <span>Add Folder</span>
        </button>

        {/* Folder List */}
        <div className="my-5">
          <span className="font-medium text-slate-400">Folders:</span>
          <ul>
            <li>
              {Folders.map((folder) => (
                <Folder
                  link={`folder/${folder.title}`}
                  folder={folder}
                  key={folder.id}
                  title={folder.title}
                />
              ))}
            </li>
          </ul>
        </div>

        <ProfileBanner />

        <FolderDialog
          open={isDialogVisible}
          onClose={() => setIsDialogVisible(false)}
        />
      </div>
    </>
  );
}

export default SideNavigation;
