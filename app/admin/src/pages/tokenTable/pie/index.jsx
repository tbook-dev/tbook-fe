import Chart from "./chart";

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
    <div className="p-3 bx lg:p-6">
      <h2 className="font-medium text-c13">Fully Diluted Token </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <Chart data={data} />
        <div>
          {data.map((v) => {
            return <div> </div>;
          })}
        </div>
      </div>
    </div>
  );
}
