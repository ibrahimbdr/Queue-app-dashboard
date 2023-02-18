import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Appointments from "./pages/Appointments";
import Customers from "./pages/Customers";
import Sidebar from "./components/Sidebar";
import Bottombar from "./components/Bottombar";
import sidebarContext from "./context/SidebarContext";
import loginContext from "./context/LoginContext";
import PrevCustomers from "./pages/PrevCustomers";
import PrevAppointments from "./pages/PrevAppointments";
import Settings from "./pages/Settings";

function App() {
  const [sidebarExtend, setSidebarExtend] = React.useState(true);
  const [colorMode, setColorMode] = React.useState("light");
  const [isLoggged, setIsLogged] = React.useState(
    localStorage.getItem("token") ? true : false
  );
  return (
    <loginContext.Provider
      value={{
        state: {
          isLoggged: isLoggged,
        },
        setIsLogged: setIsLogged,
      }}
    >
      <sidebarContext.Provider
        value={{
          state: {
            sidebarExtend: sidebarExtend,
            colorMode: colorMode,
          },
          setSidebarExtend: setSidebarExtend,
          setColorMode: setColorMode,
        }}
      >
        <div className="App flex w-full h-screen">
          <Router>
            {isLoggged && (
              <div
                className={`${
                  sidebarExtend ? "md:mr-[200px]" : "md:mr-[78px]"
                }`}
              >
                <Sidebar
                  sidebarExtend={sidebarExtend}
                  setSidebarExtend={setSidebarExtend}
                />
                <Bottombar />
              </div>
            )}
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/customers" exact element={<Customers />} />
              <Route path="/customers-n" exact element={<PrevCustomers />} />
              <Route path="/appointments" exact element={<Appointments />} />
              <Route
                path="/appointments-f"
                exact
                element={<PrevAppointments />}
              />
              <Route path="/settings" exact element={<Settings />} />
              <Route path="/login" exact element={<Login />} />
            </Routes>
          </Router>
        </div>
      </sidebarContext.Provider>
    </loginContext.Provider>
  );
}

export default App;
