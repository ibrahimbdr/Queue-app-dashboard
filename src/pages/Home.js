import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import { useNavigate } from "react-router-dom";
import loginContext from "../context/LoginContext";
import sidebarContext from "../context/SidebarContext";
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { IoTodaySharp } from "react-icons/io5";
import axiosInstance from "../axios config/axiosInstance";

const Home = () => {
  const { state, setSidebarExtend } = React.useContext(sidebarContext);
  const login = React.useContext(loginContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (login.state.isLoggged === false) navigate("/login");
  }, []);
  let token = localStorage.getItem("token");
  const [customers, setCustomers] = React.useState(0);
  const [waitingAppointments, setWaitingAppointments] = React.useState(0);
  const [finishedAppointments, setFinishedAppointments] = React.useState(0);
  const [todayAppointment, setTodayAppointment] = React.useState(0);
  useEffect(() => {
    if (login.state.accountType === "admin") {
      axiosInstance
        .get(`/admin/customer`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCustomers(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
      axiosInstance
        .get(`/admin/appointment`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          let wApp = res.data.filter((data) => {
            return data.status === "Waiting";
          });
          setWaitingAppointments(wApp.length);
          let fApp = res.data.filter((data) => {
            return data.status === "Finished";
          });
          setFinishedAppointments(fApp.length);

          setTodayAppointment(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (login.state.accountType === "manager") {
      axiosInstance
        .get(`/manager/customer`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCustomers(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
      axiosInstance
        .get(`/manager/appointment`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          let wApp = res.data.filter((data) => {
            return data.status === "Waiting";
          });
          setWaitingAppointments(wApp.length);
          let fApp = res.data.filter((data) => {
            return data.status === "Finished";
          });
          setFinishedAppointments(fApp.length);

          setTodayAppointment(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  if (login.state.isLoggged === true) {
    return (
      <div className="grid grid-cols-1 gap-3 w-full py-3 overflow-auto mt-8">
        <div
          className={`mx-auto flex flex-col flex-wrap justify-center items-center text-lg font-bold rounded-md shadow-xl w-80 h-40 ${
            state.colorMode === "dark"
              ? "bg-gray-900 text-cyan-700"
              : "bg-gray-50 text-gray-900"
          }`}
        >
          <FaUsers size={40} className="text-yellow-400" />
          <p className="">Number Of Customers</p>
          <p className="">{customers}</p>
        </div>
        <div
          className={`mx-auto flex flex-col flex-wrap justify-center items-center text-lg font-bold rounded-md shadow-xl w-80 h-40 ${
            state.colorMode === "dark"
              ? "bg-gray-900 text-cyan-700"
              : "bg-gray-50 text-gray-900"
          }`}
        >
          <FaUserCheck size={40} className="text-red-400" />
          <p className="">Next Appointments</p>
          <p className="">{waitingAppointments}</p>
        </div>
        <div
          className={`mx-auto flex flex-col flex-wrap justify-center items-center text-lg font-bold rounded-md shadow-xl w-80 h-40 ${
            state.colorMode === "dark"
              ? "bg-gray-900 text-cyan-700"
              : "bg-gray-50 text-gray-900"
          }`}
        >
          <MdDone size={40} className="text-green-400" />
          <p className="">Finished Appointments</p>
          <p className="">{finishedAppointments}</p>
        </div>
        <div
          className={`mx-auto flex flex-col flex-wrap justify-center items-center text-lg font-bold rounded-md shadow-xl w-80 h-40 ${
            state.colorMode === "dark"
              ? "bg-gray-900 text-cyan-700"
              : "bg-gray-50 text-gray-900"
          }`}
        >
          <IoTodaySharp size={40} className="text-blue-400" />
          <p className="">Today's Appointments</p>
          <p className="">{todayAppointment}</p>
        </div>
      </div>
    );
  }
};

export default Home;
