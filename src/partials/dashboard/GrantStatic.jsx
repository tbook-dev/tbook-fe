import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/DropdownEditMenu";
import { Progress, Statistic } from "antd";

// Import utilities

function GrantStatic({ value, percent, title }) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
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
