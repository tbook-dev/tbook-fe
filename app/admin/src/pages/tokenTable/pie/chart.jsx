import React, { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { conf } from "@tbook/utils";

const { formatDollar } = conf;

const PieChart = ({ data, setCurrentSelection, currentSelection }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const handleMouseEnter = (datum, event) => {
    console.log(event.target);
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
      innerRadius={0.8}
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
      hoverSlice
      arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      arcLinkLabelsThickness={2}
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
      <text
        x={centerX}
        y={centerY}
        width={100}
        heigth={100}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          fill: "#fff",
        }}
      >
        {currentSelection ? currentSelection : total}
      </text>
    );
  }
};

const SelectionButton = ({ label, onClick }) => (
  <button style={{ margin: "5px" }} onClick={onClick}>
    {label}
  </button>
);

const Chart = ({ data }) => {
  const [currentSelection, setCurrentSelection] = useState("");

  const handleButtonClick = (id) => {
    setCurrentSelection(id);
  };

  return (
    <div>
      <div style={{ height: "240px", width: "240px" }}>
        <PieChart data={data} setCurrentSelection={setCurrentSelection} currentSelection={currentSelection} />
      </div>
      <div>
        {data.map((item) => (
          <SelectionButton key={item.id} label={`Select ${item.label}`} onClick={() => handleButtonClick(item.id)} />
        ))}
      </div>
    </div>
  );
};

export default Chart;
