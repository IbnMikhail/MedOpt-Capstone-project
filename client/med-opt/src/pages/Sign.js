import img from "../assets/images/opt-bg.png";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
      <div>
        {/* <NavBar /> */}
        <div className="bg-white h-80 p-8">
          <div className="flex flex-col items-center justify-center h-screen">
            <Link to="/">
              <img className="h-32" src={img} alt="logo" />
            </Link>
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
            />
            <br /> <br />{" "}
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
            />
            <br /> <br />
            <input
              type="email"
              placeholder="Email"
              className="w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
            />
            <br /> <br />
            <input
              type="password"
              placeholder="Password"
              className="w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
            />
            <br /> <br />
            <button className="w-1/4 border-2 rounded-3xl p-3 bg-#43ce3f text-white">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
