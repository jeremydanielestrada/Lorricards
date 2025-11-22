import { FolderClosed } from "lucide-react";

interface FolderTypes {
  title: string;
  view: () => void;
}

function Folder({ title, view }: FolderTypes) {
  return (
    <div
      className="py-2 rounded-sm cursor-pointer hover:bg-slate-500/75 flex items-center"
      onClick={view}
    >
      <FolderClosed size="30" className="ml-2" />
      <p className="text-md font-semibold mx-1 truncate">{title}</p>
    </div>
  );
}

export default Folder;
