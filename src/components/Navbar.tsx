import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar: React.FC = ()=>{

    return (
        <nav className="fixed w-full flex items-center justify-center">
            <ul className="rounded-4xl flex justify-center items-center mt-5">
                <Link to={'/'}>
                    <li className="text-2xl py-2 px-5 cursor-pointer group relative flex justify-center">
                            <FaHome/>
                            <div className="absolute bottom-1 w-0 transition-all duration-500 group-hover:w-2/3 h-0.5 bg-purple-600"></div>
                    </li>
                </Link>
                <li className="py-2 px-5 cursor-pointer group relative flex justify-center">
                    <span>Historical</span>
                    <div className="absolute bottom-1 w-0 transition-all duration-500 group-hover:w-2/3 h-0.5 bg-purple-600"></div>
                </li>
                <li className="py-2 px-5 cursor-pointer group relative flex justify-center">
                    <span>Made by</span>
                    <div className="absolute bottom-1 w-0 transition-all duration-500 group-hover:w-2/3 h-0.5 bg-purple-600"></div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;