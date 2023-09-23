import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./assets/css/style.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/Sign";
import DisplayPage from "./pages/Search";
import Profile from "./pages/Profile";

function App() {
  const UploadRouteGuard = ({ element }) => {
    if (
      !localStorage.getItem("medOpt") ||
      localStorage.getItem("medOpt") === 'undefined'
    ) {
      return <Navigate to="/" />;
    }
    return element;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/search"
          element={<UploadRouteGuard element={<DisplayPage />} />}
        />
          <Route
          path="/profile"
          element={<UploadRouteGuard element={<Profile />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
