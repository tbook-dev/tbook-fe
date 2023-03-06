import React from "react";
import tbook from "./tbook.png";
import tbookxm from "./tbookxm.png";

export default function ({ sidebarExpanded }) {
  return (
    <div className="flex items-center">
      <img src={sidebarExpanded ? tbook : tbookxm} className="h-[28px]" />
    </div>
  );
}
