import React from "react";
import logo from "../assets/images/opt-bg.png";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";

function NavBar() {
  return (
    <>
      <div className="flex bg-#43ce3f shadow-xl shadow-black-900 justify-between items-center">
        <div className="w-12/12 lg:w-1/12  h-20 cursor-pointer">
          <Link to="/">
          <img            
            src={logo}
            alt="medOpt"
          />
          </Link>
        </div>

        <div className="text-white flex justify-between w-12/12 lg:w-3/12 m-5">
          <NavLink link="About" to="/about"/>
          <NavLink link="Sign Up" to="/sign-up"/>
          <NavLink link="Login" to="/login"/>
        </div>
      </div>
    </>
  );
}

export default NavBar;
