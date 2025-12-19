function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-slate-950/98 backdrop-blur-md shadow-xl border-b border-slate-600/50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-white flex gap-3 items-center justify-between">
        <div className="flex space-x-2 items-center">
          <img
            src="/public/images/LorricardsLogo.png"
            alt="Lorricards Logo"
            className="w-10 h-10 rounded object-cover"
          />
          <h2 className="text-2xl font-bold">Lorricards</h2>
        </div>
        <div>
          <h1>v1</h1>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
