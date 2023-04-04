import * as echarts from "echarts/core";
import { GraphicComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GraphicComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);
import React, { useMemo, useEffect, useRef } from "react";
import { conf } from "@tbook/utils";
const { formatDollar, getDividePercent } = conf;

import { useResponsive } from "ahooks";

const getColor = (idx) => {
  const colors = [
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
  return colors[idx % 14];
};
const Chart = ({ data, totalToken, width, height }) => {
  const ref = useRef(null);
  const { pc } = useResponsive();
  const chart = useRef(null);

  useEffect(() => {
    chart.current = echarts.init(ref.current, "dark");
    const sum = data.reduce((sum, item) => sum + item.value, 0);
    const reData = [
      ...data,
      {
        name: "Free",
        percentage: getDividePercent(totalToken - sum, totalToken, 2),
        value: totalToken - sum,
        id: -1,
      },
    ];

    const option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        formatter(param) {
          return `${param.name} : ${param.data.percentage}%`;
        },
      },
      graphic: [
        {
          type: "text",
          left: "center",
          top: "middle",
          style: {
            text: `${formatDollar(totalToken)}\nMAX TOTAL SUPPLY`, // 设置文本
            textAlign: "center",
            fill: "#fff", // 设置文本颜色
            fontSize: pc ? 16 : 14, // 设置字号
          },
        },
      ],
      series: [
        {
          type: "pie",
          radius: ["50%", "60%"],
          data: reData,
          itemStyle: {
            color(param) {
              if (param.data.name === "Free") {
                return "#666";
              }
              return getColor(param.dataIndex);
            },
          },
        },
      ],
    };
    chart.current.setOption(option);
    return () => {
      chart.current.dispose();
    };
  }, [data, totalToken]);
  return <div ref={ref} style={{ width: width || pc ? 400 : 300, height: height || pc ? 400 : 300 }} />;
};
export default Chart;
