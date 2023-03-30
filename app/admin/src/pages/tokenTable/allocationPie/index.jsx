import Chart from "./chart";
import { Link } from "react-router-dom";
import editIcon from "@tbook/share/images/icon/edit.svg";

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
  {
    id: "css1",
    label: "css",
    value: 300,
    color: "hsl(322, 70%, 50%)",
  },
  {
    id: "css2",
    label: "css",
    value: 300,
    color: "hsl(322, 70%, 50%)",
  },
  {
    id: "css3",
    label: "css",
    value: 300,
    color: "hsl(322, 70%, 50%)",
  },
];
export default function Pie() {
  const list = [
    {
      versionName: "Version02",
      createDate: "01/03/2022",
      versionId: "1",
    },
    {
      versionName: "Version02",
      createDate: "01/03/2022",
      versionId: "2",
    },
    {
      versionName: "Version02",
      createDate: "01/03/2022",
      versionId: "3",
    },
  ];
  return (
    <div className="p-3 mb-4 bx lg:p-6 lg:mb-10 rect-border">
      <div className="flex justify-between lg:justify-start">
        <h2 className="font-medium lg:mr-4 text-c13">Token Allocation</h2>
        <Link to="/allocation">
          <img src={editIcon} className="w-8 h-8 rounded" />
        </Link>
      </div>

      <div className="grid items-center grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
        <Chart data={data} />
        <div className="space-y-4 w-[342px] justify-self-start hidden lg:block">
          {list.map((v) => (
            <Link
              to={`/allocation?tpl=${v.versionId}`}
              className="flex items-center justify-between px-4 py-3 font-medium rounded bg-b-1"
              key={v.versionId}
            >
              <p className="text-c14">{v.versionName}</p>
              <p className="text-c4">{v.createDate}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
