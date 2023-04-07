import * as echarts from "echarts/core";
import { GraphicComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import React, { useEffect, useRef } from "react";
import { conf } from "@tbook/utils";
import { useResponsive } from "ahooks";
import { useTheme } from "@tbook/hooks";

const { formatDollar, colors } = conf;

echarts.use([GraphicComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

const getColor = (idx) => colors[idx % 14];

const Chart = ({ data, totalToken, width, height }) => {
  const ref = useRef(null);
  const { pc } = useResponsive();
  const chart = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    chart.current = echarts.init(ref.current, theme);

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
          data,
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
  }, [data, totalToken, theme]);
  return <div ref={ref} style={{ width: width || pc ? 400 : 300, height: height || pc ? 400 : 300 }} />;
};
export default Chart;
