import { useRef } from "react";
import Chart from "./chart";

export default function Pie() {
  return (
    <div className="p-3 bx lg:p-6">
      <h2 className="font-medium text-c13">Fully Diluted Token </h2>
      <div className="flex flex-col ">
        <Chart />
      </div>
    </div>
  );
}
