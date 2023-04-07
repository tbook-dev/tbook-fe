import Liquidfill from "@/components/liquidfill";
import { useMemo, useState } from "react";
import { useCurrentProject } from "@tbook/hooks";
import { Spin } from "antd";
import Select from "@/components/select/themeSelect";
import { round } from "lodash";
import { conf } from "@tbook/utils";
import Pagination from "@/components/pagination";

const { formatDollar, getDividePercent } = conf;

export default function Pie({ dilutedToken, dilutedTokenloading }) {
  // const [dilutedToken, setDilutedToken] = useState([]);
  // const [dilutedTokenloading, setDilutedTokenloading] = useState(false);
  // const projectId = useCurrentProjectId();
  const [current, setCurrent] = useState(1);
  const project = useCurrentProject();
  const [planFilter, setPlanFilter] = useState(-1);

  const pageSize = 6;
  const tokenTotalAmount = project?.tokenInfo?.tokenTotalAmount || 100000000;

  const totalPercent = useMemo(() => {
    const distributedTotal = dilutedToken
      .filter((v) => v.tipId === planFilter)
      .reduce((sum, item) => sum + item.tokenSum, 0);
    return getDividePercent(distributedTotal, tokenTotalAmount, 2);
  }, [tokenTotalAmount, dilutedToken, planFilter]);

  const planTypeList = useMemo(() => {
    const sortedList = dilutedToken
      .reduce((pre, cur) => {
        if (pre.find((v) => v.value === cur.tipId)) {
          return pre;
        } else {
          return [...pre, { value: cur.tipId, label: cur.tipName }];
        }
      }, [])
      .sort((a, b) => a.value - b.value);
    const [others, all, ...normal] = sortedList;
    return [all, ...normal, others].filter(Boolean);
  }, [dilutedToken]);

  return (
    <div className="p-3 mb-4 bx lg:p-6 lg:mb-10 rect-border bg-[#f6fafe] dark:bg-transparent">
      {dilutedTokenloading ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <>
          <div className="mb-3 grid grid-cols-1 lg:grid-cols-2 gap-y-2.5 lg:gap-y-0 lg:gap-x-12">
            <h2 className="mb-3 font-medium text-c13 lg:mb-0">Diluted Token Distribution</h2>
            {planTypeList.length > 0 && (
              <div className="flex justify-center lg:justify-end">
                <Select
                  options={planTypeList}
                  className="w-[200px]"
                  value={planFilter}
                  onChange={(v) => {
                    setPlanFilter(v);
                    setCurrent(1);
                  }}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2.5 lg:gap-y-0 lg:gap-x-12">
            <Liquidfill percent={totalPercent} className="self-center justify-self-center" />
            <div className="space-y-4  w-full lg:w-[342px] justify-self-end	 lg:h-[380px]">
              {dilutedToken.length > 0 ? (
                dilutedToken
                  .filter((v) => v.tipId === planFilter)
                  .sort((a, b) => (a.tokenSum - b.tokenSum > 0 ? -1 : 1))
                  .slice((current - 1) * pageSize, current * pageSize)
                  .map((v, idx) => (
                    <div
                      className="flex items-center justify-between w-full px-4 py-3 font-medium bg-white rounded dark:bg-b-1"
                      key={idx}
                    >
                      <p className="text-c14">
                        <span>{round(v.percentage, 10)}%</span>
                        <span className="ml-1">{v.granteeName}</span>
                      </p>
                      <p className="text-c4">{formatDollar(v.tokenSum)} Tokens</p>
                    </div>
                  ))
              ) : (
                <div className="w-full px-4 py-3 font-medium text-center rounded bg-b-1">
                  <p className="text-c14">No diluted token distribution</p>
                </div>
              )}
              <div className="flex justify-end">
                <Pagination
                  hideOnSinglePage
                  responsive
                  showSizeChanger={false}
                  current={current}
                  pageSize={pageSize}
                  total={dilutedToken.filter((v) => v.tipId === planFilter).length}
                  onChange={setCurrent}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
