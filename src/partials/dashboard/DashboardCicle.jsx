import React, { useMemo } from "react";
import { Pie } from "@ant-design/plots";


const defaultData = {
  Employee: 1,
  Adviser: 1,
  Inverstor: 1,
};
function DashboardAudience({ title, data = defaultData,...props }) {
  const formatData = (obj) => {
    return Object.entries(obj).reduce(
      (all, cur) => {
        all.push({ type: cur[0], value: cur[1] });
        return all;
      },
      []
    );
  };
  const pieData = formatData(data);
  console.log("pieData->", pieData);
  const config = {
    appendPadding: 20,
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.8,
    label: {
      type: "inner",
      content: "",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: false,
    },
  };

  return (
    <div className="flex flex-col bg-white border rounded-sm shadow-lg col-span-full sm:col-span-6 xl:col-span-4 border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {/* <DoughnutChart data={chartData} width={180} height={180} /> */}
      <Pie {...config} {...props}/>
    </div>
  );
}

export default DashboardAudience;
