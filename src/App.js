import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Login from "./pages/Login";
import Appointments from "./pages/Appointments";
// import Sidebar from "./components/Sidebar";
// import Bottombar from "./components/Bottombar";
import sidebarContext from './context/SidebarContext';
import loginContext from './context/LoginContext';

function App() {
  
  const [sidebarExtend, setSidebarExtend] = React.useState(true);
  const [isLoggged, setIsLogged] = React.useState(false);
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
      },
      setSidebarExtend: setSidebarExtend,

    }}
    >
    <div className="App grid grid-cols-12 h-full">
      <Router>
        
        
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/customers" exact element={<Customers />} />
          <Route path="/appointments" exact element={<Appointments />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
    </sidebarContext.Provider>
    </loginContext.Provider>
  );
}

export default App;
