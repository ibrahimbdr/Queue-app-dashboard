import React from "react";
import { MdLogout, MdOutlineDashboardCustomize } from "react-icons/md";
import { GrHistory } from "react-icons/gr";
import { GoListOrdered } from "react-icons/go";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import loginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const Bottombar = () => {
  const login = React.useContext(loginContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    login.setIsLogged(false);
    navigate("/login");
  };
  return (
    <div className="md:hidden fixed bottom-0 w-full bg-gray-50 text-black font-semibold px-6">
      <ul className="w-full flex justify-between">
        <Link to="/">
          <li className="p-3 h-full rounded-full flex items-center hover:bg-gray-300 justify-center hover:shadow-inner">
            <MdOutlineDashboardCustomize size={30} />
          </li>
        </Link>
        <Link to="/appointments">
          <li className="p-3 h-full rounded-full flex items-center hover:bg-gray-300 justify-center hover:shadow-inner">
            <GoListOrdered size={30} />
          </li>
        </Link>
        <Link to="/appointments-f">
          <li className="p-3 h-full rounded-full flex items-center hover:bg-gray-300 justify-center hover:shadow-inner">
            <GrHistory size={30} />
          </li>
        </Link>
        <Link to="/customers">
          <li className="p-3 h-full rounded-full flex items-center hover:bg-gray-300 justify-center hover:shadow-inner">
            <FaUsers size={30} />
          </li>
        </Link>
        <Link to="/customers-n">
          <li className="p-3 h-full rounded-full flex items-center hover:bg-gray-300 justify-center hover:shadow-inner">
            <FaUsersSlash size={30} />
          </li>
        </Link>
        <Link to="/settings">
          <li className="p-3 h-full rounded-full flex items-center hover:bg-gray-300 justify-center hover:shadow-inner">
            <BsFillGearFill size={30} />
          </li>
        </Link>
        <button onClick={handleLogout}>
          <li className="p-3 h-full rounded-full flex items-center hover:bg-gray-300 justify-center hover:shadow-inner">
            <MdLogout size={30} />
          </li>
        </button>
      </ul>
    </div>
  );
};

export default Bottombar;
