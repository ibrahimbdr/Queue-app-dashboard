import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GrHistory } from "react-icons/gr";
import { GoListOrdered } from "react-icons/go";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Bottombar = () => {
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
        <Link to="#">
          <li className="p-3 h-full rounded-full flex items-center hover:bg-gray-300 justify-center hover:shadow-inner">
            <BsFillGearFill size={30} />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Bottombar;
