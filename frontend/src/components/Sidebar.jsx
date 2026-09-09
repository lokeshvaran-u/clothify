import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        Clothify
      </div>

      <nav className="sidebar-nav">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/low-stock">
          Low Stock
        </Link>

        <Link to="/activity-logs">
          Activity Logs
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;