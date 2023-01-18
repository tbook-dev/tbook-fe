import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import IncentiveLayout from "./Layout";
import { getIncentiveList, getTipGrantList } from "@/api/incentive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { PlusOutlined } from "@ant-design/icons";
import GrantTable from "./GrantTable";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAsyncEffect } from "ahooks";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import _ from "lodash";
import { targetMap, getDividePercent } from '@/utils/const'

function PlanList() {
  const [tipList, updateTipList] = useState([]);
  const [grantList, updateGrantList] = useState([]);
  const projectId = useCurrentProjectId();

  useAsyncEffect(async () => {
    if (!projectId) return;
    const data = await getIncentiveList(projectId);
    if (Array.isArray(data)) {
      updateTipList(data);
    }
  }, [projectId]);

  useAsyncEffect(async () => {
    if (!projectId) return;
    const list = await Promise.all(
      tipList.map((tip) => getTipGrantList(tip.incentivePlanId))
    );
    // console.log(tipList.length)
    updateGrantList(_.flattenDeep(list));
  }, [tipList]);

  return (
    <IncentiveLayout>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        {/* Page header */}
        <div className="mb-8 sm:flex sm:justify-between sm:items-center">
          {/* Left: Title */}
          <div className="w-full mb-4 sm:mb-0">
            <h1 className="pb-6 text-3xl font-bold md:text-3xl text-slate-800">
              Token Incentive Plans
            </h1>

            <div
              className="relative px-8"
              style={{ "--swiper-navigation-size": "24px" }}
            >
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
              <Swiper
                modules={[Navigation]}
                style={{ height: 110 }}
                spaceBetween={45}
                slidesPerView={6}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
              >
                <SwiperSlide>
                  <NavLink to={"/incentive/create"}>
                    <div className="w-[148px] h-[98px] shadow-c1 border rounded-[10px] flex justify-center align-middle">
                      <PlusOutlined />
                    </div>
                  </NavLink>
                </SwiperSlide>

                {Array.isArray(tipList) && tipList.length === 0 ? (
                  <SwiperSlide className="flex items-center ">
                    <p className="text-[#1E293B] text-2xl]">Click to set up your first incentive plan.</p>
                  </SwiperSlide>
                ) : (
                  Array.isArray(tipList) &&
                  tipList.map((tip) => {
                    return (
                      <SwiperSlide key={tip.incentivePlanId}>
                        <NavLink
                          to={`/incentive/${tip.incentivePlanId}`}
                          className="mr-11"
                        >
                          <div className="w-[148px] h-[98px] px-1.5 shadow-c2 border rounded-[10px] relative">
                            <div className="pt-[9px]">
                              <span className="border px-1.5 text-xs py-[3px] border-[#CBD5E1] rounded-[3px]">{targetMap[tip.target]}</span>
                            </div>
                            <div className="text-base text-[#1E293B] font-semibold	 mb-[20px]">
                              <p>{tip.incentivePlanName}</p>
                            </div>

                            <div className="absolute inset-x-0 h-1.5 overflow-hidden bottom-5 bg-[#CBD5E1]">
                              <div
                                className="h-1.5	bg-[#475569]"
                                style={{ width: tip.percentage + "%" }}
                              />
                            </div>

                            <div className="inset-x-1.5 absolute bottom-0 origin-left	scale-50 text-[#94A3B8] whitespace-nowrap">
                              Granted {tip.grantedTokenNum}
                            </div>
                            <div className="inset-x-1.5 absolute bottom-0 origin-right text-right	scale-50 whitespace-nowrap	text-[#94A3B8]">
                              Total: {tip.totalTokenNum}({getDividePercent(tip.grantedTokenNum, tip.totalTokenNum)}%)
                            </div>
                          </div>
                        </NavLink>
                      </SwiperSlide>
                    );
                  })
                )}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <h1 className="pb-6 text-3xl font-bold md:text-3xl text-slate-800">
            Grants
          </h1>

          <div>
            <div className="flex flex-row-reverse items-center mb-2">
              {tipList.length === 0 ? (
                <Button type="primary" disabled>
                  + New Grant
                </Button>
              ) : (
                <Link to="/incentive/grant/tmp/create">
                  <Button type="primary">+ New Grant</Button>
                </Link>
              )}
            </div>
            <GrantTable
              list={grantList}
              title={() => (
                <h2 className="inline text-base font-bold">
                  All The Grants{" "}
                  <p className="inline font-light">{grantList.length}</p>
                </h2>
              )}
            />
          </div>
        </div>
      </div>
    </IncentiveLayout>
  );
}

export default PlanList;
