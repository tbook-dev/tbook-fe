import React, { useState } from "react";
import Sidebar from "@/partials/Sidebar";
import Header from "@/partials/Header";

export default function LayoutAdmin({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
