import { Table } from "antd";
import React from "react";

export default function VestingSchedule({ dataList = [], ...props }) {
  const Title = () => {
    return (
      <h2 className="font-bold text-base	inline">
        All The Grants <p className="font-light	 inline">{dataList.length}</p>
      </h2>
    );
  };
  return <Table title={Title}></Table>;
}
