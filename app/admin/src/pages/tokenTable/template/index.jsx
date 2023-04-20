import { useAsyncEffect } from "ahooks";
import { useState } from "react";
import Card from "./card";
import Select from "@/components/select/themeSelect";

const cateGoryList = [
  {
    label: "NFT",
    value: 0,
  },
  {
    label: "Defi",
    value: 1,
  },
];
const scenarioList = [
  {
    label: "cenario1",
    value: 0,
  },
  {
    label: "cenario2",
    value: 1,
  },
];
export default function Template({
  title = "Tokentable Templates",
  paragraph = "Discover innovative token table solutions by studying successful projects",
}) {
  const [tplList, setTpl] = useState([]);
  const [cateGory, setCateGory] = useState([]);
  const [scenario, setScenario] = useState([]);

  useAsyncEffect(async () => {
    setTpl([
      {
        id: 1,
        tplName: "Uniswap TemplateTemplateTemplateTemplate",
        latestValuation: 1000000,
        maxTokenSupply: 1000,
        holders: "500~100",
        tags: ["NFT", "Defi"],
        plans: [
          {
            isForIncentive: false,
            name: "UniCommunityGrowth",
            targetAudience: 2,
            percent: 10,
            tokens: 2000,
            // id: v.planId,
            // name: v.planName,
            // value: v.tokenNum,
            // percentage: getDividePercent(v.tokenNum, totalToken, 10),
          },
          {
            isForIncentive: false,
            name: "UniCommunityGrowth",
            targetAudience: 2,
            percent: 20,
            tokens: 4000,
          },
        ],
      },
      {
        id: 2,
        tplName: "Binance Template1",
        latestValuation: 1000000,
        maxTokenSupply: 1000,
        holders: "500~100",
        tags: ["Defi"],
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
        id: 3,
        tplName: "Binance Template2",
        latestValuation: 1000000,
        maxTokenSupply: 1000,
        holders: "500~100",
        tags: ["Defi"],
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
    <div className="mb-10 dark:text-white">
      <div className="mb-4 text-center">
        <h2 className="font-bold lg:mb-1 text-ch1 lg:text-cwh1">{title}</h2>
        <p className="mb-2 text-c15 lg:text-c18 lg:mb-4">{paragraph}</p>
        <div className="flex items-center justify-center space-x-2 lg:space-x-4">
          <Select
            options={cateGoryList}
            className="w-1/2 lg:w-[214px]"
            placeholder="Filter Catogeries"
            mode="multiple"
            allowClear
            onChange={(values) => {
              console.log(values);
            }}
          />
          <Select
            options={scenarioList}
            className="w-1/2 lg:w-[214px]"
            placeholder="Filter Scenarios"
            mode="multiple"
            allowClear
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:gap-6 lg:grid-cols-3">
        {tplList.map((tpl) => (
          <Card key={tpl.tplName} tpl={tpl} />
        ))}
      </div>
    </div>
  );
}
