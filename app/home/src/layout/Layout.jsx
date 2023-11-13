import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom'


export default function LayoutAdmin() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black">
      <Header />
      <div className="relative flex-auto overflow-x-hidden overflow-y-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
