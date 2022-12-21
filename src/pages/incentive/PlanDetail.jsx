import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IncentiveLayout from "./Layout";
import { getTIPInfo } from "@/api/incentive";

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
      <div className="pt-8 pl-16">
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
          {/* Billing Information */}
          <div>
            <div className="space-y-4">
              {/* 1st row */}
              <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex">
                  <label
                    className="w=64 text-sm font-bold mb-1 after:content-[' : ']"
                    htmlFor="tipName"
                  >
                    TIP Name
                  </label>
                  <span
                    id="tipName"
                    name="tipName"
                    className="flex-auto w-64 w-full"
                  ></span>
                </div>
              </div>
              <hr className="my-6 border-t border-slate-200" />
              <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex">
                  <label
                    className="w-64 text-sm font-bold mb-1 after:content-[' : ']"
                    htmlFor="totalToken"
                  >
                    Total virtual token
                  </label>
                  <span
                    id="totalToken"
                    name="totalToken"
                    className="flex-auto w-64 w-full"
                  ></span>
                </div>
              </div>
              {/* 2nd row */}
              <hr className="my-6 border-t border-slate-200" />
              <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex">
                  <label
                    className="w-64 text-sm font-bold mb-1 after:content-[' : ']"
                    htmlFor="tipForType"
                  >
                    TIP for
                  </label>
                  <span className="flex-auto w-64 w-full"></span>
                </div>
              </div>
              <hr className="my-6 border-t border-slate-200" />
              <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex">
                  <label
                    className="w-64 text-sm font-bold mb-1 after:content-[' : ']"
                    htmlFor="prefix"
                  >
                    Prefix (E.g ES)
                  </label>
                  <span id="prefix" className="flex-auto w-64 w-full"></span>
                </div>
              </div>
              {/* 3rd row */}
              <hr className="my-6 border-t border-slate-200" />
              <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex">
                  <label
                    className="w-64 text-sm font-bold mb-1 after:content-[' : ']"
                    htmlFor="poorForTip"
                  >
                    Poor for this tip
                  </label>
                  <span className="flex-auto w-64 w-full"></span>
                </div>
              </div>
            </div>
          </div>
          {/* Divider */}
          <hr className="my-6 border-t border-slate-200" />
        </div>
      </div>
    </IncentiveLayout>
  );
}

export default PlanDetail;
