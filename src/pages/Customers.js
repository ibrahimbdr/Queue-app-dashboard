import React, { useEffect } from "react";
import { BsCheck2Square } from "react-icons/bs";
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

  useEffect(() => {
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
          <h1 className="text-2xl font-bold mb-14">All Customers</h1>

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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Phone
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
                      {customers.map((customer, index) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                              <span>{"0".repeat(index.length)}</span>
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {customer.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {customer.phone}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                              <p className="bg-red-500 text-white font-medium p-1 rounded">
                                {customer.status}
                              </p>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
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

export default Customers;
