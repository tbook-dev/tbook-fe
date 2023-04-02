import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useResponsive } from "ahooks";
import { conf } from "@tbook/utils";
import { useFindAudience } from "@tbook/hooks";
import { round } from "lodash";
import { Empty } from "@tbook/ui";

const { formatDollar, shortAddress } = conf;

export default function RecordTable({ list }) {
  const { pc } = useResponsive();
  const tableHeaders = useMemo(() => ["HOLDER", "Target Audience", "TOTAL TOKEN", "Percentage"], []);
  const findAudience = useFindAudience();

  return (
    <div className="p-3 mb-10 text-white rect-border lg:py-6 lg:px-0">
      <div className="flex items-center justify-between mb-3 lg:px-6">
        <h2 className="font-medium text-c12 lg:text-c13">Stakeholders</h2>
        <Link to="/record">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 text-xs font-medium leading-normal transition duration-150 ease-in-out rounded-md lg:w-40 lg:h-10 lg:dark:bg-white lg:rounded-lg dark:text-black shadow-d3 lg:hover:text-white lg:hover:bg-cw1 lg:hover:shadow-d7"
          >
            <PlusOutlined style={pc ? null : { color: "#69D0E5", fontSize: "16px" }} />
            <span className="ml-2 text-[14px] hidden lg:inline">New Record</span>
          </button>
        </Link>
      </div>

      <div className="lg:border-t lg:border-b-1">
        <div className="hidden py-3 mx-3 font-bold text-center border-b lg:mx-0 lg:px-4 border-b-1 lg:grid-cols-4 lg:grid text-c5 text-c-9">
          {tableHeaders.map((v) => {
            return <div key={v}>{v}</div>;
          })}
        </div>
        {list.length > 0 ? (
          list.map((v, idx) => {
            return pc ? (
              <div className="grid grid-cols-4 mx-4 border-b border-b-1" key={idx}>
                <div className="flex justify-center py-1">
                  {v.avatar && (
                    <div className="w-10 h-10 rounded-full bg-[#141414] flex justify-center items-center mr-2">
                      <img src={v.avatar} className="object-cover w-6 h-6" />
                    </div>
                  )}

                  <div className="flex flex-col justify-center flex-none text-b-8">
                    <h3 className="text-ellipsis w-[115px] truncate  text-b-8 text-c9">{v.granteeName}</h3>
                    {v.address && (
                      <p className="truncate w-[115px] text-ellipsis text-c14">{shortAddress(v.address)}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <span className="max-w-[115px] text-c5 text-ellipsis border border-white px-4 rounded">
                    {findAudience(v.target)}
                  </span>
                </div>
                <div className="flex items-center justify-center font-medium text-c1">{formatDollar(v.tokenSum)}</div>
                <div className="flex items-center justify-center font-medium text-c1">{round(v.percentage, 10)}%</div>
              </div>
            ) : (
              <div className="grid items-center grid-cols-2 mx-4 mb-3" key={idx}>
                <div className="flex items-center justify-center ml-3">
                  {v.avatar && (
                    <div className="w-7 h-7 rounded-full bg-[#141414] flex flex-none justify-center items-center mr-2">
                      <img src={v.avatar} className="object-cover w-4 h-4" />
                    </div>
                  )}

                  <div className="flex flex-col justify-center flex-none text-b-8">
                    <h3 className="text-ellipsis w-[115px] truncate  text-b-8 text-c8">{v.granteeName}</h3>
                    {v.address && <p className="truncate w-[115px] text-ellipsis text-c4">{shortAddress(v.address)}</p>}
                  </div>
                </div>

                <div className="text-right">
                  <p className="mb-px font-bold text-c8">
                    {formatDollar(v.tokenSum)}({round(v.percentage, 10)}%)
                  </p>
                  <div className="mb-1">
                    <span className="max-w-[115px] text-ellipsis  text-c15  border border-white px-2 py-px rounded">
                      {findAudience(v.target)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Empty description="No Record" />
        )}
      </div>
    </div>
  );
}
