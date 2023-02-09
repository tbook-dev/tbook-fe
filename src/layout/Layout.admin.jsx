import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function LayoutAdmin({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F5F6]">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="w-full px-4 lg:px-0 lg:w-[928px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
