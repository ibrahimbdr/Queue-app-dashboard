import React from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
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
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import titleContext from "./context/TitleContext";
import axiosInstance from "./axios config/axiosInstance";
import registerContext from "./context/RegisterContext";

function App() {
  const [sidebarExtend, setSidebarExtend] = React.useState(true);
  const [colorMode, setColorMode] = React.useState("light");
  const [isLoggged, setIsLogged] = React.useState(
    localStorage.getItem("token") ? true : false
  );
  const [accountType, setAccountType] = React.useState("admin");
  const [title, setTitle] = React.useState({ id: "", ShopName: "My Shop" });
  const [canRegister, setCanRegister] = React.useState(true);

  React.useEffect(() => {
    axiosInstance.get("/admin/shop/").then((res) => {
      console.log(res.data);
      if (res.data.length === 0) {
        axiosInstance.post(
          "/admin/shop/",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }
      // console.log(res.data[0].shopName);
      if (res.data.length !== 0)
        setTitle({ id: res.data[0]["_id"], shopName: res.data[0].shopName });
      axiosInstance.get("/admin/shop").then((res) => {
        if (res.data.length !== 0) setCanRegister(res.data[0].registerActive);
      });
    });
  }, []);

  return (
    <loginContext.Provider
      value={{
        state: {
          isLoggged: isLoggged,
          accountType: accountType,
        },
        setIsLogged: setIsLogged,
        setAccountType: setAccountType,
      }}
    >
      <registerContext.Provider
        value={{
          state: {
            canRegister: canRegister,
          },
          setCanRegister: setCanRegister,
        }}
      >
        <titleContext.Provider
          value={{
            state: {
              title: title,
            },
            setTitle: setTitle,
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
            <div
              className={`App flex w-full ${
                colorMode === "dark" && "bg-gray-700"
              } min-h-screen`}
            >
              <HashRouter>
                {isLoggged && (
                  <div
                    className={`${
                      sidebarExtend ? "md:mr-[220px]" : "md:mr-[78px]"
                    }`}
                  >
                    <Sidebar
                      sidebarExtend={sidebarExtend}
                      setSidebarExtend={setSidebarExtend}
                    />

                    <Bottombar />
                  </div>
                )}
                <div className="mb-[54px] md:mb-0 w-full h-full">
                  <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/customers" exact element={<Customers />} />
                    <Route
                      path="/customers-n"
                      exact
                      element={<PrevCustomers />}
                    />
                    <Route
                      path="/appointments"
                      exact
                      element={<Appointments />}
                    />
                    <Route
                      path="/appointments-f"
                      exact
                      element={<PrevAppointments />}
                    />
                    <Route path="/settings" exact element={<Settings />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="*" exact element={<NotFound />} />
                  </Routes>
                </div>
              </HashRouter>
            </div>
          </sidebarContext.Provider>
        </titleContext.Provider>
      </registerContext.Provider>
    </loginContext.Provider>
  );
}

export default App;
