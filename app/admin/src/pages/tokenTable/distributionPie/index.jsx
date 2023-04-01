import Liquidfill from "@/components/liquidfill";
import { useState } from "react";
import { useAsyncEffect } from "ahooks";
import { getDilutedToken } from "@/api/incentive";
import { useCurrentProjectId } from "@tbook/hooks";
import { Spin } from "antd";
import { round } from "lodash";
import { conf } from "@tbook/utils";
import Pagination from "@/components/pagination";
const { formatDollar } = conf;

export default function Pie() {
  const [dilutedToken, setDilutedToken] = useState([]);
  const [dilutedTokenloading, setDilutedTokenloading] = useState(false);
  const projectId = useCurrentProjectId();
  const [current, setCurrent] = useState(1);
  const pageSize = 6;

  useAsyncEffect(async () => {
    if (!projectId) return;
    setDilutedTokenloading(true);
    const list = await getDilutedToken(projectId);
    setDilutedToken(list);
    setDilutedTokenloading(false);
  }, [projectId]);

  return (
    <div className="p-3 mb-4 bx lg:p-6 lg:mb-10 rect-border">
      {dilutedTokenloading ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : (
        <>
          <h2 className="font-medium text-c13 lg:mb-4">Diluted Token Distribution</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
            <Liquidfill data={[]} className="self-center lg:justify-self-end justify-self-center" />
            <div className="space-y-4 w-[342px] justify-self-start hidden lg:block">
              {dilutedToken.length > 0 ? (
                dilutedToken.slice((current - 1) * pageSize, current * pageSize).map((v, idx) => (
                  <div className="flex items-center justify-between px-4 py-3 font-medium rounded bg-b-1" key={idx}>
                    <p className="text-c14">
                      <span>{round(v.percentage, 2)}%</span>
                      <span className="ml-1">{v.granteeName}</span>
                    </p>
                    <p className="text-c4">{formatDollar(v.tokenSum)} Tokens</p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 font-medium text-center rounded bg-b-1">
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
                  total={dilutedToken.length}
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
