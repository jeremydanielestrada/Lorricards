import { FolderClosed } from "lucide-react";
import { NavLink } from "react-router";

interface FolderTypes {
  title: string;
  link: string;
  folder: object;
}

function Folder({ title, link, folder }: FolderTypes) {
  return (
    <NavLink
      to={link}
      state={{ folderData: folder }}
      className={({ isActive }) =>
        `py-2 my-2 rounded-sm cursor-pointer flex items-center ${
          isActive ? "bg-slate-600" : "hover:bg-slate-500/75"
        }`
      }
    >
      <FolderClosed size="30" className="ml-2" />
      <p className="text-md font-semibold mx-1 truncate">{title}</p>
    </NavLink>
  );
}

export default Folder;
