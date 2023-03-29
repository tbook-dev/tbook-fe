import { useAsyncEffect } from "ahooks";
import { useState } from "react";
import { Empty } from "@tbook/ui";
import { Link } from "react-router-dom";

export default function Template() {
  const [tplList, setTpl] = useState([]);
  useAsyncEffect(async () => {
    setTpl([
      {
        tplName: "Uniswap TemplateTemplateTemplateTemplate",
        latestValuation: 1000000,
        maxTokenSupply: 1000,
        holders: "500~100",
        plans: [
          {
            isForIncentive: false,
            name: "UniCommunityGrowth",
            targetAudience: 2,
            percent: 10,
            tokens: 2000,
          },
        ],
      },
      {
        tplName: "Binance Template1",
        latestValuation: 1000000,
        maxTokenSupply: 1000,
        holders: "500~100",
        plans: [
          {
            isForIncentive: false,
            name: "UniCommunityGrowth",
            targetAudience: 2,
            percent: 10,
            tokens: 2000,
          },
        ],
      },
      {
        tplName: "Binance Template2",
        latestValuation: 1000000,
        maxTokenSupply: 1000,
        holders: "500~100",
        plans: [
          {
            isForIncentive: false,
            name: "UniCommunityGrowth",
            targetAudience: 2,
            percent: 10,
            tokens: 2000,
          },
        ],
      },
    ]);
  }, []);

  return (
    <div>
      <h2 className="mb-2 font-bold text-c12 lg:text-c13">Open Template</h2>

      {tplList.length === 0 ? (
        <div className="h-[272px] rounded-xl bg-white dark:bg-b-1 flex items-center justify-center">
          <Empty description="COMING SOON" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 lg:gap-6 lg:grid-cols-3">
          {tplList.map((tpl) => (
            <div
              key={tpl.tplName}
              className="px-3 pt-1 pb-2 rounded-lg lg:px-4 lg:pt-2 lg:pb-6 lg:rounded-2xl lg:shadow-d6 shadow-d3"
            >
              <div className="h-[110px] w-[105px] mx-auto"></div>
              <h3 className="truncate font-bold text-center lg:text-left text-c9 lg:text-cwh2 mb-1.5 lg:mb-2">
                {tpl.tplName}
              </h3>
              <div className="mb-2 space-y-1 text-c4 lg:text-c16">
                <div className="flex justify-between">
                  <p>Plans</p>
                  <p>{tpl.plans.length}</p>
                </div>
                <div className="flex justify-between">
                  <p>Holders</p>
                  <p>{tpl.holders}</p>
                </div>
              </div>

              <Link className="lg:hidden">
                <button
                  type="button"
                  className="w-full text-c9 flex items-center justify-center h-10  font-medium leading-normal  rounded-md  dark:disabled:bg-none	dark:bg-cw1 dark:text-black shadow-d3 dark:disabled:bg-[#141414] dark:disabled:text-b-2"
                >
                  Use as yours
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
