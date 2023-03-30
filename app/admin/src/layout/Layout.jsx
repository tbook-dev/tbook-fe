import React from "react";
import Header from "./Header";

export default function LayoutAdmin({ children }) {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black">
      <Header />
      <div className="relative flex-auto overflow-x-hidden overflow-y-auto">{children}</div>
    </div>
  );
}
