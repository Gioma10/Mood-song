import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const Layout = () => {

  return (
    <div 
      className="min-h-screen w-full"
      style={{
        background: "black",
        backgroundSize: "200% 200%",
        animation: "subtle-move 6s ease-in-out infinite",
        minHeight: "100%",
      }}
      >
            {/* Navbar */}
            <Navbar/>
            <main className="min-h-screen flex justify-center items-center">
              {/* Main */}
              <Outlet />
            </main>
    </div>
  );
};

export default Layout;
