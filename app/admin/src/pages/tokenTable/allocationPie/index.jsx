import Chart from "./chart";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";
import editIcon from "@tbook/share/images/icon/edit.svg";
import { conf } from "@tbook/utils";
import { useMemo, useState } from "react";
import Pagination from "@/components/pagination";
import ThemeProvider from "@/theme/ThemeProvider";

const { getDividePercent, colors, colorsBg, hexToRgba } = conf;

export default function Pie({ pieList, totalToken, loading }) {
  const [current, setCurrent] = useState(1);
  const pageSize = 6;
  const reData = useMemo(() => {
    const l = pieList
      .map((v) => ({
        id: v.planId,
        name: v.planName,
        value: v.tokenNum,
        percentage: getDividePercent(v.tokenNum, totalToken, 10),
        holders: v.holders,
      }))
      .sort((a, b) => b.value - a.value);
    const sum = l.reduce((sum, item) => sum + item.value, 0);
    const free = totalToken - sum;

    return [
      ...l,
      {
        name: "Free",
        percentage: getDividePercent(free, totalToken, 10),
        value: free,
        id: -1,
        holders: "-",
      },
    ];
  }, [pieList, totalToken]);

  return (
    <div className="p-3 mb-4 bx lg:p-6 lg:mb-10 rect-border bg-[#f6fafe] dark:bg-transparent">
      <div className="flex justify-between lg:justify-start">
        <h2 className="font-medium lg:mr-4 text-c13">Token Allocation</h2>
        <Link to="/allocation" target="_blank">
          <img src={editIcon} className="w-8 h-8 rounded" />
        </Link>
      </div>

      <ThemeProvider>
        <div className="grid items-center grid-cols-1 gap-y-2.5 lg:grid-cols-2 lg:gap-x-12">
          <div className="self-center justify-self-center">
            {loading ? (
              <div className="flex items-center h-[300px] lg:h-[400px] justify-center">
                <div className="animate-pulse w-[200px] h-[200px] rounded-full border-8  border-[#d2d2d2] dark:border-[#303030]" />
              </div>
            ) : (
              <Chart data={reData} totalToken={totalToken} />
            )}
          </div>
          <div className="space-y-4 w-full lg:w-[342px] lg:h-[380px] justify-self-end">
            {loading ? (
              <Skeleton active loading={loading} title={false} paragraph={{ rows: 6 }} key={-1} />
            ) : (
              reData.slice((current - 1) * pageSize, current * pageSize).map((v, idx) => {
                const c = v.name === "Free" ? "#666" : colors[(idx + (current - 1) * pageSize) % colors.length];
                const bg = v.name === "Free" ? "#666" : colorsBg[(idx + (current - 1) * pageSize) % colorsBg.length];
                return (
                  <div
                    key={v.id}
                    className="flex items-center justify-between h-10 px-4 py-1 font-medium border-l-4 rounded bg-b-1"
                    style={{ borderColor: c, backgroundColor: hexToRgba(bg, 0.04) }}
                  >
                    <div>
                      <p className="font-semibold text-c14">
                        <span className="mr-1 " style={{ color: c }}>
                          {v.percentage}%
                        </span>
                        {v.name}
                      </p>
                      <p className="text-xs text-c-9">
                        <span className="mr-1">{v.value}</span>Tokens
                      </p>
                    </div>
                    <div className="text-right">
                      {v.id !== -1 && (
                        <>
                          <p className="font-semibold text-c14">{v.holders}</p>
                          <p className="text-xs text-c-9">Holders</p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div className="flex justify-end">
              <Pagination
                hideOnSinglePage
                responsive
                showSizeChanger={false}
                current={current}
                pageSize={pageSize}
                total={reData.length}
                onChange={setCurrent}
              />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
