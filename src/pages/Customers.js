import React, { useEffect, useRef, useMemo } from "react";
import { BsCheck2Square } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import sidebarContext from "../context/SidebarContext";
import axiosInstance from "../axios config/axiosInstance";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import loginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const { state, setSidebarExtend } = React.useContext(sidebarContext);
  const value = React.useContext(sidebarContext);
  const [customers, setCustomers] = React.useState([]);
  let token = localStorage.getItem("token");
  const login = React.useContext(loginContext);
  const navigate = useNavigate();

  // const [pg, setPg] = React.useState(1);
  // let customersPages = useRef([]);

  // function sliceIntoChunks(arr, chunkSize) {
  //   const res = [];
  //   for (let i = 0; i < arr.length; i += chunkSize) {
  //     const chunk = arr.slice(i, i + chunkSize);
  //     res.push(chunk);
  //   }
  //   return res;
  // }

  const handleCustomerActive = (id) => {
    console.log(id);
    if (login.state.accountType === "admin") {
      axiosInstance
        .patch(
          `/admin/customer/${id}`,
          { active: false },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axiosInstance
        .get(`/admin/customer`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          // console.log([...appointments, ...res.data]);
          console.log(res.data);
          setCustomers(res.data);
          // appointmentsPages.current = sliceIntoChunks(appointments, 10);
          // console.log("Here is appoinments array");
          console.log(customers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (login.state.accountType === "manager") {
      axiosInstance
        .patch(
          `/manager/customer/${id}`,
          { active: false },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axiosInstance
        .get(`/manager/customer`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          // console.log([...appointments, ...res.data]);
          console.log(res.data);
          setCustomers(res.data);
          // appointmentsPages.current = sliceIntoChunks(appointments, 10);
          // console.log("Here is appoinments array");
          console.log(customers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (login.state.accountType === "admin") {
      axiosInstance
        .get(`/admin/customer`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log([...customers, ...res.data]);
          setCustomers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (login.state.accountType === "manager") {
      axiosInstance
        .get(`/admin/customer`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log([...customers, ...res.data]);
          setCustomers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  //   useMemo(() => {
  //     customersPages.current = sliceIntoChunks(customers, 10);
  //     console.log(customersPages.current);
  //   }, [customers, customersPages]);

  React.useEffect(() => {
    if (login.state.isLoggged === false) navigate("/login");
  }, []);
  if (login.state.isLoggged === true) {
    return (
      <div className={`p-6 mb-4  ml-5 w-full`}>
        <h1 className="text-2xl font-bold mb-14">Active Customers</h1>

        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead
                    className={`${
                      state.colorMode === "dark" ? "bg-gray-900" : "bg-gray-50"
                    }`}
                  >
                    <tr>
                      <th
                        scope="col"
                        className={`px-2 py-3 text-start text-xs font-bold ${
                          state.colorMode === "dark"
                            ? "text-cyan-700"
                            : "text-gray-500"
                        } uppercase `}
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className={`px-2 py-3 text-start text-xs font-bold ${
                          state.colorMode === "dark"
                            ? "text-cyan-700"
                            : "text-gray-500"
                        } uppercase `}
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className={`px-2 py-3 text-start text-xs font-bold ${
                          state.colorMode === "dark"
                            ? "text-cyan-700"
                            : "text-gray-500"
                        } uppercase `}
                      >
                        Phone
                      </th>
                      {/* <th
                          scope="col"
                          className="px-2 py-3 text-xs font-bold text-gray-500 uppercase "
                        >
                          Queue Number
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-3 text-xs font-bold text-gray-500 uppercase "
                        >
                          Queue status
                        </th> */}
                      <th
                        scope="col"
                        className={`px-2 py-3 text-start text-xs font-bold ${
                          state.colorMode === "dark"
                            ? "text-cyan-700"
                            : "text-gray-500"
                        } uppercase `}
                      >
                        Deactivate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers === null || customers.length === 0 ? (
                      <tr key="9999">
                        <td
                          className="text-center font-semibold text-lg"
                          align="center"
                          colspan="4"
                        >
                          There are no Registered Customers
                        </td>
                      </tr>
                    ) : (
                      customers.map((customer, index) => {
                        return (
                          customer.active && (
                            <tr key={index}>
                              <td
                                className={`px-2 py-4 text-start text-sm ${
                                  state.colorMode === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-800"
                                } whitespace-nowrap`}
                              >
                                <span>{"0".repeat(index.length)}</span>
                                {index + 1}
                              </td>
                              <td
                                className={`px-2 py-4 text-start text-sm ${
                                  state.colorMode === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-800"
                                } whitespace-nowrap`}
                              >
                                {customer.name}
                              </td>
                              <td
                                className={`px-2 py-4 text-start text-sm ${
                                  state.colorMode === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-800"
                                } whitespace-nowrap`}
                              >
                                {customer.phone}
                              </td>
                              {/* <td className="px-2 py-4 text-sm flex justify-center font-medium whitespace-nowrap">
                              {customer.appointment.number
                                ? "have an appointment"
                                : "does not an appointment"}
                            </td>
                            <td className="px-2 py-4 text-sm font-medium whitespace-nowrap">
                              <p
                                className={`${
                                  customer.appointment.status === "Finished" &&
                                  "bg-green-500"
                                } ${
                                  customer.appointment.status === "Waiting" &&
                                  "bg-red-500"
                                } w-fit text-sm text-white text-center rounded font-semibold p-1`}
                              ></p>
                            </td> */}
                              <td
                                className={`px-2 py-4 text-start text-sm ${
                                  state.colorMode === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-800"
                                } whitespace-nowrap`}
                              >
                                <button
                                  onClick={() =>
                                    handleCustomerActive(customer["_id"])
                                  }
                                >
                                  <TiDelete
                                    className="text-red-600"
                                    size={30}
                                  />
                                </button>
                              </td>
                            </tr>
                          )
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              {/* <div className="flex justify-center my-4">
                  {customersPages.current.map((pg, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => setPg(index + 1)}
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
    );
  }
};

export default Customers;
