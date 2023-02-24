import React from "react";
import Header from "./Header";

export default function LayoutAdmin({ children }) {

  return (
    <div className="min-h-screen dark:bg-black">
      <Header />
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <main className="w-full px-4 lg:px-0 lg:w-[936px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
