import { useState } from "react";
import img from "../assets/images/opt-bg.png";
import { Link } from "react-router-dom";

function SignUp() {
  let [firstname, setFirstName] = useState("");
  let [lastname, setLastName] = useState("");
  let [med_history, setMedHistory] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState("");
  let [loading, setLoading] = useState(false);

  let register = async () => {
    setLoading(true);

    const isMissingFields =
      password.trim() === "" ||
      email.trim() === "" ||
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      med_history.trim() === "";

    if (isMissingFields) {
      setMsg("Please fill missing field(s)!!!");
      const t1 = setTimeout(() => {
        setMsg("");
        setLoading(false);
      }, 3000);
      return () => clearTimeout(t1);
    }

    const url = `https://medopt.onrender.com/api/user`;
    const data = { email, password, firstname, lastname, med_history };

    try {
      const response = await fetch(url, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setMsg("Registration Successful!");
        await response.json();
        const t1 = setTimeout(() => {
          setMsg("");
          setLoading(false);
        }, 3000);
        setFirstName("");
        setLastName("");
        setMedHistory("");
        setEmail("");
        setPassword("");
        return () => clearTimeout(t1);
      } else {
        const err = await response.json();
        setMsg(err.error);
        const t1 = setTimeout(() => {
          setMsg("");
          setLoading(false);
        }, 3000);
        return () => clearTimeout(t1);
      }
    } catch (error) {
      setMsg(error.message);
      const t1 = setTimeout(() => {
        setMsg("");
        setLoading(false);
      }, 3000);
      return () => clearTimeout(t1);
    }
  };

  return (
    <>
      <div>
        {/* <NavBar /> */}
        <div className="bg-white h-80 lg:p-8">
          <div className="flex flex-col items-center justify-center h-screen">
            <Link to="/">
              <img className="h-32" src={img} alt="logo" />
            </Link>
            <h1 className="font-bold text-2xl ">SIGN UP</h1>
            <p className="text-red-600 mb-3">{msg}</p>
            <input
              type="text"
              placeholder="First Name"
              className="w-80 md:w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br /> 
            <input
              type="text"
              placeholder="Last Name"
              className="w-80 md:w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br /> 
            <input
              type="email"
              placeholder="Email"
              className="w-80 md:w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br /> 
            <input
              type="password"
              placeholder="Password"
              className="w-80 md:w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /> 
            <input
              type="text"
              placeholder="Short Medical History"
              className="w-80 md:w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
              value={med_history}
              onChange={(e) => setMedHistory(e.target.value)}
            />
            <br /> 
            <button className="w-80 lg:w-1/4 border-2 rounded-3xl p-3 bg-#43ce3f text-white"  onClick={() => register()}>
            {loading ? "Loading ..." : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
