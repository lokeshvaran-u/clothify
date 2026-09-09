import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import "./ProfileMenu.css";

function ProfileMenu() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const userRole = getUserRole() || "User";


  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login", {
      replace: true
    });

  };


  return (
    <div className="profile-menu">

      <button
        className="profile-button"
        onClick={() => setOpen(!open)}
      >

        <div className="profile-avatar">
          {userRole.charAt(0)}
        </div>

        <div className="profile-info">

          <span className="profile-name">
            {userRole}
          </span>

          <span className="profile-role">
            Account
          </span>

        </div>

        <span className="profile-arrow">
          ▼
        </span>

      </button>


      {open && (

        <div className="profile-dropdown">

          <div className="dropdown-role">

            Logged in as

            <strong>
              {userRole}
            </strong>

          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      )}

    </div>
  );
}

export default ProfileMenu;