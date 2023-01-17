import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import IncentiveLayout from "./Layout";
import { getTIPInfo, getTipGrantees, getTipGrantList } from "@/api/incentive";
import { Button, Statistic } from "antd";
import { targetMap } from "../../utils/const";
import GrantTable from "./GrantTable";
import { getDividePercent } from "@/utils/const";

function PlanDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    incentivePlanId: 0,
    projectId: 0,
    target: 2,
    status: 1,
    effectiveDate: "",
    incentivePlanName: "",
  });
  const [granteeNum, setGranteeNum] = useState(0);
  const [grantList, setGrantList] = useState([]);

  useEffect(() => {
    if (id) {
      getTIPInfo(id).then((res) => {
        setDetail(res);
      });
      getTipGrantees(id).then((res) => {
        setGranteeNum(res);
      });
      getTipGrantList(id).then((res) => {
        setGrantList(res);
      });
    }
  }, [id]);

  return (
    <IncentiveLayout>
      {/* Content */}
      <div className="py-8 pl-16 pr-[20px]">
        {/* Cart items */}
        <div className="mb-6  w-[1140px] lg:mb-0">
          <header className="mb-6">
            {/* Title */}
            <h1 className="mb-2 text-2xl font-bold md:text-3xl text-slate-800">
              Token Incentive Plan Details
            </h1>
          </header>

          <div className="text-[#1E293B] mb-8 relative">
            <div className="grid grid-cols-4 gap-1">
              <div>
                <p className="text-xs text-[#475569]">Name</p>
                <p className="text-base font-semibold">
                  {detail.incentivePlanName}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#475569]">Target Audience</p>
                <p className="text-base font-semibold">
                  {targetMap[detail.target]}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#475569]">
                  Token Options Pool Size
                </p>
                <div className="text-base">
                  <Statistic
                    value={detail.totalTokenNum}
                    valueStyle={{
                      color: "#1E293B",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                    suffix="Token"
                  />
                </div>
                <p className="text-xs text-[#475569]">
                  (
                  {getDividePercent(
                    detail.tokenOptionsPoolSize,
                    detail.totalTokenNum
                  )}
                  % of Total Token)
                </p>
              </div>
              <div>
                <p className="text-xs text-[#475569]">Grantees</p>
                <div className="text-base">
                  <Statistic
                    value={granteeNum}
                    valueStyle={{
                      color: "#1E293B",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-[#475569]">Grants</p>
                <div className="text-base">
                  <Statistic
                    value={grantList?.length}
                    valueStyle={{
                      color: "#1E293B",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                  />
                </div>
              </div>

              <div>
                <p className="text-xs text-[#475569]">Grants Token</p>
                <div className="text-base">
                  <Statistic
                    value={detail.grantedTokenNum}
                    // value={grantList.reduce((all, cur) => all+cur.grant.grantNum,0)}
                    valueStyle={{
                      color: "#1E293B",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-[#475569]">Vested Token</p>
                <div className="text-base font-semibold">
                  <Statistic
                    value={detail.vestedTokenNum}
                    valueStyle={{
                      color: "#1E293B",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="relative mb-2.5">
            <h2 className="mb-6 text-base font-semibold">Grants</h2>
            <div className="absolute top-0 right-0">
              <Link to={`/incentive/grant/${id}/create`}>
                <Button type="primary"> + New Grant</Button>
              </Link>
            </div>
          </div>
          {grantList.length > 0 ? (
            <GrantTable list={grantList} />
          ) : (
            <div className="border-x border-y bg-white  py-3 text-base	font-semibold text-[#1E293B] indent-8">
              There's not any Grant for now. Click and Create one!
            </div>
          )}
        </div>
      </div>
    </IncentiveLayout>
  );
}

export default PlanDetail;
