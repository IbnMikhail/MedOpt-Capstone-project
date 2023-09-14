import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./assets/css/style.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/Sign";
import DisplayPage from "./pages/Search";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<DisplayPage />} />
        </Routes>
      </Router>
  );
}

export default App;
