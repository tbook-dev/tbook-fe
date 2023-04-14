import React from "react";
import { Table } from "antd";
import { conf } from "@tbook/utils";
import ThemeProvider from "@/theme/ThemeProvider";

const { grantStatusList, grantType, formatDollar, shortAddress, getLastVested } = conf;

export default function ({ list = [], loading = false }) {
  const columns = [
    {
      title: "GRANT ID",
      align: "center",
      render: (_, v) => v?.grant?.grantId,
    },
    {
      title: "GRANTEE",
      align: "center",
      dataIndex: "granteeId",
      render(_, record) {
        return (
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-[#141414] mr-2">
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
      align: "center",
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
      align: "center",
      render(_, record) {
        const type = grantType.find((item) => item.value === record?.grant?.grantType);
        return <span>{type?.label}</span>;
      },
    },
    {
      title: "LATEST VESTING",
      align: "center",
      render(_, record) {
        return getLastVested(record?.grant?.vestingSchedule?.vestingDetail)?.date || "-";
      },
    },

    {
      title: "VESTED AMOUNT",
      align: "center",
      render(_, record) {
        return formatDollar(record?.vestedAmount);
      },
    },

    {
      title: "TOTAL AMOUNT",
      align: "center",
      render(_, record) {
        return formatDollar(record?.grant?.grantNum);
      },
    },
  ];

  return (
    <ThemeProvider>
      <Table
        loading={loading}
        columns={columns}
        rowKey={(record) => record?.grant?.grantId}
        dataSource={Array.from(list)}
        scroll={{ x: 928 }}
        size="small"
        pagination={{ size: "default" }}
      />
    </ThemeProvider>
  );
}
