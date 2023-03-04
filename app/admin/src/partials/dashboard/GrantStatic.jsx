import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/DropdownEditMenu";
import { Progress, Statistic } from "antd";

// Import utilities

function GrantStatic({ value, percent, title }) {
  return (
    <div className="flex flex-col bg-white border rounded-sm shadow-lg col-span-full sm:col-span-6 xl:col-span-4 border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex items-start justify-between mb-2">
          <img src={Icon} width="32" height="32" alt="Icon 01" />
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-[30px]">
          {title}
        </h2>
        <Statistic
          value={value}
          valueStyle={{
            fontWeight: "700",
            fontSize: "60px",
            lineHeight: "40px",
            color: "#1E293B",
          }}
        />
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow pt-[55px]">
        <Progress percent={percent} strokeColor="#6366F1" showInfo={false} />
      </div>
    </div>
  );
}

export default GrantStatic;
