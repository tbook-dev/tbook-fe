import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Back } from "@tbook/ui";
import { useLocation } from "react-router-dom";
import { useResponsive } from "ahooks";

export default function LayoutAdmin({ children }) {
  const location = useLocation();
  const blackList = ["/"];
  const { pc } = useResponsive();

  return (
    <div className="flex flex-col min-h-screen dark:bg-black">
      <Header />
      <div className="relative flex-auto overflow-x-hidden overflow-y-auto">
        {!blackList.includes(location.pathname) && !pc && <Back />}

        {children}
      </div>
      <Footer />
    </div>
  );
}
