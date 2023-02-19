import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axios config/axiosInstance";
import Bottombar from "../components/Bottombar";
import Sidebar from "../components/Sidebar";
import sidebarContext from "../context/SidebarContext";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { MdControlPoint, MdLightMode, MdNightlight } from "react-icons/md";
import loginContext from "../context/LoginContext";

const Settings = () => {
  const { state, setSidebarExtend, setColorMode } =
    React.useContext(sidebarContext);
  const [mangerAccountDiv, setManagerAccountDiv] = React.useState(false);
  const [customerAccountDiv, setCustomerAccountDiv] = React.useState(false);
  const login = React.useContext(loginContext);
  const [phoneArr, setPhoneArr] = React.useState([]);
  const [nameArr, setNameArr] = React.useState([]);
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    if (login.state.accountType === "admin") {
      axiosInstance
        .get("/admin/customer/", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          let arr = [];
          let arr2 = [];
          res.data.forEach((customer) => {
            arr.push(customer.phone);
            arr2.push(customer.name);
          });
          setPhoneArr(arr);
          setNameArr(arr2);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (login.state.accountType === "manager") {
      axiosInstance
        .get("/manager/customer/", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          let arr = [];
          let arr2 = [];
          res.data.forEach((customer) => {
            arr.push(customer.phone);
            arr2.push(customer.name);
          });
          setPhoneArr(arr);
          setNameArr(arr2);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="w-full">
      <div className={`mb-4 w-full`}>
        <h1 className="text-3xl font-bold mb-14 p-6">Settings</h1>
        <div className="w-full p-4">
          <h2 className="text-2xl mb-2 font-semibold">Accounts</h2>
          {login.state.accountType === "admin" && (
            <>
              <div
                className={`w-full py-3 ${
                  state.colorMode === "dark"
                    ? "bg-gray-900 text-cyan-700"
                    : "bg-gray-50 text-black"
                } flex justify-between px-2`}
                onClick={() => setManagerAccountDiv(!mangerAccountDiv)}
              >
                <h2 className="flex items-center cursor-pointer text-md font-medium ">
                  <MdControlPoint className="mr-1" /> Add a new manager Account
                </h2>
                <button>
                  {mangerAccountDiv ? <BiDownArrow /> : <BiUpArrow />}
                </button>
              </div>

              {mangerAccountDiv && (
                <div className="animate-drop-down border-t">
                  <Formik
                    initialValues={{
                      username: "",
                      password: "",
                      c_password: "",
                      email: "",
                      phone: "",
                    }}
                    validationSchema={Yup.object({
                      username: Yup.string().required("Required"),
                      password: Yup.string().required("Required"),
                      c_password: Yup.string().required("Required"),
                      email: Yup.string().email().required("Required"),
                      phone: Yup.string().required("Required"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      setSubmitting(false);
                      console.log(JSON.stringify(values));
                      axiosInstance
                        .post(
                          "/admin/manager/",

                          values,
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        )
                        .then((res) => {})
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form
                        className={`${
                          state.colorMode === "dark"
                            ? "bg-gray-900"
                            : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`p-4 shadow ${
                            state.colorMode === "dark"
                              ? "bg-gray-900 text-cyan-700"
                              : "bg-gray-50 text-white"
                          } rounded`}
                        >
                          <div className="my-4 w-full">
                            <label htmlFor="username" className="block">
                              Username
                            </label>
                            <Field
                              type="text"
                              name="username"
                              className="h-10 rounded w-full p-1"
                            />
                            <ErrorMessage name="username">
                              {(msg) => (
                                <div className="text-sm text-red-500">
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </div>
                          <div className="my-4 w-full">
                            <label htmlFor="password" className="block">
                              Password
                            </label>
                            <Field
                              type="password"
                              name="password"
                              className="h-10 rounded w-full p-1"
                            />
                            <ErrorMessage name="password">
                              {(msg) => (
                                <div className="text-sm text-red-500">
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </div>
                          <div className="my-4 w-full">
                            <label htmlFor="c_password" className="block">
                              Confirm Password
                            </label>
                            <Field
                              type="password"
                              name="c_password"
                              className="h-10 rounded w-full p-1"
                            />
                            <ErrorMessage name="c_password">
                              {(msg) => (
                                <div className="text-sm text-red-500">
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </div>
                          <div className="my-4 w-full">
                            <label htmlFor="email" className="block">
                              Email Address
                            </label>
                            <Field
                              type="email"
                              name="email"
                              className="h-10 rounded w-full p-1"
                            />
                            <ErrorMessage name="email">
                              {(msg) => (
                                <div className="text-sm text-red-500">
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </div>
                          <div className="my-4 w-full">
                            <label htmlFor="phone" className="block">
                              Phone Number
                            </label>
                            <Field
                              type="text"
                              name="phone"
                              className="h-10 rounded w-full p-1"
                            />
                            <ErrorMessage name="phone">
                              {(msg) => (
                                <div className="text-sm text-red-500">
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </div>
                          <button
                            type="submit"
                            className="text-xl mt-3 border border-gray-800 hover:bg-gray-800 hover:text-white mx-5 w-32 text-center rounded  py-2 transition-all"
                            disabled={isSubmitting}
                          >
                            Add
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </>
          )}
          <div
            className={`w-full py-3 ${
              state.colorMode === "dark"
                ? "bg-gray-900 text-cyan-700"
                : "bg-gray-50 text-black"
            } flex justify-between px-2`}
            onClick={() => setCustomerAccountDiv(!customerAccountDiv)}
          >
            <h2 className="flex items-center cursor-pointer text-md font-medium ">
              <MdControlPoint className="mr-1" /> Add a new customer Account
            </h2>
            <button>
              {customerAccountDiv ? <BiDownArrow /> : <BiUpArrow />}
            </button>
          </div>
          {customerAccountDiv && (
            <div className="animate-drop-down border-t">
              <Formik
                initialValues={{ name: "", phone: "" }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .required("Required")
                    .notOneOf(nameArr, "Name already has been registered"),
                  phone: Yup.string()
                    .required("Required")
                    .notOneOf(
                      phoneArr,
                      "Phone number already has been registered"
                    ),
                })}
                validateOnChange={false}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  axiosInstance
                    .post(
                      "/manager/customer",

                      JSON.stringify(values),
                      {
                        headers: {
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
                    .post(
                      "/customer/",

                      values,
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    )
                    .then((res) => {
                      //   console.log(res.data);
                      //   console.log("token-customer", res.data.token);
                      //   localStorage.setItem("token-customer", res.data.token);
                      //   if (res.data) navigate("/print2");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                {({ isSubmitting, errors }) => (
                  <Form
                    className={`${
                      state.colorMode === "dark" ? "bg-gray-900" : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`p-4 shadow ${
                        state.colorMode === "dark"
                          ? "bg-gray-900 text-cyan-700"
                          : "bg-gray-50 text-white"
                      } rounded`}
                    >
                      <div className="my-4 w-full">
                        <label htmlFor="name" className="block">
                          Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className="h-10 rounded w-full p-1"
                        />
                        <ErrorMessage name="name">
                          {(msg) => (
                            <div className="text-sm text-red-500">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="my-4 w-full">
                        <label htmlFor="phone" className="block">
                          Phone
                        </label>
                        <Field
                          type="text"
                          name="phone"
                          className="h-10 rounded w-full p-1"
                        />
                        <ErrorMessage name="phone">
                          {(msg) => (
                            <div className="text-sm text-red-500">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>

                      <button
                        type="submit"
                        className="text-xl mt-3 border border-gray-800 hover:bg-gray-800 hover:text-white mx-5 w-32 text-center rounded  py-2 transition-all"
                        disabled={isSubmitting}
                      >
                        Add
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
        <div className="w-full p-4 mt-4 border-t">
          <h2 className="text-2xl font-semibold">Color Mode</h2>
          <div className="p-1 mt-2 flex items-center bg-gray-100 rounded-full w-fit ">
            <button
              onClick={() => setColorMode("light")}
              className={`p-2 rounded-l-full pr-3 ${
                state.colorMode === "light"
                  ? "bg-gray-300 shadow"
                  : "shadow-inner"
              }`}
            >
              <MdLightMode className="text-yellow-500" size={20} />{" "}
            </button>
            <button
              onClick={() => setColorMode("dark")}
              className={`p-2 rounded-r-full pl-3 ${
                state.colorMode === "dark"
                  ? "bg-gray-300 shadow"
                  : "shadow-inner"
              }`}
            >
              <MdNightlight className="text-blue-900" size={20} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
