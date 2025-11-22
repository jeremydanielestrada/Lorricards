import { FolderClosed } from "lucide-react";

function Folder({ topic }: { topic: string }) {
  return (
    <div className="py-2 rounded-sm cursor-pointer hover:bg-slate-500/75 flex items-center">
      <FolderClosed size="30" className="ml-2" />
      <p className="text-md font-semibold mx-1 truncate">{topic}</p>
    </div>
  );
}

export default Folder;
