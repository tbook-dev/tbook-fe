import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useAsyncEffect, useResponsive } from "ahooks";

export default function RecordTable() {
  const { pc } = useResponsive();

  const list = useMemo(() => {
    return [
      {
        avator: "",
        type: "Investor",
        address: "",
        date: "01/02/2023",
        tokens: "400,000",
        perecent: "0.2",
      },
    ];
  });
  return (
    <div className="p-3 text-white rect-border lg:px-0">
      <div className="flex items-center justify-between lg:px-4">
        <h2 className="font-medium text-c12 lg:text-c13">Latest Grants</h2>
        <Link to="/create/plan">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 text-xs font-medium leading-normal transition duration-150 ease-in-out rounded-md lg:w-40 lg:h-10 lg:dark:bg-white lg:rounded-lg dark:text-black shadow-d3 lg:hover:text-white lg:hover:bg-cw1 lg:hover:shadow-d7"
          >
            <PlusOutlined style={pc ? null : { color: "#69D0E5", fontSize: "16px" }} />
            <span className="ml-2 text-[14px] hidden lg:inline">New Record</span>
          </button>
        </Link>
      </div>

      <div>
        {list.map((v) => {
          return (
            <div className="grid grid-cols-2">
              <div className="flex"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
