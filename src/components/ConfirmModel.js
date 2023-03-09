import React from "react";
import sidebarContext from "../context/SidebarContext";

const ConfirmModel = ({
  resetModel,
  handleResetAllAppointments,
  setResetModel,
}) => {
  const { state } = React.useContext(sidebarContext);
  const handleConfirm = () => {
    handleResetAllAppointments();
    setResetModel(false);
  };
  return (
    <>
      <div
        className={`${
          resetModel
            ? "overflow-y-hidden ease-in duration-300 fixed text-gray-300 left-0 top-0 w-full h-screen  bg-black/70  flex flex-col z-10 "
            : "hidden ease-in duration-500"
        }`}
        onClick={() => setResetModel(false)}
      ></div>
      <div
        className={`${
          resetModel
            ? `opacity-100 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-h-screen w-[300px] h-[150px] ${
                state.colorMode === "dark"
                  ? "bg-gray-800 text-cyan-700"
                  : "bg-gray-50 text-gray-900"
              } rounded shadow-xl p-4 flex flex-col z-20  whitespace-nowrap overflow-auto scrollbar-hide`
            : `hidden ease-in duration-500`
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="mt-3">
            Confirm to delete all{" "}
            <span className="font-bold">appointments</span>
          </h2>

          <div className="mt-3 flex justify-center items-center">
            <button
              onClick={handleConfirm}
              className=" border border-red-500 hover:bg-red-500 hover:text-white mx-1 w-32 text-center rounded  py-2 transition-all"
            >
              Confirm
            </button>
            <button
              onClick={() => setResetModel(false)}
              className=" border border-gray-500 hover:bg-gray-500 hover:text-white mx-1 w-32 text-center rounded  py-2 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModel;
