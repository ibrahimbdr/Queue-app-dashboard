import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { BsArrowRight, BsArrowLeft, BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import sidebarContext from "../context/SidebarContext";

const Sidebar = () => {
  const { state, setSidebarExtend } = React.useContext(sidebarContext);

  return (
    <div
      className={`self-start sticky top-0 ${
        !state.sidebarExtend ? "col-span-1" : "col-span-2  "
      } h-screen hidden md:block ${
        state.sidebarExtend ? "w-[200px]" : "w-fit"
      } bg-gray-50 text-black font-semibold`}
    >
      <div
        className={` p-3 mb-6 flex ${
          state.sidebarExtend ? "justify-between" : "justify-center"
        } items-center`}
      >
        {state.sidebarExtend && (
          <h1 className="text-gray-800 font-bold text-xl">My Shop</h1>
        )}
        {state.sidebarExtend ? (
          <button
            onClick={() => setSidebarExtend(false)}
            className="rounded-full p-3 hover:bg-gray-300 transition-all"
          >
            <BsArrowLeft className="text-gray-800 hover:text-white" size={30} />
          </button>
        ) : (
          <button
            onClick={() => setSidebarExtend(true)}
            className="rounded-full p-3 hover:bg-gray-300 transition-all"
          >
            <BsArrowRight
              className="text-gray-800 hover:text-white"
              size={30}
            />
          </button>
        )}
      </div>
      <ul className="h-full">
        <Link to="/">
          <li
            className={`py-6 pl-3 flex items-center hover:bg-gray-300 shadow-inner ${
              !state.sidebarExtend && "justify-center"
            }`}
            // style={{borderTopLeftRadius: '50%',borderBottomLeftRadius: '50%', borderTopRightRadius: '-50px', borderBottomRightRadius: '-50px'}}
          >
            {state.sidebarExtend ? (
              <>
                <MdOutlineDashboardCustomize className="mr-1" /> Dashboard
              </>
            ) : (
              <MdOutlineDashboardCustomize size={40} />
            )}
          </li>
        </Link>
        <Link to="/appointments">
          <li
            className={`py-6 pl-3 flex items-center hover:bg-gray-300 shadow-inner ${
              !state.sidebarExtend && "justify-center"
            }`}
          >
            {state.sidebarExtend ? (
              <>
                <GoListOrdered className="mr-1" /> Customers Queue
              </>
            ) : (
              <GoListOrdered size={40} />
            )}
          </li>
        </Link>
        <Link to="/customers">
          <li
            className={`py-6 pl-3 flex items-center hover:bg-gray-300 shadow-inner ${
              !state.sidebarExtend && "justify-center"
            }`}
          >
            {state.sidebarExtend ? (
              <>
                <FaUsers className="mr-1" />
                All Customers
              </>
            ) : (
              <FaUsers size={40} />
            )}
          </li>
        </Link>
        <Link to="#">
          <li
            className={`py-6 pl-3 flex items-center hover:bg-gray-300 shadow-inner ${
              !state.sidebarExtend && "justify-center"
            }`}
          >
            {state.sidebarExtend ? (
              <>
                <BsFillGearFill className="mr-1" /> Settings
              </>
            ) : (
              <BsFillGearFill size={40} />
            )}
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
