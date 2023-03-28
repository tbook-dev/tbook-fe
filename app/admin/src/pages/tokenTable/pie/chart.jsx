import { Pie, G2 } from "@antv/g2plot";
import { useRef, useEffect } from "react";
const { registerTheme } = G2;

export default function Chart() {
  const pieRef = useRef(null);
  const pieInstance = useRef(null);
  useEffect(() => {
    const data = [
      { type: "分类一", value: 27 },
      { type: "分类二", value: 25 },
      { type: "分类三", value: 18 },
      { type: "分类四", value: 15 },
      { type: "分类五", value: 10 },
      { type: "其他", value: 5 },
    ];

    pieInstance.current = new Pie(pieRef.current, {
      theme: {
        colors10: [""],
      },
      appendPadding: 10,
      data,
      angleField: "value",
      colorField: "type",

      radius: 1,
      innerRadius: 0.8,
      meta: {
        value: {
          formatter: (v) => `¥ ${v}`,
        },
      },
      label: {
        type: "inner",
        offset: "-50%",
        autoRotate: false,
        style: { textAlign: "center" },
        formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      },
      statistic: {
        title: {
          offsetY: -8,
        },
        content: {
          offsetY: -4,
        },
      },
      legend: false,
      // 添加 中心统计文本 交互
      interactions: [
        { type: "element-selected" },
        { type: "element-active" },
        {
          type: "pie-statistic-active",
          cfg: {
            start: [
              { trigger: "element:mouseenter", action: "pie-statistic:change" },
              { trigger: "legend-item:mouseenter", action: "pie-statistic:change" },
            ],
            end: [
              { trigger: "element:mouseleave", action: "pie-statistic:reset" },
              { trigger: "legend-item:mouseleave", action: "pie-statistic:reset" },
            ],
          },
        },
      ],
    });

    pieInstance.current.render();

    return () => {};
  }, []);
  return <div ref={pieRef} className="w-[220px] h-[220px]" />;
}
