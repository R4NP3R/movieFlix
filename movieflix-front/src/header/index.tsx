export const Header = () => {
  return (
    <header className="w-full fixed mt-">
      <div className="flex justify-between items-center my-container">
        <h1 className="text-red-700 text-4xl font-bold">MovieFlix</h1>
        <nav className="py-6 px-8 bg-slate-800 rounded-b-4xl">
          <ul className="flex gap-8 text-white">
            <li>
              <a href="" className="">Movies</a>
            </li>
            <li>
              <a href="" className=" ">Movies</a>
            </li>
            <li>
              <a href="" className=" ">Movies</a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-slate-200 p-2 ">
            <img className="w-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png" alt="" />
          </div>
          <span className="text-white">\/</span>
        </div>
      </div>
    </header>
  );
};
