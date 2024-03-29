import React from "react";

const Alert = ({ msg, subMsg, Model, setModel }) => {
  setTimeout(() => {
    setModel(false);
  }, 3000);
  return (
    <>
      <div
        className={`${
          Model
            ? `opacity-100 fixed top-0 max-h-screen w-[80%] p-4 z-20 overflow-auto scrollbar-hide`
            : `hidden ease-in duration-500`
        }`}
      >
        <div
          className="bg-teal-100 border border-teal-400 text-teal-700 bg-opacity-90 px-4 pr-10 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold text-sm">{msg} </strong>
          {subMsg && <span className="block sm:inline  text-sm">{subMsg}</span>}
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setModel(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-teal-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      </div>
    </>
  );
};

export default Alert;
