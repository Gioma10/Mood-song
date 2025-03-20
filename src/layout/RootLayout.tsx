import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">

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
