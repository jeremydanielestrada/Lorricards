import { useParams, useLocation } from "react-router";

function ViewFolder() {
  const location = useLocation();
  const { title } = useParams();
  const folderData = location.state?.folderData;

  return (
    <div className="text-center">
      <h1>{folderData?.title || title}</h1>
      <p>ID: {folderData?.id}</p>
      {/* Access all folder properties */}
    </div>
  );
}

export default ViewFolder;
