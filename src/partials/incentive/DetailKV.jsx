import React from "react";

export default function DetailKV({ label, value }) {
  return (
    <div className="w-[220px] flex justify-between items-center	 mr-[70px]">
      <div className="text-[#475569] text-xs flex-none mr-1.5">{label}</div>
      <div className="text-[#475569] text-base font-semibold flex-auto truncate text-ellipsis text-right">
        {value}
      </div>
    </div>
  );
}
