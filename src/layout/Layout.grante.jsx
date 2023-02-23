import React, { useState } from "react";
import HeaderV2 from "./HeaderV2";

export default function LayoutGrante({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <HeaderV2 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </div>
  );
}
