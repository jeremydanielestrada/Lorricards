function PasteNoteInput() {
  return (
    <form>
      <textarea
        className="input-base m-0 resize-none "
        placeholder="Paste your notes.."
      ></textarea>
      <button className="base-btn mt-1">Save</button>
    </form>
  );
}

export default PasteNoteInput;
