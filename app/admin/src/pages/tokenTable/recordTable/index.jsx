import { useMemo, useState } from "react";
import { useResponsive } from "ahooks";
import { conf } from "@tbook/utils";
import { useFindAudience } from "@tbook/hooks";
import { round } from "lodash";
import { Empty } from "@tbook/ui";
import Pagination from "@/components/pagination";
import defaultAvator from "@tbook/share/images/icon/defaultAvator.svg";
import defaultAvator2 from "@tbook/share/images/icon/defaultAvator2.svg";
import { useTheme } from "@tbook/hooks";
const { formatDollar, shortAddress } = conf;

export default function RecordTable({ list }) {
  const { pc } = useResponsive();
  const tableHeaders = useMemo(() => ["HOLDER", "PLAN", "Target Audience", "TOTAL TOKEN", "Percentage"], []);
  const findAudience = useFindAudience();
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const theme = useTheme();

  return (
    <div className="p-3 mb-10 rect-border lg:py-6 lg:px-0 bg-[#f6fafe] dark:bg-transparent">
      <div className="flex items-center justify-between mb-3 lg:px-6">
        <h2 className="font-medium text-c12 lg:text-c13">Stakeholders</h2>
      </div>

      <div className="lg:border-t lg:border-b-1">
        <div className="hidden py-3 mx-3 font-bold text-center border-b lg:mx-0 lg:px-4 border-b-1 lg:grid-cols-5 lg:grid text-c5 text-c-9">
          {tableHeaders.map((v) => {
            return <div key={v}>{v}</div>;
          })}
        </div>
        {list.length > 0 ? (
          list.slice((current - 1) * pageSize, current * pageSize).map((v, idx) => {
            return pc ? (
              <div className="grid grid-cols-5 mx-4 border-b border-b-1" key={idx}>
                <div className="flex justify-center py-1">
                  <div className="w-10 h-10 rounded-full bg-[#ECF5FD] dark:bg-[#141414] flex justify-center items-center mr-2">
                    <img
                      src={v.avatar || (theme === "dark" ? defaultAvator : defaultAvator2)}
                      className="object-cover w-6 h-6"
                    />
                  </div>

                  <div className="flex flex-col justify-center flex-none dark:text-b-8">
                    <h3 className="text-ellipsis w-[115px] truncate  dark:text-b-8 text-c9">{v.granteeName}</h3>
                    {v.address && (
                      <p className="truncate w-[115px] text-ellipsis text-c14">{shortAddress(v.address)}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center font-medium text-c1">{v.tipName}</div>

                <div className="flex items-center justify-center">
                  <span className="max-w-[115px] text-c5 text-ellipsis truncate border border-black dark:border-white px-4 rounded">
                    {findAudience(v.target)}
                  </span>
                </div>
                <div className="flex items-center justify-center font-medium text-c1">{formatDollar(v.tokenSum)}</div>
                <div className="flex items-center justify-center font-medium text-c1">{round(v.percentage, 10)}%</div>
              </div>
            ) : (
              <div className="grid items-center grid-cols-2 mb-3" key={idx}>
                <div className="flex items-center justify-center ml-3">
                  <div className="w-7 h-7 rounded-full bg-[#ECF5FD] dark:bg-[#141414]  flex flex-none justify-center items-center mr-2">
                    <img
                      src={v.avatar || (theme === "dark" ? defaultAvator : defaultAvator2)}
                      className="object-cover w-4 h-4"
                    />
                  </div>

                  <div className="flex flex-col justify-center flex-none dark:text-b-8">
                    <h3 className="text-ellipsis w-[115px] truncate  dark:text-b-8 text-c8">{v.granteeName}</h3>
                    {v.address && <p className="truncate w-[115px] text-ellipsis text-c4">{shortAddress(v.address)}</p>}
                    {v.target && (
                      <div className="mt-px">
                        <span className="max-w-[115px] text-ellipsis truncate text-c15  border border-black dark:border-white px-2 py-px rounded">
                          {findAudience(v.target)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="mb-px font-bold text-c8">
                    {formatDollar(v.tokenSum)}({round(v.percentage, 10)}%)
                  </p>
                  <p className="font-bold text-c8">{v.tipName}</p>
                </div>
              </div>
            );
          })
        ) : (
          <Empty description="No Record" />
        )}
        <div className="flex justify-end pt-2">
          <Pagination
            hideOnSinglePage
            responsive
            showSizeChanger={false}
            current={current}
            pageSize={pageSize}
            total={list.length}
            onChange={setCurrent}
          />
        </div>
      </div>
    </div>
  );
}
