import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axios config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import loginContext from "../context/LoginContext";
import registerContext from "../context/RegisterContext";

const Login = () => {
  const navigate = useNavigate();
  const login = React.useContext(loginContext);
  const [formErrorAdmin, setFormErrorAdmin] = React.useState(false);
  const [formErrorManager, setFormErrorManager] = React.useState(false);
  const register = React.useContext(registerContext);

  React.useEffect(() => {
    if (login.state.isLoggged === true) navigate("/");
  }, []);

  if (login.state.isLoggged === false) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl mb-3 font-medium">Login</h1>
        <div className="p-1 rounded-full bg-gray-300 my-2">
          <button
            onClick={() => login.setAccountType("admin")}
            className={`${
              login.state.accountType === "admin"
                ? "bg-gray-100 shadow"
                : "bg-gray-300 shadow-inner"
            } rounded-l-full text-gray-900 p-1 w-32`}
          >
            Admin
          </button>
          <button
            onClick={() => login.setAccountType("manager")}
            className={`${
              login.state.accountType === "manager"
                ? "bg-gray-100 shadow"
                : "bg-gray-300 shadow-inner"
            } rounded-r-full text-gray-900 p-1 w-32`}
          >
            Manager
          </button>
        </div>
        {login.state.accountType === "admin" && (
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
              username: Yup.string().required("Required"),
              password: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              // console.log(JSON.stringify(values));
              axiosInstance
                .post(
                  "/admin/login",

                  JSON.stringify(values),
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  // console.log(res);
                  setFormErrorAdmin(false);
                  localStorage.setItem("token", res.data);
                  login.setIsLogged(true);
                  navigate("/");
                })
                .catch((err) => {
                  console.log(err);
                  setFormErrorAdmin(true);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="p-4 shadow bg-gray-300 rounded min-w-[300px]">
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
                  {formErrorAdmin && (
                    <div className="text-sm text-red-500">
                      Invalid credintials
                    </div>
                  )}
                  <button
                    type="submit"
                    className="text-xl mt-3 border border-gray-800 hover:bg-gray-800 hover:text-white mx-5 w-32 text-center rounded  py-2 transition-all"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {login.state.accountType === "manager" && (
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
              username: Yup.string().required("Required"),
              password: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              console.log(JSON.stringify(values));
              axiosInstance
                .post(
                  "/manager/login/",

                  values,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  setFormErrorManager(false);
                  console.log(res.data);
                  localStorage.setItem("token", res.data);
                  login.setIsLogged(true);
                  navigate("/");
                })
                .catch((err) => {
                  setFormErrorManager(true);
                  console.log(err);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="p-4 shadow bg-gray-300 rounded min-w-[300px]">
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
                  {formErrorManager && (
                    <div className="text-sm text-red-500">
                      Invalid credintials
                    </div>
                  )}
                  <button
                    type="submit"
                    className="text-xl mt-3 border border-gray-800 hover:bg-gray-800 hover:text-white mx-5 w-32 text-center rounded  py-2 transition-all"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {register.state.canRegister && (
          <Link className="text-blue-600 text-sm underline" to="/register">
            If you don't have an Admin account you can register here
          </Link>
        )}
      </div>
    );
  }
};

export default Login;
