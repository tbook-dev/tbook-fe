import Liquidfill from "@/components/liquidfill";
import { useMemo, useState } from "react";
import { useCurrentProject } from "@tbook/hooks";
import Select from "@/components/select/themeSelect";
import { round } from "lodash";
import { conf } from "@tbook/utils";
import Pagination from "@/components/pagination";
import { Skeleton } from "antd";
import ThemeProvider from "@/theme/ThemeProvider";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useResponsive } from "ahooks";

const { formatDollar, getDividePercent } = conf;

export default function Pie({ dilutedToken, loading }) {
  // const [dilutedToken, setDilutedToken] = useState([]);
  // const [dilutedTokenloading, setDilutedTokenloading] = useState(false);
  // const projectId = useCurrentProjectId();
  const { pc } = useResponsive();
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
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-medium text-c13">Diluted Token Distribution</h2>
          <p className="text-xs">Add historical token grants and investments, and complete your tokentable. </p>
        </div>

        <Link to="/create/plan" className="justify-self-end">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 text-xs font-medium leading-normal text-black transition duration-150 ease-in-out bg-black rounded-md justify-self-end lg:text-white bg-cw1 dark:text-black lg:bg-none lg:hover:opacity-70 lg:hover:dark:opacity-100 lg:w-40 lg:h-10 lg:dark:bg-white lg:dark:bg-none lg:rounded-lg lg:dark:text-black shadow-d3 lg:dark:hover:text-white lg:dark:hover:bg-cw1 lg:hover:shadow-d7"
          >
            <PlusOutlined style={pc ? null : { fontSize: "16px" }} />
            <span className="ml-2 text-[14px] hidden lg:inline">New Record</span>
          </button>
        </Link>
      </div>

      <ThemeProvider>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2.5 lg:gap-y-0 lg:gap-x-12">
          {loading ? (
            <div className="self-center justify-self-center">
              <Skeleton.Image active />
            </div>
          ) : (
            <div className="self-start w-full justify-self-center">
              {planTypeList.length > 0 && (
                <div className="flex justify-center mb-6 lg:justify-start">
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
              <div className="flex justify-center">
                <Liquidfill percent={totalPercent} />
              </div>
            </div>
          )}
          <div className="space-y-4  w-full lg:w-[342px] justify-self-end	 lg:h-[380px]">
            {loading ? (
              <Skeleton active title={false} paragraph={{ rows: 6 }} />
            ) : dilutedToken.length > 0 ? (
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
      </ThemeProvider>
    </div>
  );
}
