import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteButton from "../../partials/actions/DeleteButton";
import IncentivesTable from "../../partials/incentives/IncentivesTable";
import PaginationClassic from "../../components/PaginationClassic";
import IncentiveLayout from "./Layout";
import { useRequest } from "ahooks";
import { getIncentiveList } from "@/api/incentive";

function PlanList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { data: tipList = [] } = useRequest(getIncentiveList);
  const [tipIndex, setTipIndex] =  useState(0);
  const previewSize = 5;
  const maxIndex = Math.floor(tipList.length/previewSize);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  return (
    <IncentiveLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0 w-full">
            <h1 className="pb-6 text-3xl md:text-3xl text-slate-800 font-bold">
              Token Incentive Plans
            </h1>

            <div className="pb-14 pl-12 flex">
              <NavLink to={"/incentive/create"} className="w-[148px] h-[98px] flex-none shadow-c1 border rounded-[10px] mr-11">
                1
              </NavLink>

              <div className="w-[22px]  flex-none  cursor-pointer" 
                onClick={() => {
                setTipIndex(v => {
                  return Math.max(0, v - 1)
                })
              }}>
                左边箭头
              </div>

              <div className="flex-auto h-[98px] flex">
                {tipList.slice(tipIndex*previewSize, (tipIndex+1)*previewSize).map((tip) => {
                  return (
                    <NavLink
                      key={tip.projectId}
                      to={`/incentive/${tip.projectId}`}
                      className="mr-11"
                    >
                      <div className="w-[148px] h-[98px] shadow-c2 border rounded-[10px] relative">
                        <div className="text-base text-[#3A4353] pt-3.5 pl-1.5">
                          <p>{tip.name}</p>
                          <p>{tip.effectiveDate}</p>
                        </div>

                        <div className="absolute inset-x-0 h-1.5 overflow-hidden bottom-5 bg-[#CBD5E1]">
                          <div
                            className="h-1.5	bg-[#475569]"
                            style={{ width: tip.percentage + "%" }}
                          />
                        </div>

                        <div className="inset-x-0 absolute bottom-0 origin-left	scale-50 text-[#1E293B]">
                          Granted {tip.granted}
                        </div>
                        <div className="inset-x-0 absolute bottom-0 origin-right text-right	scale-50 text-[#1E293B]">
                          Total: {tip.total}
                        </div>
                      </div>
                    </NavLink>
                  );
                })}
              </div>

              <div className="w-[22px]  flex-none  cursor-pointer"
              // disable,tip
                onClick={() => {
                  setTipIndex(v => {
                    return Math.min(maxIndex, v + 1)
                  })
                }}
              >
                右边箭头
              </div>

            </div>
          </div>
        </div>

        {/* Table */}
        <h1 className="pb-6 text-3xl md:text-3xl text-slate-800 font-bold">
          Grants
        </h1>
        <IncentivesTable selectedItems={handleSelectedItems} />

        {/* Pagination */}
        <div className="mt-8">
          <PaginationClassic />
        </div>
      </div>
    </IncentiveLayout>
  );
}

export default PlanList;
