import { FolderClosed, Pencil, Trash } from "lucide-react";
import { NavLink } from "react-router";

interface FolderTypes {
  title: string;
  link: string;
  folder: object;
}

function Folder({ title, link, folder }: FolderTypes) {
  return (
    <div className="flex items-center justify-between">
      <NavLink
        to={link}
        state={{ folderData: folder }}
        className={({ isActive }) =>
          `py-2 my-2 rounded-sm cursor-pointer flex items-center justify-between ${
            isActive ? "bg-slate-600" : "hover:bg-slate-500/75"
          }`
        }
      >
        <div className="flex items-center">
          <FolderClosed size="30" className="ml-2" />
          <p className="text-md font-semibold mx-1 w-30 truncate">{title}</p>
        </div>
      </NavLink>

      <div className="flex space-x-1 mx-2">
        <Pencil />
        <Trash />
      </div>
    </div>
  );
}

export default Folder;
