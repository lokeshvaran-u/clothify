import Sidebar from "./Sidebar";
import ProfileMenu from "./ProfileMenu";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-area">

        <header className="topbar">
          <ProfileMenu />
        </header>

        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;