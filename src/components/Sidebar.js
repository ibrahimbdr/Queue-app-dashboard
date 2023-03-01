import React from "react";
import { MdOutlineDashboardCustomize, MdLogout } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { GrHistory } from "react-icons/gr";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import {
  BsArrowRight,
  BsArrowLeft,
  BsFillGearFill,
  BsClockHistory,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import sidebarContext from "../context/SidebarContext";
import loginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import titleContext from "../context/TitleContext";
import axiosInstance from "../axios config/axiosInstance";

const Sidebar = () => {
  const { state, setSidebarExtend } = React.useContext(sidebarContext);
  const login = React.useContext(loginContext);
  const shopTitle = React.useContext(titleContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    login.setIsLogged(false);
    navigate("/login");
  };

  React.useEffect(() => {
    if (login.state.accountType === "admin") {
      axiosInstance.get("/admin/shop/").then((res) => {
        if (res.data[0] === null) {
          axiosInstance.post(
            "/admin/shop/",
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          );
        }
        console.log(res.data[0].shopName);
        shopTitle.setTitle({
          id: res.data[0]["_id"],
          shopName: res.data[0].shopName,
        });
      });
    }
  }, []);
  return (
    <div
      className={`self-start shadow-lg fixed top-0 h-screen overflow-auto hidden md:block ${
        state.sidebarExtend ? "w-[220px]" : "w-fit"
      } ${state.colorMode === "dark" && "bg-gray-900 text-cyan-700"} ${
        state.colorMode === "light" && "bg-gray-50 text-black"
      } font-semibold`}
    >
      <div
        className={` p-3 mb-6 flex ${
          state.sidebarExtend ? "justify-between" : "justify-center"
        } items-center`}
      >
        {state.sidebarExtend && (
          <h1
            className={`font-bold text-xl ${
              state.colorMode === "dark" && "text-gray-100"
            } ${state.colorMode === "light" && "text-gray-800"}`}
          >
            {shopTitle.state.title.shopName}
          </h1>
        )}
        {state.sidebarExtend ? (
          <button
            onClick={() => setSidebarExtend(false)}
            className={`rounded-full p-3 hover:bg-gray-300 transition-all ${
              state.colorMode === "dark" && "text-gray-100"
            } ${state.colorMode === "light" && "text-gray-800"}`}
          >
            <BsArrowLeft className=" hover:text-white" size={30} />
          </button>
        ) : (
          <button
            onClick={() => setSidebarExtend(true)}
            className={`rounded-full p-3 hover:bg-gray-300 transition-all ${
              state.colorMode === "dark" && "text-gray-100"
            } ${state.colorMode === "light" && "text-gray-800"}`}
          >
            <BsArrowRight className=" hover:text-white" size={30} />
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
        <Link to="/appointments-f">
          <li
            className={`py-6 pl-3 flex items-center hover:bg-gray-300 shadow-inner ${
              !state.sidebarExtend && "justify-center"
            }`}
          >
            {state.sidebarExtend ? (
              <>
                <BsClockHistory className="mr-1" /> Queue History
              </>
            ) : (
              <BsClockHistory size={40} />
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
                Active Customers
              </>
            ) : (
              <FaUsers size={40} />
            )}
          </li>
        </Link>
        <Link to="/customers-n">
          <li
            className={`py-6 pl-3 flex items-center hover:bg-gray-300 shadow-inner ${
              !state.sidebarExtend && "justify-center"
            }`}
          >
            {state.sidebarExtend ? (
              <>
                <FaUsersSlash className="mr-1" />
                NonActive Customers
              </>
            ) : (
              <FaUsersSlash size={40} />
            )}
          </li>
        </Link>
        <Link to="/settings">
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
        <button onClick={handleLogout} className="mt-auto w-full">
          <li
            className={`py-6 pl-3 flex items-center hover:bg-gray-300 shadow-inner ${
              !state.sidebarExtend && "justify-center"
            }`}
          >
            {state.sidebarExtend ? (
              <>
                <MdLogout className="mr-1" /> Logout
              </>
            ) : (
              <MdLogout size={40} />
            )}
          </li>
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
