import React, { useMemo } from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

const defaultData = {
  Employee: 1,
  Adviser: 1,
  Inverstor: 1,
};
function DashboardAudience({ title, data = defaultData }) {
  const formatData = (obj) => {
    return Object.entries(obj).reduce(
      (all, cur) => {
        all.label.push(cur[0]);
        all.data.push(cur[1]);
        return all;
      },
      { label: [], data: [] }
    );
  };
  const {label: clabel, data: cData} = formatData(data)
  const chartData = {
    labels: clabel,
    datasets: [
      {
        label: title,
        data: cData,
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={180} height={180} />
    </div>
  );
}

export default DashboardAudience;
