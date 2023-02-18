import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axios config/axiosInstance";
import Bottombar from "../components/Bottombar";
import Sidebar from "../components/Sidebar";
import sidebarContext from "../context/SidebarContext";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { MdControlPoint, MdLightMode, MdNightlight } from "react-icons/md";

const Settings = () => {
  const { state, setSidebarExtend, setColorMode } =
    React.useContext(sidebarContext);
  const [mangerAccountDiv, setManagerAccountDiv] = React.useState(false);
  const [customerAccountDiv, setCustomerAccountDiv] = React.useState(false);

  const [phoneArr, setPhoneArr] = React.useState([]);
  const [nameArr, setNameArr] = React.useState([]);
  React.useEffect(() => {
    axiosInstance
      .get("/customer/")
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
  }, []);

  return (
    <div className="w-full">
      <div className={`mb-4 w-full`}>
        <h1 className="text-2xl font-bold mb-14 p-6">Settings</h1>
        <div className="w-full p-2">
          <h2 className="text-2xl font-semibold">Accounts</h2>
          <div
            className="w-full py-3 bg-gray-50 flex justify-between px-2"
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
                  <Form>
                    <div className="p-4 shadow bg-gray-50 rounded">
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
                            <div className="text-sm text-red-500">{msg}</div>
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
                            <div className="text-sm text-red-500">{msg}</div>
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
                            <div className="text-sm text-red-500">{msg}</div>
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
                            <div className="text-sm text-red-500">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="my-4 w-full">
                        <label htmlFor="phone" className="block">
                          Password
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
          <div
            className="w-full py-3 bg-gray-50 flex justify-between px-2"
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
                      "/customer/login",

                      JSON.stringify({ phone: values.phone }),
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
                  <Form className="bg-gray-50">
                    <div className="p-4 shadow bg-gray-50 rounded">
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
        <div className="w-full p-2 mt-4 border-t">
          <h2 className="text-2xl font-semibold">Color</h2>
          <div className="p-4">
            <button onClick={() => setColorMode("Light")} className="mr-3">
              <MdLightMode className="text-yellow-500" size={20} />{" "}
            </button>
            <button onClick={() => setColorMode("Dark")} className="ml-3">
              <MdNightlight className="text-blue-900" size={20} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
