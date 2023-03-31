import Chart from "./chart";
import { Link } from "react-router-dom";
import editIcon from "@tbook/share/images/icon/edit.svg";

export default function Pie({ pieList }) {
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
        <div className="lg:justify-self-end justify-self-center">
          <Chart data={pieList} height={260} width={260} />
        </div>
        <div className="space-y-4 w-[342px] justify-self-start hidden lg:block">
          {list.length > 0 ? (
            list.map((v) => (
              <Link
                to={`/allocation?tpl=${v.versionId}`}
                className="flex items-center justify-between px-4 py-3 font-medium rounded bg-b-1"
                key={v.versionId}
              >
                <p className="text-c14">{v.versionName}</p>
                <p className="text-c4">{v.createDate}</p>
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 font-medium text-center rounded bg-b-1">
              <p className="text-c14">No version history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
