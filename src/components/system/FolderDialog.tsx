interface FolderDialog {
  open: boolean;
  onClose: () => void;
}

function FolderDialog({ open, onClose }: FolderDialog) {
  return (
    <>
      {/* BackDrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          open ? "visible bg-black/20" : "invisible"
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()} //Avoid modal being close when click
          className={`card shadow transition-all ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <form>
            <label htmlFor="folder name" className="text-lg font-extrabold">
              Folder Name
            </label>
            <input type="text" name="folder name" className="input-base" />
            <button type="submit" className="base-btn">
              Create Folder
            </button>
          </form>
          <div className="my-2">
            <button
              className="base-btn bg-red-600 hover:bg-red-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FolderDialog;
