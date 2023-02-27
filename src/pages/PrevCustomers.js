import React, { useEffect, useRef, useMemo } from "react";
import { BsArrowCounterclockwise, BsCheck2Square } from "react-icons/bs";
import { TiDelete, TiTrash } from "react-icons/ti";
import sidebarContext from "../context/SidebarContext";
import axiosInstance from "../axios config/axiosInstance";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import loginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const PrevCustomers = () => {
  const { state, setSidebarExtend } = React.useContext(sidebarContext);
  const value = React.useContext(sidebarContext);
  const [customers, setCustomers] = React.useState([[]]);
  let token = localStorage.getItem("token");
  const login = React.useContext(loginContext);
  const navigate = useNavigate();

  const [page, setPage] = React.useState(1);

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const handleCustomerActive = (id) => {
    console.log(id);
    if (login.state.accountType === "admin") {
      axiosInstance
        .patch(
          `/admin/customer/${id}`,
          { active: true },
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
        .get(`/customer/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCustomers(sliceIntoChunks(res.data, 10));

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
          { active: true },
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
        .get(`/customer/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCustomers(sliceIntoChunks(res.data, 10));
          console.log(customers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteCustomerAccount = (id) => {
    console.log(id);
    if (login.state.accountType === "admin") {
      axiosInstance
        .delete(`/admin/customer/${id}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axiosInstance
        .get(`/customer/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCustomers(sliceIntoChunks(res.data, 10));
          console.log(customers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (login.state.accountType === "manager") {
      axiosInstance
        .delete(`/manager/customer/${id}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axiosInstance
        .get(`/customer/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCustomers(sliceIntoChunks(res.data, 10));
          console.log(customers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    if (login.state.isLoggged === false) navigate("/login");

    axiosInstance
      .get(`/customer/`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        let NonActiveCustomers = res.data.filter((data) => {
          return !data.active;
        });
        console.log(NonActiveCustomers);
        setCustomers(sliceIntoChunks(NonActiveCustomers, 10));
        console.log(customers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (login.state.isLoggged === true) {
    return (
      <div className={`p-6 mb-4  ml-5 w-full`}>
        <h1 className="text-2xl font-bold mb-14">NonActive Customers</h1>

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
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers[page - 1] === null || customers.length === 0 ? (
                      <tr key="9999">
                        <td
                          className="text-center font-semibold text-lg"
                          align="center"
                          colSpan="4"
                        >
                          There are no Non-Active Customers
                        </td>
                      </tr>
                    ) : (
                      customers[page - 1].map((customer, index) => {
                        return (
                          !customer.active && (
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
                              </td> */}
                              {/* <td className="px-2 py-4 text-sm font-medium whitespace-nowrap">
                                {customer.appointment.status ? (
                                  <p
                                    className={`${
                                      customer.appointment.status ===
                                        "Finished" && "bg-green-500"
                                    } ${
                                      customer.appointment.status ===
                                        "Waiting" && "bg-red-500"
                                    } w-fit text-sm text-white text-center rounded font-semibold p-1`}
                                  >
                                    {customer.appointment.status}
                                  </p>
                                ) : (
                                  <p>-</p>
                                )}
                              </td> */}
                              <td
                                className={`px-2 py-4 text-start text-sm ${
                                  state.colorMode === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-800"
                                } whitespace-nowrap`}
                              >
                                <button
                                  className="mx-2"
                                  onClick={() =>
                                    handleCustomerActive(customer["_id"])
                                  }
                                >
                                  <BsArrowCounterclockwise
                                    className="text-black"
                                    size={30}
                                  />
                                </button>
                                {login.state.accountType === "admin" && (
                                  <button
                                    className="mx-2"
                                    onClick={() =>
                                      handleDeleteCustomerAccount(
                                        customer["_id"]
                                      )
                                    }
                                  >
                                    <TiTrash
                                      className="text-red-600"
                                      size={30}
                                    />
                                  </button>
                                )}
                              </td>
                            </tr>
                          )
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center my-4">
                {customers.map((pg, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => setPage(index + 1)}
                      className="flex justify-center items-center w-10 h-10 p-2 text-center text-black border rounded  bg-BazRed hover:bg-gray-300 text-lg mx-1"
                    >
                      {index + 1}
                    </button>
                  );
                })}
                {/* <button
                    // onClick={() => {if(appoinmentsPages.length<index) setPage(index + 1)}}
                    className="w-10 h-10 p-2 text-center text-white bg-BazRed hover:bg-red-700 text-lg mx-1"
                  >
                    {">"}
                  </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PrevCustomers;
