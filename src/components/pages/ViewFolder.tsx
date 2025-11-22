import { useParams, useLocation } from "react-router";

function ViewFolder() {
  const location = useLocation();
  const { title } = useParams();
  const folderData = location.state?.folderData;

  return (
    <div className="mx-auto w-80 sm:w-100  md:w-180">
      <h1 className="text-center  text-3xl sm:text-5xl md:text-7xl">
        {folderData?.title || title}
      </h1>

      <div className="mt-5">
        <form>
          <textarea
            className="input-base m-0 resize-none "
            placeholder="Paste your notes.."
          ></textarea>
          <button className="base-btn mt-1">Save</button>
        </form>
      </div>
    </div>
  );
}

export default ViewFolder;
