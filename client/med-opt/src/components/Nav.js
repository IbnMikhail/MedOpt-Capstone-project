import logo from "../assets/images/opt-bg.png";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { useEffect, useState } from "react";

function NavBar() {
  let [online, setOnline] = useState(false);
  useEffect(() => {
    checkStatus();
  }, [online]);
  let checkStatus = () => {
    if (
      localStorage.getItem("medOpt") &&
      localStorage.getItem("medOpt") !== "undefined"
    ) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  };
  return (
    <>
      <div className="flex bg-#43ce3f shadow-xl shadow-black-900 justify-between items-center">
        <div className="w-3/12 md:w-2/12 lg:w-1/12  h-20 cursor-pointer">
          <Link to="/">
            <img src={logo} alt="medOpt" className="w-12/12" />
          </Link>
        </div>

        <div className="text-white flex justify-between w-8/12 lg:w-5/12 m-5">
          <NavLink link="About" to="/about" />
          {online ? (
            <>
              <NavLink link="Search" to="/search" />
              <NavLink link="Profile" to="/profile" />
              <button className="hover:text-black font-extrabold">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink link="Sign Up" to="/sign-up" />
              <NavLink link="Login" to="/login" />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
