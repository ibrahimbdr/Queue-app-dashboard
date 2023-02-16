import React, { useEffect } from "react";
import { BsCheck2Square } from "react-icons/bs";
import sidebarContext from "../context/SidebarContext";
import axiosInstance from "../axios config/axiosInstance";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import loginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const { state, setSidebarExtend } = React.useContext(sidebarContext);
  const value = React.useContext(sidebarContext);
  const [appointments, setAppointments] = React.useState([]);
  let token = localStorage.getItem("token");
  const login = React.useContext(loginContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get(`/admin/appointment`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log([...appointments, ...res.data]);
        setAppointments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    if (login.state.isLoggged === false) navigate("/login");
  }, []);
  if (login.state.isLoggged === true) {
    return (
      <>
        <Sidebar
          sidebarExtend={state.sidebarExtend}
          setSidebarExtend={setSidebarExtend}
        />
        <Bottombar />
        <div
          className={`p-6 mb-4 ${
            !value.state.sidebarExtend ? "col-span-11" : "col-span-10"
          } ml-5`}
        >
          <h1 className="text-2xl font-bold mb-14">Appointments</h1>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Appointment Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Customer
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-gray-500 uppercase "
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-gray-500 uppercase "
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.map((appointment, index) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              <span>{"0".repeat(index.length)}</span>
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {appointment.number}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {appointment.customer.name}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium rounded whitespace-nowrap">
                              <p className="bg-red-500 text-sm text-white text-center rounded font-semibold p-1">
                                {appointment.status}
                              </p>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium rounded whitespace-nowrap">
                              <button className="text-green-500 hover:text-green-700">
                                <BsCheck2Square
                                  className="hover:text-green-400"
                                  size={20}
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Appointments;
