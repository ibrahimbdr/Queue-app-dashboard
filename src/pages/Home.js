import React from "react";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import { useNavigate } from "react-router-dom";
import loginContext from "../context/LoginContext";
import sidebarContext from "../context/SidebarContext";

const Home = () => {
  const { state, setSidebarExtend } = React.useContext(sidebarContext);
  const login = React.useContext(loginContext);
  const navigate = useNavigate();
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
        <div className="col-span-10">
          {/* <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="md:hidden">
          <Bottombar />
        </div> */}
        </div>
      </>
    );
  }
};

export default Home;
