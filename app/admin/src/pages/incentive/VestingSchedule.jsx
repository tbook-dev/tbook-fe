import React from "react";
import { conf } from "@tbook/utils";
import clsx from "clsx";

const { formatDollar } = conf;

export default function VestingSchedule({ dataList = [], ...props }) {
  const col = [
    {
      title: "#",
      dataIndex: "idx",
      className: "text-left",
      render(v) {
        return <span className="w-10">{v}</span>;
      },
    },
    {
      title: "Vesting Date",
      dataIndex: "date",
      className: "text-right lg:text-center",
    },
    {
      title: "Vested Amount",
      dataIndex: "quantity",
      className: "text-right",
      render(v) {
        return <span className="">{formatDollar(v)}</span>;
      },
    },
    {
      title: "Cumulative",
      className: "text-right",
      render(_, record) {
        const list = dataList.slice(0, record.idx);
        const sum = list.reduce((pre, cur) => pre + cur.quantity, 0);
        return <span className="font-medium">{formatDollar(sum)}</span>;
      },
    },
  ];

  return (
    <div className="text-c2">
      <div className="grid grid-cols-[30px_repeat(2,1fr)_80px] lg:grid-cols-4 items-center border-b border-b-1 text-[#666] dark:text-b-8 h-10 px-4 lg:px-6">
        {col.map((v) => {
          return (
            <div key={v.title} className={v.className}>
              {v.title}
            </div>
          );
        })}
      </div>
      <div className="divide-y dark:text-white divide-b-1">
        {dataList
          .map((item, idx) => ({ ...item, idx: idx + 1 }))
          .map((data, idx) => {
            return (
              <div
                key={idx}
                className={clsx(
                  data.isVested && "bg-cw1",
                  "grid items-center h-10 lg:grid-cols-4 grid-cols-[30px_repeat(2,1fr)_80px] px-4 lg:px-6"
                )}
              >
                {col.map((v, idx) => {
                  return (
                    <div key={idx} className={v.className}>
                      {v.render ? v.render(data[v.dataIndex], data) : data[v.dataIndex]}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
