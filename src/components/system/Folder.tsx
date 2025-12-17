import { FolderClosed, Pencil, Trash } from "lucide-react";
import { NavLink } from "react-router";

interface FolderPropTypes {
  title: string;
  link: string;
  folder: object;
  onUpdate: () => void;
  onDelete?: () => void;
  onSelect: () => void;
}

function Folder({ title, link, folder, onSelect, onUpdate }: FolderPropTypes) {
  return (
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

      <div className="flex space-x-1 mx-2">
        <Pencil className="cursor-pointer text-blue-600" onClick={onUpdate} />
        <Trash className="cursor-pointer text-red-600" onClick={onSelect} />
      </div>
    </NavLink>
  );
}

export default Folder;
