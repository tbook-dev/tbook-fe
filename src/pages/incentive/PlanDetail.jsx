import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import IncentiveLayout from "./Layout";
import { getTIPInfo, getTipGrantees, getTipGrantList } from "@/api/incentive";
import { Button } from "antd";
import { targetMap, formatDollar } from "../../utils/const";
import GrantTable from "./GrantTable";
import { getDividePercent } from "@/utils/const";
import useCurrentProject from "@/hooks/useCurrentProject";
import KV from "../../components/local/KV3";

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
  const project = useCurrentProject();

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
    <div className="py-8 pl-16 pr-[20px]">
      <div className="mb-6 lg:mb-0">
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-bold md:text-3xl text-slate-800">
            Token Incentive Plan Details
          </h1>
        </header>

        <div className="text-[#1E293B] mb-8 relative">
          <h2 className="mb-4 text-2xl	text-[#1E293B] font-semibold">Plan</h2>
          <div className="grid grid-cols-7 gap-x-6">
            <div className="grid grid-cols-2 col-span-4 gap-x-6 gap-y-4">
              <KV
                clx="col-span-1"
                label="Name"
                value={detail.incentivePlanName}
              />
              <KV
                clx="col-span-1"
                label="Target Audience"
                value={targetMap[detail.target]}
              />

              <KV
                clx="col-span-1"
                label="Grantees"
                value={formatDollar(granteeNum)}
              />
              <KV
                clx="col-span-1"
                label="Grants"
                value={formatDollar(grantList?.length)}
              />
              <KV
                clx="col-span-1"
                label="Grants Token"
                value={formatDollar(detail.grantedTokenNum)}
              />
              <KV
                clx="col-span-1"
                label="Vested Token"
                value={formatDollar(detail.vestedTokenNum)}
              />
            </div>
            <div className="col-span-3">
              <div className="flex items-center col-span-full">
                <p className="text-sm text-[#94A3B8] mr-6">
                  Token Options Pool Size
                </p>
                <h3 className="text-base	font-medium	text-[#1E293B] mr-1">
                  {formatDollar(detail.totalTokenNum)} Token
                </h3>
                <p className="text-xs text-[#475569]">
                  (
                  {getDividePercent(
                    detail.totalTokenNum,
                    project?.tokenInfo?.tokenTotalAmount
                  )}
                  % of Total Token)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="relative mb-2.5">
          <h2 className="mb-4 text-2xl	text-[#1E293B] font-semibold">Grants</h2>
          <div className="absolute top-0 right-0">
            <Link to={`/incentive/grant/${id}/create`}>
              <Button type="primary"> + New Grant</Button>
            </Link>
          </div>
        </div>
        {grantList.length > 0 ? (
          <GrantTable list={grantList} />
        ) : (
          <div className="border-x border-y bg-white  py-3 text-base	font-medium text-[#1E293B] indent-8">
            There's not any Grant for now. Click and Create one!
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanDetail;
