interface ConfirmDialog {
  open: boolean;
  text: string;
  confirm: () => void;
  onClose: () => void;
}

function ConfirmDialog({ text, open, onClose, confirm }: ConfirmDialog) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      } `}
    >
      <div
        onClick={(e) => e.stopPropagation()} //Avoid modal being close when click
        className={`card shadow transition-all md:ml-50 ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <p className="text-2xl text-center font-semibold">{text}</p>
        <div className="my-2 flex items-center space-x-4">
          <button
            className="base-btn bg-blue-600 hover:bg-blue-700"
            onClick={confirm}
          >
            Confirm
          </button>
          <button
            className="base-btn bg-red-600 hover:bg-red-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
