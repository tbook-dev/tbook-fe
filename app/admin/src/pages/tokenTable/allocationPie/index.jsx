import Chart from "./chart";

// 使用默认数据来显示
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
export default function Pie() {
  return (
    <div className="p-3 mb-4 bx lg:p-6 lg:mb-10 rect-border">
      <h2 className="font-medium text-c13">Token Allocation</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <Chart data={data} />
      </div>
    </div>
  );
}
