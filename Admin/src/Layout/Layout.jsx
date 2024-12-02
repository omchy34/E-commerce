import React from 'react';
import Sidebar from  "../components/Sidebar/Sidebar"
import Topbar from "../components/Topbar/Topbar"
// import Dashboard from "./components/dashboard/Dashboard"

const Layout = ({children}) => {
  return (
   <div className="flex h-screen overflow-auto">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
