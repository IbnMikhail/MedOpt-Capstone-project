import { useState } from "react";
import img from "../assets/images/opt-bg.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let login = async () => {
    setLoading(true);

    const isMissingFields = password.trim() === "" || email.trim() === "";

    if (isMissingFields) {
      setMsg("Please fill missing field(s)!!!");
      const t1 = setTimeout(() => {
        setMsg("");
        setLoading(false);
      }, 3000);
      return () => clearTimeout(t1);
    }

    const url = `https://medopt.onrender.com/api/login`;
    const data = { email, password };

    try {
      const response = await fetch(url, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setMsg("Login Successful!");
        let res = await response.json();
        localStorage.setItem("medOpt", res.user.id);
        const t1 = setTimeout(() => {
          setMsg("");
          setLoading(false);
        }, 3000);
        setEmail("");
        setPassword("");
        navigate("/search");
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
        <div className="bg-white">
          <div className="flex flex-col items-center justify-center h-screen">
            <Link to="/">
              <img className="h-32" src={img} alt="logo" />
            </Link>
            <h1 className="font-bold text-3xl ">LOGIN</h1>
            <p className="text-red-600 mb-3">{msg}</p>
            <input
              type="email"
              placeholder="Email"
              className="w-80 md:w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br /> <br />
            <input
              type="password"
              placeholder="Password"
              className="w-80 md:w-1/2 border-2 rounded-3xl p-3 border-#060642 border-dashed"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /> <br />
            <button
              className="w-80 lg:w-1/4 border-2 rounded-3xl p-3 bg-#43ce3f text-white"
              onClick={() => login()}
            >
              {loading ? "Loading ..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
