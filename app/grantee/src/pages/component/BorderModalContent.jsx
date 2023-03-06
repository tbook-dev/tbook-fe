import React from "react";

export default function ({ children, clx = "" }) {
  return (
    <div
      className={`${clx} border-[#E2E8F0] border-y px-[26px] py-[19px] mx-[-24px]`}
    >
      {children}
    </div>
  );
}
