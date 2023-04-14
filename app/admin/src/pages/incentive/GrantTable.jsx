import React, { useEffect, useState } from "react";
import { conf } from "@tbook/utils";
import Pagination from "@/components/pagination";

const { grantStatusList, grantType, formatDollar, shortAddress, getLastVested } = conf;

export default function ({ list = [], filters }) {
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    setCurrent(1);
  }, [filters]);
  const columns = [
    {
      title: "GRANT ID",
      render: (_, v) => v?.grant?.grantId,
    },
    {
      title: "GRANTEE",
      render(_, record) {
        return (
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(69, 160, 245, 0.2)] dark:bg-[#141414] mr-2">
              <img src={record?.grantee?.avatar} className="w-6 h-6 rounded-full" />
            </div>
            <div className="flex flex-col justify-center flex-none text-c-3 dark:text-b-8">
              <h3 className="text-ellipsis w-max-[130px]	truncate  text-base">{record?.grantee?.name}</h3>
              <p className="text-sm truncate text-ellipsis">{shortAddress(record?.grantee?.mainWallet)}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "STATUS",
      render(_, record) {
        const status = grantStatusList.find((item) => record.grant?.grantStatus === item.value);
        return (
          status && (
            <span
              className="text-center max-w-[100px] w-20 px-2 truncate border rounded"
              style={{
                color: status?.darkColor,
                borderColor: status?.darkColor,
              }}
            >
              {status?.text}
            </span>
          )
        );
      },
    },
    {
      title: "VESTING TYPE",
      render(_, record) {
        const type = grantType.find((item) => item.value === record?.grant?.grantType);
        return <span>{type?.label}</span>;
      },
    },
    {
      title: "LATEST VESTING",
      render(_, record) {
        return getLastVested(record?.grant?.vestingSchedule?.vestingDetail)?.date || "-";
      },
    },

    {
      title: "VESTED AMOUNT",
      render(_, record) {
        return formatDollar(record?.vestedAmount);
      },
    },

    {
      title: "TOTAL AMOUNT",
      render(_, record) {
        return formatDollar(record?.grant?.grantNum);
      },
    },
  ];

  return (
    <div className="mb-10 dark:text-white">
      <table className="min-w-full text-xs text-center">
        <thead className="h-12 font-medium">
          <tr>
            {columns.map((v) => {
              return (
                <th scope="col" className="px-6 py-4 bg-[#f6fafe]  dark:bg-[#191919]" key={v.title}>
                  {v.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {list.slice((current - 1) * pageSize, current * pageSize).map((v) => {
            return (
              <tr key={v?.grant?.grantId}>
                {columns.map((c) => {
                  return (
                    <td className="py-2 " key={c.title}>
                      {c.render(null, v)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end pt-2">
        <Pagination
          hideOnSinglePage
          responsive
          showSizeChanger={false}
          current={current}
          pageSize={pageSize}
          total={list.length}
          onChange={setCurrent}
        />
      </div>
    </div>
  );
}
