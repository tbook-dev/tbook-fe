import React from "react";

export default function DetailKV({ label, value }) {
  return (
    <div className="grid items-center grid-cols-2">
      <div className="text-[#475569] text-xs">{label}</div>
      <div className="text-[#475569] text-base font-semibold truncate text-ellipsis">
        {value}
      </div>
    </div>
  );
}
