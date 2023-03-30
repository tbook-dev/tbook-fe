import { Pie } from "@antv/g2plot";
import { useRef, useEffect, forwardRef } from "react";

function Chart({ data = [] }, pieRef) {
  const domRef = useRef(null);
  useEffect(() => {
    pieRef.current = new Pie(domRef.current, {
      appendPadding: 10,
      data,
      angleField: "value",
      colorField: "type",
      radius: 1,
      innerRadius: 0.64,
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
            start: [{ trigger: "element:mouseenter", action: "pie-statistic:change" }],
            end: [{ trigger: "element:mouseleave", action: "pie-statistic:reset" }],
          },
        },
      ],
    });
    pieRef.current.render();
    return () => {
      pieRef.current.destroy();
    };
  }, []);
  return <div className="w-[240px] h-[240px]" ref={domRef} />;
}

export default forwardRef(Chart);
