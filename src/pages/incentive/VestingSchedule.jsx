import React from "react";
import { Table } from "antd";
import { formatDollar} from '@/utils/const';
import { useResponsive } from "ahooks";


export default function VestingSchedule({ dataList = [], ...props }) {
  const { pc } = useResponsive();
  const col = [
    {
      title: "#",
      dataIndex: "idx",
      align: "left",
      className:"!font-normal !pr-0 before:hidden",
      width: pc? 'auto': 40,
      render(v) {
        return <span className="w-10">{v}</span>;
      },
    },
    {
      title: "Vesting Date",
      dataIndex: "date",
      align: "left",
      className:"!font-normal !p-0 before:hidden",
    },
    {
      title: "Vested Amount",
      dataIndex: "quantity",
      align: "right",
      className:"!font-normal !p-0 before:hidden",
      render(v) {
        return <span className="">{formatDollar(v)}</span>;
      },
    },
    {
      title: "Cumulative",
      align: "right",
      className:"!font-normal !pl-0",
      render(_, record) {
        const list = dataList.slice(0, record.idx);
        const sum = list.reduce((pre, cur) => pre + cur.quantity, 0);
        // console.log(record, idx, sum);
        return <span className="font-medium">{formatDollar(sum)}</span>;
      },
    },
  ];
  return (
    <Table
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
