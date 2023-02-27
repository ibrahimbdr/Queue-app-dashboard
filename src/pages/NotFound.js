import React from "react";
import { Link } from "react-router-dom";
import loginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const login = React.useContext(loginContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (login.state.isLoggged === false) navigate("/login");
  });

  if (login.state.isLoggged === true) {
    return (
      <div className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-400">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              rel="noopener noreferrer"
              to="/"
              className="px-2 text-xl mt-3 border border-gray-800 hover:bg-gray-800 hover:text-white mx-5 w-32 text-center rounded  py-2 transition-all"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default NotFound;
