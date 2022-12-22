import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IncentiveLayout from "./Layout";
import { getTIPInfo } from "@/api/incentive";
import { Button } from "antd";

function PlanDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    incentivePlanId: 0,
    projectId: 0,
    target: 2,
    status: 1,
    effectiveDate: "",
  });

  useEffect(() => {
    getTIPInfo(id).then((res) => {
      setDetail(res);
    });
  }, []);

  return (
    <IncentiveLayout>
      {/* Content */}
      <div className="pt-8 pl-16 w-[1140px]">
        {/* Cart items */}
        <div className="mb-6 lg:mb-0">
          <div className="mb-3">
            <div className="flex text-sm font-medium text-slate-400 space-x-2">
              <span className="text-slate-500">TIP</span>
              <span>-&gt;</span>
              <span className="text-[#6366F1]">TIP Info</span>
            </div>
          </div>
          <header className="mb-6">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-2">
              TIP Details
            </h1>
            <p className="text-xs	text-[#475569] mb-9">{detail.name}</p>
          </header>

          <div className="text-[#1E293B] mb-8 relative">
            <h2 className="text-base font-semibold mb-6">TIP Info</h2>

            <div className="absolute top-0 right-0">
              <Button type="primary">Edit</Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-xs text-[#475569]">Total Virtual Token</p>
                <p className="text-base font-semibold	">111 Token</p>
              </div>
              <div>
                <p className="text-xs text-[#475569]">
                  Token Options Size for the Plan
                </p>
                <p>
                  <span className="text-base font-semibold"></span>111 Token
                </p>
              </div>
              <div>
                <p className="text-xs text-[#475569]">Granted Token</p>
                <p className="text-base font-semibold	">800,000 Token</p>
              </div>
              <div>
                <p className="text-xs text-[#475569]">Target Audience</p>
                <p className="text-base font-semibold	">Employee</p>
              </div>
              <div>
                <p className="text-xs text-[#475569]">授予记录数</p>
                <p className="text-base font-semibold	">5</p>
              </div>
              <div>
                <p className="text-xs text-[#475569]">授予人数</p>
                <p className="text-base font-semibold	">50</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="relative mb-2.5">
              <h2 className="text-base font-semibold mb-6">Grants</h2>
              <p className="text-xs text-[#475569]">
                There’re all the grants in the TIP. Click on the right and
                create a new one!
              </p>
              <div className="absolute top-0 right-0">
                <Button type="primary"> + New Grant</Button>
              </div>
            </div>

            <div className="border-x border-y bg-white  py-3 text-base	font-semibold text-[#1E293B] indent-8">
              There's not any Grant for now. Click and Create one!
            </div>
          </div>
        </div>
      </div>
    </IncentiveLayout>
  );
}

export default PlanDetail;
