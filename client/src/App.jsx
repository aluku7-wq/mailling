import { Routes, Route, NavLink } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword";
import Resetpassword from "./pages/resetpassword/Resetpassword";
import Support from "./pages/support/Support";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <NavLink to="/">home</NavLink>
        <NavLink to="/register">register</NavLink>
        <NavLink to="/login">login</NavLink>
        <NavLink to="/support">support</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/reset-password/:token" element={<Resetpassword />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </div>
  );
};

export default App;
