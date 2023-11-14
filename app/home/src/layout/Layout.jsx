import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="relative flex-auto overflow-x-hidden overflow-y-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
