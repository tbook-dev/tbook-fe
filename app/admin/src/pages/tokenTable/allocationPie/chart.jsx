import React, { useMemo } from "react";
import { ResponsivePie } from "@nivo/pie";
import { conf } from "@tbook/utils";
import { round } from "lodash";
const { formatDollar, getDividePercent } = conf;

const PieChart = ({ data, total }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      sortByValue={true}
      innerRadius={0.85}
      activeOuterRadiusOffset={4}
      colors={(v) => {
        return data.find((e) => e.id === v.id)?.color;
      }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "0.2"]],
      }}
      enableArcLabels={false}
      arcLinkLabel={function (e) {
        return round(e.data.percentage, 2) + "%";
      }}
      arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      arcLinkLabelsThickness={1}
      arcLinkLabelsTextOffset={2}
      arcLinkLabelsOffset={0}
      arcLinkLabelsDiagonalLength={10}
      arcLinkLabelsStraightLength={6}
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
    "#394496",
    "#4D79B6",
    "#6AB3F7",
    "#7EDDFF",
    "#67EBD4",
    "#A4F8B3",
    "#DFFFAD",
    "#FFFB94",
    "#FFE68A",
    "#FFC076",
    "#E78E63",
    "#DB4A49",
    "#B93A84",
    "#623A92",
  ];
  return list.map((v, idx) => ({ ...v, color: colorPannel[idx % 14] }));
};
const Chart = ({ data, width, height, totalToken }) => {
  const formatData = useMemo(() => {
    const sum = data.reduce((sum, item) => sum + item.tokenNum, 0);

    const l1 = giveColorToList(data);
    const l2 = l1.map((v, idx) => ({
      label: v.label,
      percentage: v.percentage,
      value: v.tokenNum,
      color: v.color,
      id: idx,
    }));
    return [
      ...l2,
      {
        label: "Free",
        percentage: getDividePercent(totalToken - sum, totalToken, 2),
        value: totalToken - sum,
        color: "#666",
        id: -1,
      },
    ];
  }, [data, totalToken]);

  return (
    <div style={{ width }}>
      <div style={{ height }}>
        <PieChart data={formatData} total={totalToken} />
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
