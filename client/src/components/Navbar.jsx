import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">

      <div className="navbar-title">
        Examination Management System
      </div>

      <div className="navbar-right">

        <div className="user-info">
          <FaUserCircle size={25} />
          <span>{user?.name || user?.email || "User"}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;