import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";


const Layout = () => {

  return (
    <div 
      className="min-h-screen bg-gradient-to-b w-full from-gray-900  to-slate-500"
      style={{
        backgroundSize: "2000% 2000%",
        animation: "bg-pan-top 7s infinite",
        minHeight: '100%'
      }}>

        {/* Navbar */}
        <Navbar/>
        <main className="h-screen flex justify-center items-center">
          {/* Main */}
          <Outlet />
        </main>
    </div>
  );
};

export default Layout;
