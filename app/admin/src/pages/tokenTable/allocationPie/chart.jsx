import React, { useMemo, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { conf } from "@tbook/utils";
import { useFindAudience } from "@tbook/hooks";
import { round } from "lodash";
const { formatDollar } = conf;

const PieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      sortByValue={true}
      innerRadius={0.85}
      activeOuterRadiusOffset={4}
      colors={{ scheme: "nivo" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "0.2"]],
      }}
      enableArcLabels={false}
      arcLinkLabel={function (e) {
        return round(e.data.percentage, 2) + "%";
      }}
      arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      arcLinkLabelsThickness={0}
      arcLinkLabelsTextOffset={0}
      arcLinkLabelsOffset={8}
      arcLinkLabelsDiagonalLength={0}
      arcLinkLabelsStraightLength={0}
      arcLinkLabelsColor={{ from: "color" }}
      tooltip={() => null}
      valueFormat={(v) => formatDollar(v)}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      layers={["arcs", "arcLabels", "arcLinkLabels", "legends", CenteredMetric]}
    />
  );

  function CenteredMetric({ centerX, centerY }) {
    return (
      <g>
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            fill: "#fff",
          }}
        >
          {formatDollar(total)}
        </text>
        <text
          x={centerX}
          y={centerY + 14}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "14px",
            fill: "#fff",
          }}
        >
          MAX TOTAL SUPPLY
        </text>
      </g>
    );
  }
};

const giveColorToList = (list) => {
  const colorPannel = [
    "#1f77b4", // 深蓝色
    "#ff7f0e", // 橙色
    "#2ca02c", // 绿色
    "#d62728", // 红色
    "#9467bd", // 紫色
    "#8c564b", // 棕色
    "#e377c2", // 粉色
    "#7f7f7f", // 灰色
    "#bcbd22", // 黄绿色
    "#17becf", // 天蓝色
  ];
  return list.map((v, idx) => ({ ...v, color: colorPannel[idx % 10] }));
};
const Chart = ({ data, width, height }) => {
  const [currentSelection, setCurrentSelection] = useState("");
  const findAudience = useFindAudience();

  const formatData = useMemo(() => {
    const l1 = giveColorToList(data);
    const l2 = l1.map((v, idx) => ({
      label: findAudience(v.target),
      percentage: v.percentage,
      value: v.tokenNum,
      color: v.color,
      id: idx,
    }));
    return l2;
  }, [data]);

  return (
    <div style={{ width }}>
      <div style={{ height }}>
        <PieChart data={formatData} setCurrentSelection={setCurrentSelection} currentSelection={currentSelection} />
      </div>
      <div className="flex flex-wrap">
        {formatData.map((v, idx) => {
          return (
            <div className="flex items-center mb-1 mr-4" key={idx}>
              <i className="w-2 h-2 mr-1 rounded-full" style={{ backgroundColor: v.color }} />
              <span className="font-medium text-c4">{v.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chart;
