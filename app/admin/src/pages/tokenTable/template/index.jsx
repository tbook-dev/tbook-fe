import { useAsyncEffect } from "ahooks";
import { useState } from "react";
import { Empty } from "@tbook/ui";
import { Link } from "react-router-dom";
import Card from "./card";

export default function Template() {
  const [tplList, setTpl] = useState([]);
  useAsyncEffect(async () => {
    setTpl([
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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

      <div className="grid grid-cols-2 gap-2.5 lg:gap-6 lg:grid-cols-3">
        {tplList.map((tpl) => (
          <Card key={tpl.tplName} tpl={tpl} />
        ))}
      </div>
    </div>
  );
}
