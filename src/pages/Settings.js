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
import RegisterModel from "../components/RegisterModel";
import titleContext from "../context/TitleContext";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Settings = () => {
  const navigate = useNavigate();
  const { state, setSidebarExtend, setColorMode } =
    React.useContext(sidebarContext);
  const shopTitle = React.useContext(titleContext);
  const [mangerAccountDiv, setManagerAccountDiv] = React.useState(false);
  const [customerAccountDiv, setCustomerAccountDiv] = React.useState(false);
  const login = React.useContext(loginContext);
  const [phoneArr, setPhoneArr] = React.useState([]);
  const [nameArr, setNameArr] = React.useState([]);
  const [customerRegModel, setCustomerRegModel] = React.useState(false);
  const [managerRegModel, setManagerRegModel] = React.useState(false);
  const [alertModel, setAlertModel] = React.useState(false);
  const token = localStorage.getItem("token");
  const [managersUsernames, setManagersUsernames] = React.useState([]);
  const [managersEmails, setManagersEmails] = React.useState([]);
  const [managersPhones, setManagersPhones] = React.useState([]);
  const phoneRegExp = /[0-9]/;

  React.useEffect(() => {
    if (login.state.isLoggged === false) navigate("/login");
  }, []);
  React.useEffect(() => {
    if (login.state.accountType === "admin") {
      axiosInstance
        .get(
          "/admin/manager",

          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          let arr = [];
          let arr2 = [];
          let arr3 = [];
          res.data.forEach((user) => {
            arr.push(user.username);
            arr2.push(user.email);
            arr3.push(user.phone);
          });
          console.log(arr);
          setManagersUsernames(arr);
          setManagersEmails(arr2);
          setManagersPhones(arr3);
        });
    }
  }, []);

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
  if (login.state.isLoggged === true) {
    return (
      <div className="w-full">
        <Alert
          msg={"New Customer has been registered"}
          setModel={setCustomerRegModel}
          Model={customerRegModel}
        />
        <Alert
          msg={"New Manager has been registered"}
          setModel={setManagerRegModel}
          Model={managerRegModel}
        />

        <Alert
          msg={"Shop Name has been updated!"}
          subMsg={"Effect will take place next time you log in"}
          setModel={setAlertModel}
          Model={alertModel}
        />
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
                    <MdControlPoint className="mr-1" /> Add a new manager
                    Account
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
                        username: Yup.string()
                          .required("Required")
                          .notOneOf(
                            managersUsernames,
                            "This admin is regestered before"
                          ),
                        password: Yup.string()
                          .required("Required")
                          .min(
                            6,
                            "Password is too short - should be 6 chars minimum."
                          )
                          .matches(
                            /[a-zA-Z0-9]/,
                            "Password can only contain Latin letters."
                          ),
                        c_password: Yup.string()
                          .required("Required")
                          .oneOf(
                            [Yup.ref("password"), null],
                            "Passwords must match"
                          ),
                        email: Yup.string()
                          .email("Please enter a valid Email")
                          .required("Required")
                          .notOneOf(
                            managersEmails,
                            "This email is regestered before"
                          ),
                        phone: Yup.string()
                          .required("Required")
                          .matches(
                            phoneRegExp,
                            "Please enter a valid phone number"
                          )
                          .notOneOf(
                            managersPhones,
                            "This phone is regestered before"
                          ),
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
                        setManagerRegModel(true);
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
                                : "bg-gray-50 text-gray-900"
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
                    setCustomerRegModel(true);
                  }}
                >
                  {({ isSubmitting, errors }) => (
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
                            : "bg-gray-50 text-gray-900"
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
            <div
              className={`p-1 mt-2 flex items-center ${
                state.colorMode === "dark" ? "bg-gray-900" : "bg-gray-100"
              } rounded-full w-fit `}
            >
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
                    ? "bg-gray-600 shadow"
                    : "shadow-inner"
                }`}
              >
                <MdNightlight className="text-blue-900" size={20} />{" "}
              </button>
            </div>
          </div>
          {login.state.accountType === "admin" && (
            <div className="w-full p-4 mt-4 border-t">
              <h2 className="text-2xl mb-2 font-semibold">Shop Title</h2>
              <Formik
                initialValues={{ shopName: "" }}
                validationSchema={Yup.object({
                  shopName: Yup.string().required("You must Enter a name!!!"),
                })}
                validateOnChange={false}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  axiosInstance
                    .patch(
                      `/admin/shop/${shopTitle.state.title.id}`,

                      { shopName: values.shopName },
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: token,
                        },
                      }
                    )
                    .then((res) => {
                      console.log("Title is Changed");
                      console.log(res.data);
                      setAlertModel("true");
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
                          : "bg-gray-50 text-gray-900"
                      } rounded`}
                    >
                      <div className="my-4 w-full">
                        <label htmlFor="shopName" className="block">
                          Enter new shop name
                        </label>
                        <Field
                          type="text"
                          name="shopName"
                          className="h-10 rounded w-full p-1"
                        />
                        <ErrorMessage name="shopName">
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
                        Change
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Settings;
