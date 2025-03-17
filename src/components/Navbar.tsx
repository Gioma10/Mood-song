import React from "react";

import { FaHome } from "react-icons/fa";

const Navbar: React.FC = ()=>{
    return (
        <nav className="fixed w-full flex items-center justify-center">
            <ul className="border rounded-4xl flex justify-center items-center mt-5">
                <li className="py-1 px-4"><FaHome /></li>
                <li className="py-1 px-4"> Made by</li>
            </ul>
        </nav>
    )
}

export default Navbar;