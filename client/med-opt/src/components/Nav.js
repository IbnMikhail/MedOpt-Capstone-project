import logo from "../assets/images/opt-bg.png";
import { Link, useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import { useEffect, useState } from "react";

function NavBar() {
  let [online, setOnline] = useState(false);
  let [adminStatus, setAdminStatus] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    checkStatus();
    admin();
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

  let admin = () => {
    if (localStorage.getItem("medOpt") === "1") {
      setAdminStatus(true);
    } else {
      setAdminStatus(false);
    }
  };
  const logoutUser = async () => {
    const shouldLogout = window.confirm("Are you sure you want to logout?");
    if(shouldLogout) {
    const apiUrl = "http://localhost:8000/api/logout";
    let userId = localStorage.getItem("medOpt");
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    await response.json();
      localStorage.removeItem("medOpt");
      navigate("/");
      // console.log("Logout successful:", data.message);
    } catch (error) {
      console.error("Error during logout:", error.message);
    }}
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
              {
                adminStatus? <NavLink link="Admin" to="/add" />: <div style={{display:"none"}}></div>
              }
              <button
                className="hover:text-black font-extrabold"
                onClick={() => logoutUser()}
              >
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
