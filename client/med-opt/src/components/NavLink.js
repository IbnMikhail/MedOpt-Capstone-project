// import React from "react";
import { Link } from "react-router-dom";

function NavLink({to,link}) {
  return (
    <>
          <Link to={to} className="hover:text-black font-extrabold">{link}</Link>
    </>
  );
}

export default NavLink;
