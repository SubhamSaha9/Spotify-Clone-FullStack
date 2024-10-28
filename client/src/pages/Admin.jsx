import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

const Admin = () => {
  return (
    <div className="flex items-start min-h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
