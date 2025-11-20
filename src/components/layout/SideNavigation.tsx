function SideNavigation({ showNav }: { showNav: boolean }) {
  return (
    <>
      {showNav && (
        <div className="fixed top-0 bottom-0 z-50 bg-slate-800 border-2 border-slate-700 w-70  transition-transform  duration-300 ease-in-out ">
          <div className="px-2 py-3 text-white flex gap-2 align-middle justify-center">
            <h2 className="text-2xl font-bold">Lorricards</h2>
            <img
              src="/public/images/LorricardsLogo.png"
              alt="Lorricards Logo"
              className="w-10 rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SideNavigation;
