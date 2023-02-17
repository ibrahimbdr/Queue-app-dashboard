import React, { useEffect, useLayoutEffect, useRef, useMemo } from "react";
import { BsCheck2Square } from "react-icons/bs";
import sidebarContext from "../context/SidebarContext";
import axiosInstance from "../axios config/axiosInstance";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import loginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const PrevAppointments = () => {
  const { state, setSidebarExtend } = React.useContext(sidebarContext);
  const value = React.useContext(sidebarContext);
  const [appointments, setAppointments] = React.useState([]);
  let token = localStorage.getItem("token");
  const login = React.useContext(loginContext);
  const navigate = useNavigate();

  const [page, setPage] = React.useState(1);
  // let appointmentsPages = useRef([]);

  // function sliceIntoChunks(arr, chunkSize) {
  //   const res = [];
  //   for (let i = 0; i < arr.length; i += chunkSize) {
  //     const chunk = arr.slice(i, i + chunkSize);
  //     res.push(chunk);
  //   }
  //   return res;
  // }

  const handleCompleteApp = (id) => {
    console.log(id);

    axiosInstance
      .patch(
        `/admin/appointment/${id}`,
        JSON.stringify({ status: "Finished" }),
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axiosInstance
      .get(`/admin/appointment`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log([...appointments, ...res.data]);
        console.log(res.data);
        let finishedApp = res.data.filter((data) => {
          return data.status === "Finished";
        });
        setAppointments(finishedApp);
        // appointmentsPages.current = sliceIntoChunks(appointments, 10);
        // console.log("Here is appoinments array");
        console.log(appointments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useMemo(() => {
  //   appointmentsPages.current = sliceIntoChunks(appointments, 10);
  //   console.log(appointmentsPages.current);
  // }, [appointments, appointmentsPages]);

  React.useEffect(() => {
    if (login.state.isLoggged === false) navigate("/login");
  }, []);
  if (login.state.isLoggged === true) {
    return (
      <div className="flex justify-between ">
        <Sidebar
          sidebarExtend={state.sidebarExtend}
          setSidebarExtend={setSidebarExtend}
        />
        <Bottombar />
        <div className={`p-6 mb-4 w-full`}>
          <h1 className="text-2xl font-bold mb-14">History</h1>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {/* <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-bold text-gray-500 uppercase "
                        >
                          #
                        </th> */}
                        <th
                          scope="col"
                          className="px-2 py-3 text-start text-xs font-bold text-gray-500 uppercase "
                        >
                          Queue number
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-start text-xs font-bold text-gray-500 uppercase "
                        >
                          Customer
                        </th>
                        <th
                          scope="col"
                          className="hidden md:table-cell px-2 py-3 text-start text-xs font-bold text-gray-500 uppercase "
                        >
                          Reservation Date
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-start text-xs font-bold text-gray-500 uppercase "
                        >
                          Reservation Time
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-start text-xs font-bold text-gray-500 uppercase "
                        >
                          Status
                        </th>
                        {/* <th
                          scope="col"
                          className="px-2 py-3 text-start text-xs font-bold text-gray-500 uppercase "
                        >
                          Action
                        </th> */}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments === null || appointments.length === 0 ? (
                        <tr key="9999">
                          <td
                            className="text-center font-semibold text-lg"
                            align="center"
                            colspan="4"
                          >
                            There are no Finished Appointments
                          </td>
                        </tr>
                      ) : (
                        appointments.map((appointment, index) => {
                          return (
                            <tr key={index}>
                              {/* <td className="px-6 py-4 text-start text-sm font-medium text-gray-800 whitespace-nowrap">
                              <span>{"0".repeat(index.length)}</span>
                              {index + 1}
                            </td> */}
                              <td className="px-2 py-4 text-start text-sm text-gray-800 whitespace-nowrap">
                                {appointment.number}
                              </td>
                              <td className="px-2 py-4 text-start text-sm text-gray-800 whitespace-nowrap">
                                {appointment.customer.name}
                              </td>
                              <td className="hidden md:table-cell px-2 py-4 text-start text-sm text-gray-800 whitespace-nowrap">
                                {new Intl.DateTimeFormat(["ban", "id"]).format(
                                  new Date(appointment.createdAt)
                                )}
                              </td>
                              <td className="px-2 py-4 text-start text-sm text-gray-800 whitespace-nowrap">
                                {new Intl.DateTimeFormat("en-GB", {
                                  timeStyle: "short",
                                }).format(new Date(appointment.createdAt))}
                              </td>
                              <td className="px-2 py-4 text-start text-sm font-medium rounded whitespace-nowrap">
                                {
                                  <p
                                    className={`${
                                      appointment.status === "Finished" &&
                                      "bg-green-500"
                                    } ${
                                      appointment.status === "Waiting" &&
                                      "bg-red-500"
                                    } w-fit text-sm text-white text-center rounded font-semibold p-1`}
                                  >
                                    {appointment.status}
                                  </p>
                                }
                              </td>
                              {/* <td className="px-2 py-4 text-start text-sm font-medium rounded whitespace-nowrap">
                                <button
                                  onClick={() =>
                                    handleCompleteApp(appointment._id)
                                  }
                                  className="text-green-500 hover:text-green-700"
                                >
                                  <BsCheck2Square
                                    className="hover:text-green-400"
                                    size={20}
                                  />
                                </button>
                              </td> */}
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <div className="flex justify-center my-4">
                  {appointmentsPages.current.map((pg, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => setPage(index + 1)}
                        className="w-10 h-10 p-2 text-center text-black border rounded  bg-BazRed hover:bg-gray-300 text-lg mx-1"
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                  <button
                    // onClick={() => {if(appoinmentsPages.length<index) setPage(index + 1)}}
                    className="w-10 h-10 p-2 text-center text-white bg-BazRed hover:bg-red-700 text-lg mx-1"
                  >
                    {">"}
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PrevAppointments;
