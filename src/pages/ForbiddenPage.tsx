function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">403</h1>
      <p className="text-xl text-gray-600">
        You do not have permission to access this page.
      </p>
    </div>
  );
}
export default ForbiddenPage;
