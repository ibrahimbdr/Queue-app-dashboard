import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axios config/axiosInstance";
import { useNavigate } from "react-router-dom";
import loginContext from "../context/LoginContext";
import sidebarContext from "../context/SidebarContext";

const Register = () => {
  const { state, setSidebarExtend, setColorMode } =
    React.useContext(sidebarContext);
  const [managerRegModel, setManagerRegModel] = React.useState(false);
  const [existingUser, setExistingUser] = React.useState([]);
  const [existingEmail, setExistingEmail] = React.useState([]);
  const [existingPhone, setExistingPhone] = React.useState([]);
  const navigate = useNavigate();
  const login = React.useContext(loginContext);
  const phoneRegExp = /[0-9]/;
  React.useEffect(() => {
    if (login.state.isLoggged === true) navigate("/");
  }, []);

  React.useEffect(() => {
    axiosInstance.get("/admin/checkmaching").then((res) => {
      let arr = [];
      let arr2 = [];
      let arr3 = [];
      res.data.forEach((user) => {
        arr.push(user.username);
        arr2.push(user.email);
        arr3.push(user.phone);
      });
      console.log(arr);
      setExistingUser(arr);
      setExistingEmail(arr2);
      setExistingPhone(arr3);
    });
  }, []);

  if (login.state.isLoggged === false) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl mb-3 font-medium">Register</h1>

        {login.state.accountType === "admin" && (
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
                  existingUser,
                  "This admin has been regestered before"
                ),
              password: Yup.string()
                .required("Required")
                .min(6, "Password is too short - should be 6 chars minimum.")
                .matches(
                  /[a-zA-Z0-9]/,
                  "Password can only contain Latin letters."
                ),
              c_password: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
              email: Yup.string()
                .email("Please enter a valid Email")
                .required("Required")
                .notOneOf(
                  existingEmail,
                  "This email has been regestered before"
                ),
              phone: Yup.string()
                .required("Required")
                .matches(phoneRegExp, "Please enter a valid phone number")
                .notOneOf(
                  existingPhone,
                  "This phone has been regestered before"
                ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              console.log(JSON.stringify(values));
              axiosInstance
                .post(
                  "/admin/",

                  {
                    username: values.username,
                    password: values.password,
                    email: values.email,
                    phone: values.phone,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  console.log(res);
                  navigate("/login");
                })
                .catch((err) => {
                  console.log(err);
                });
              setManagerRegModel(true);
            }}
          >
            {({ isSubmitting }) => (
              <Form
                className={`${
                  state.colorMode === "dark" ? "bg-gray-900" : "bg-gray-50"
                } w-[300px] sm:w-[500px]`}
              >
                <div
                  className={`p-4 shadow ${
                    state.colorMode === "dark"
                      ? "bg-gray-900 text-cyan-700"
                      : "bg-gray-50 text-black"
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
                      Phone Number
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
        )}
      </div>
    );
  }
};

export default Register;
