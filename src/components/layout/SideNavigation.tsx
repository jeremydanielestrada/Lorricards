/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
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

interface SideNavigationPropTypes {
  navShow: boolean;
  user?: boolean;
  setNavShow: (value: boolean) => void;
}

function SideNavigation({
  navShow,
  setNavShow,
  user,
}: SideNavigationPropTypes) {
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
    getFoldersByuserId();
  }, [user]);

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
      navigate("/create-flashcards"); // Navigate to home or another default page
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
        <div className="fixed top-0 bottom-0 z-50 px-4 bg-slate-800 border-2 border-slate-700 w-70  transition-transform  duration-300 ease-in-out ">
          <div className="px-2 py-3 text-white flex flex-col space-y-2  items-center justify-center border-b mx-2">
            <img
              src="/public/images/LorricardsLogo.png"
              alt="Lorricards Logo"
              className="w-10 rounded"
            />
            <h2 className="text-2xl font-bold">Lorricards</h2>
          </div>

          <div className="mt-5">
            <button
              onClick={() => navigate("/create-flashcards")}
              className="base-btn py-1 flex items-center space-x-2"
            >
              <Layers2 className="ml-2" />
              <span>Create Flash Cards</span>
            </button>

            <button
              onClick={() => isAdd()}
              className="base-btn py-1 flex items-center  space-x-2"
            >
              <FolderPlus className="ml-2" />
              <span>Add Folder</span>
            </button>
          </div>

          {/* Folder List */}
          <div className="my-5">
            <span className="font-medium text-slate-400">Folders:</span>
            <ul>
              <li>
                {folders.length > 0
                  ? folders?.map((folder: FolderType) => (
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
                  : "Loading Folders..."}
              </li>
            </ul>
          </div>

          <ProfileBanner />

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
