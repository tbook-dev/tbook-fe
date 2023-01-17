import React from "react";
import { Table, Statistic } from "antd";

export default function VestingSchedule({ dataList = [], ...props }) {
  const Title = () => {
    return (
      <h2 className="inline text-base font-bold">
        All The Grants <p className="inline font-light">{dataList.length}</p>
      </h2>
    );
  };
  const StatisticStyle = {
    margin: 0,
    fontSize: "14px",
    lineHeight: "20px",
  };
  const col = [
    {
      title: "#",
      dataIndex: "idx",
      align: "center",
      render(v) {
        return <span className="text-[#38BDF8] text-sm">{v}</span>;
      },
    },
    {
      title: "Vesting Date",
      dataIndex: "date",
      align: "center",
      className: "text-sm",
    },
    {
      title: "Vested Amount",
      dataIndex: "quantity",
      align: "center",

      render(v) {
        return <Statistic value={v} valueStyle={StatisticStyle} />;
      },
    },
    {
      title: "Cumulative",
      align: "center",
      render(_, record) {
        const list = dataList.slice(0, record.idx);
        const sum = list.reduce((pre, cur) => pre + cur.quantity, 0);
        // console.log(record, idx, sum);
        return <Statistic value={sum} valueStyle={StatisticStyle} />;
      },
    },
  ];
  return (
    <Table
      title={Title}
      columns={col}
      rowKey="idx"
      rowClassName={(record) => {
        return record.isVested ? "bg-[#E9EFFF]" : "";
      }}
      dataSource={dataList.map((item, idx) => ({ ...item, idx: idx + 1 }))}
      {...props}
    />
  );
}
