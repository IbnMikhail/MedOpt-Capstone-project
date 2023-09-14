import React from "react";
import { Link } from "react-router-dom";

function NavLink(props) {
  return (
    <>
          <Link to={props.to} className="hover:text-black font-extrabold">{props.link}</Link>
    </>
  );
}

export default NavLink;
