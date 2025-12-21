/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { FolderPlus } from "lucide-react";
import { Layers2 } from "lucide-react";
import Folder from "../system/Folder";
import FolderDialog from "../system/FolderDialog";
import ProfileBanner from "./ProfileBanner";
import type { FolderType } from "../../stores/folder";
import { useFolderStore } from "../../stores/folder";
import ConfirmDialog from "../common/ConfirmDialog";
import { useNavigate, useLocation } from "react-router";
import { useMediaQuery } from "react-responsive";
import { AuthContext } from "../../hooks/AuthContext";

interface SideNavigationPropTypes {
  navShow: boolean;
  setNavShow: (value: boolean) => void;
}

function SideNavigation({ navShow, setNavShow }: SideNavigationPropTypes) {
  const user = useContext(AuthContext); // Use AuthContext instead of prop
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [isConfirmDialogVisible, setConfirmDialog] = useState<boolean>(false);
  const [folderData, setFolderData] = useState<FolderType | undefined>(
    undefined
  );
  const { folders, getFoldersByuserId, deleteFolder } = useFolderStore();
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      getFoldersByuserId();
    }
  }, [user]); // This will trigger whenever user changes

  useEffect(() => {
    if (isMobile) {
      setNavShow(false);
    } else {
      setNavShow(true);
    }
  }, [isMobile]);

  const isUpdate = (data: any) => {
    setFolderData(data);
    setIsDialogVisible(true);
  };

  const isAdd = () => {
    setFolderData(null!);
    setIsDialogVisible(true);
  };

  const isDelete = async (id: number) => {
    const res = await deleteFolder(id);

    if (res.success) {
      setConfirmDialog(false);
      setFolderData(null!);
      await getFoldersByuserId();
    }

    if (location.pathname.includes(`/folder/${id}`)) {
      navigate("/create-flashcards");
    }
  };

  const selectFolder = (data: any) => {
    setConfirmDialog(true);
    setFolderData(data);
  };

  const closeSideNavOnMobileWhenNavigating = () => {
    if (isMobile) {
      setNavShow(false);
    } else {
      return;
    }
  };

  return (
    <>
      {navShow && user && (
        <div className="fixed top-0 bottom-0 z-50 px-4 bg-slate-800 border-2 border-slate-700 w-70 transition-transform duration-300 ease-in-out flex flex-col">
          {/* Logo Section - Fixed at Top */}
          <div className="px-2 py-3 text-white flex flex-col space-y-2 items-center justify-center border-b mx-2 flex-shrink-0">
            <img
              src="/public/images/LorricardsLogo.png"
              alt="Lorricards Logo"
              className="w-10 rounded"
            />
            <h2 className="text-2xl font-bold">Lorricards</h2>
          </div>

          {/* Action Buttons - Fixed */}
          <div className="mt-5 flex-shrink-0">
            <button
              onClick={() => navigate("/create-flashcards")}
              className="base-btn py-1 flex items-center space-x-2"
            >
              <Layers2 className="ml-2" />
              <span>Create Flash Cards</span>
            </button>

            <button
              onClick={() => isAdd()}
              className="base-btn py-1 flex items-center space-x-2"
            >
              <FolderPlus className="ml-2" />
              <span>Add Folder</span>
            </button>
          </div>

          {/* Scrollable Folder List */}
          <div className="my-5 flex-1 overflow-y-auto overflow-x-hidden min-h-0">
            <span className="font-medium text-slate-400">Folders:</span>
            <ul className="mt-2">
              {folders.length > 0 ? (
                folders.map((folder: FolderType) => (
                  <Folder
                    link={`folder/${folder.id}/${folder.title}`}
                    folder={folder}
                    key={folder.id}
                    title={folder.title}
                    onUpdate={() => isUpdate(folder)}
                    onSelect={() => selectFolder(folder)}
                    click={closeSideNavOnMobileWhenNavigating}
                  />
                ))
              ) : user ? (
                <div className="text-slate-400 text-sm mt-2">
                  No folders yet. Create one!
                </div>
              ) : (
                <div className="text-slate-400 text-sm mt-2">
                  Loading folders...
                </div>
              )}
            </ul>
          </div>

          {/* Profile Banner - Fixed at Bottom */}
          <div className="flex-shrink-0 border-t border-slate-700 pt-3 pb-3">
            <ProfileBanner />
          </div>

          <FolderDialog
            open={isDialogVisible}
            onClose={() => setIsDialogVisible(false)}
            folderData={folderData}
          />
          <ConfirmDialog
            open={isConfirmDialogVisible}
            onClose={() => setConfirmDialog(false)}
            confirm={() => folderData?.id && isDelete(folderData.id)}
            text="Delete this folder?"
          />
        </div>
      )}
    </>
  );
}

export default SideNavigation;
