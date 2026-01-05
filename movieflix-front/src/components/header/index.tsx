import { ChevronDown, ChevronUp, User2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export const Header = () => {
  const [handleUserMenu, setHandleUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  function closeUserMenu() {
    setHandleUserMenu(false)
  }

  useEffect(() => {
    function clickOutsideUserMenu(e: MouseEvent) {
      if(userMenuRef.current && !userMenuRef.current.contains(e.target as Node)){
        closeUserMenu()
      }
    }
    document.addEventListener("click", clickOutsideUserMenu)

    return () => {
      document.removeEventListener("click", clickOutsideUserMenu)
    }

  }, [])


  return (
    <header className="w-full fixed mt-">
      <div className="flex justify-between items-center my-container">
        <Link to="" className="text-red-700 text-4xl font-bold">MovieFlix</Link>
        <nav className="py-6 px-8 bg-slate-800 rounded-b-4xl">
          <ul className="flex gap-8 text-white">
            <li>
              <a href="" className="">
                Movies
              </a>
            </li>
            <li>
              <a href="" className=" ">
                Movies
              </a>
            </li>
            <li>
              <a href="" className=" ">
                Movies
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4 relative">
          <div className="rounded-full bg-slate-200 p-2 ">
            <User2Icon className="w-8 h-8"/>
          </div>
          <button
            id="userMenu"
            className="text-white cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setHandleUserMenu(!handleUserMenu);
            }}
          >
            {handleUserMenu ? <ChevronUp /> : <ChevronDown />}
          </button>
          {handleUserMenu && (
            <div ref={userMenuRef} className="absolute top-15 right-0 bg-slate-600 rounded-2xl pb-4 ">
              <h3 className="text-white font-bold border-b border-slate-400 text-center text-lg py-2">Create</h3>
              <div className="px-8 pt-2">
                <ul className="">
                <li className="font-semibold text-lg text-slate-200">
                  <Link to="createMovie" onClick={closeUserMenu}>Movies</Link>
                </li>
                <li className="font-semibold text-lg text-slate-200">
                  <a href="">Categories</a>
                </li>
                <li className="font-semibold text-lg text-slate-200">
                  <a href="">Streaming</a>
                </li>
              </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
