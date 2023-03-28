import React, { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { conf } from "@tbook/utils";

const { formatDollar } = conf;

const data = [
  {
    id: "c",
    label: "c",
    value: 2182,
    color: "hsl(78, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 108,
    color: "hsl(31, 70%, 50%)",
  },
  {
    id: "php",
    label: "php",
    value: 428,
    color: "hsl(154, 70%, 50%)",
  },
  {
    id: "python",
    label: "python",
    value: 58,
    color: "hsl(82, 70%, 50%)",
  },
  {
    id: "css",
    label: "css",
    value: 300,
    color: "hsl(322, 70%, 50%)",
  },
];

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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
      arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      tooltip={() => null}
      valueFormat={(v) => formatDollar(v)}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      // layers={[CenteredMetric, "slices", "sliceLabels", "radialLabels", "legends"]}
    />
  );

  function CenteredMetric({ centerX, centerY }) {
    console.log({ centerX, centerY });
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
          fill: "#333",
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

const App = () => {
  const [currentSelection, setCurrentSelection] = useState("");

  const handleButtonClick = (id) => {
    setCurrentSelection(id);
  };

  return (
    <div>
      <div style={{ height: "300px" }}>
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

export default App;
