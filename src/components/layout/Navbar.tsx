function Navbar() {
  return (
    <nav className=" fixed right-0 left-70 top-0 z-50  bg-slate-900">
      <div className="px-2 py-3 text-white flex gap-2 align-middle">
        <h2 className="text-2xl font-bold">Lorricards</h2>
        <img
          src="/public/images/LorricardsLogo.png"
          alt="Lorricards Logo"
          className="w-10 rounded"
        />
      </div>
    </nav>
  );
}
export default Navbar;
