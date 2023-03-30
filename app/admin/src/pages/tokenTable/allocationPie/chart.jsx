import React, { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { conf } from "@tbook/utils";

const { formatDollar } = conf;

const PieChart = ({ data, setCurrentSelection, currentSelection }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const handleMouseEnter = (datum, event) => {
    setCurrentSelection(datum.id);
  };

  const handleMouseLeave = (datum, event) => {
    setCurrentSelection("");
  };

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
        return e.value + "%";
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

const SelectionButton = ({ label, onClick }) => (
  <button style={{ margin: "5px" }} onClick={onClick}>
    {label}
  </button>
);

const Chart = ({ data, width, height }) => {
  const [currentSelection, setCurrentSelection] = useState("");

  const handleButtonClick = (id) => {
    setCurrentSelection(id);
  };

  return (
    <div style={{ width }}>
      <div style={{ height }}>
        <PieChart data={data} setCurrentSelection={setCurrentSelection} currentSelection={currentSelection} />
      </div>
      <div className="flex flex-wrap">
        {data.map((v) => {
          return (
            <div className="flex items-center mb-1 mr-4">
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
